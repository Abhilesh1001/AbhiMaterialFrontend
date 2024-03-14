'use client'
import React from 'react'
import PrBurron from '@/components/button/PrBurron'
import dynamic from 'next/dynamic';
import Rdintrest from '@/components/rd/Rdintrest'
import RDperson from '@/components/rd/RDperson'

import { useRdname } from '@/hooks/rd/useRdname'

const RdpersonTable = dynamic(() => import('@/components/rd/RdpersonTable'));

const Vendor = () => {
  const { setEnabled} = useRdname()
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
      <div className='container'>
        <div className='h-4'></div>
        <div className="my-6">
            <div>
              {/* Rd Person  */}
              <button className="btn btn-sm mr-2 bg-sky-500 dark:bg-gray-900" onClick={() => {
                const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}>Add Rd Person</button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-sky-600 dark:bg-gray-800">
                  <RDperson />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                 </div>
                </div>
              </dialog>

              {/* Rd intrest  */}
              <button className="btn btn-sm bg-sky-500 dark:bg-gray-900" onClick={() => {
                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}>Add Rd Intrest</button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box bg-sky-600 dark:bg-gray-800">
                  <Rdintrest />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                 </div>
                </div>
              </dialog>

                {/* Rdintrest end  */}
              <PrBurron onClick={() => setEnabled(true)} label={'View'} />
            </div>
            <div>
            </div>
 


          <RdpersonTable />

        </div>
      </div>
    </div>

  )
}

export default Vendor