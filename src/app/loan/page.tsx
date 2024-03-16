'use client'
import React, { useEffect, useState, memo } from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import { useLoan } from '@/hooks/loan/useLoan'
import LoanPerTable from '@/components/loan/LoanPerTable'
import { updataData } from '@/type/type'
import LoanPersonCreate from '@/components/loan/LoanPersonCreate'


const Vendor = () => {
    const { setEnabled} = useLoan()


    return (
        <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="mt-4">
                        <div>
                            <button className="btn btn-sm mr-2 bg-sky-500 dark:bg-gray-900" onClick={() => {
                                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                                if (modal) {
                                    modal.showModal();
                                }
                            }}>Add Loan Person</button>
                            <dialog id="my_modal_1" className="modal">
                                <div className="modal-box bg-sky-600 dark:bg-gray-800">
                                    <LoanPersonCreate />
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                            <PrBurron onClick={() => setEnabled(true)} label={'View'} />
                        </div>
                        <div>
                        </div>
                       
                    </div>
                    <LoanPerTable />
                </div>
            </div>
        </div>

    )
}

export default memo(Vendor)