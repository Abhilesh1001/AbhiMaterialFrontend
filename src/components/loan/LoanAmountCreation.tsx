import React from 'react'


import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'


interface loanDetails {
    id: number | null,
    loan_person: string,
    loan_amount: number | null,
    opening_date: string,
    closing_date: string,
    is_active: boolean,
    total_pending_amoount?: number | null,
    balance_amount?: number | null,
    remarks: string,
}



const LoanAmountCreation = () => {

    const { setEnabled, mutation, data, setVid, handleSubmit, setLoan, handleKeyDown, loan, vid, newData, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDownLoanId, mutationUpdate } = useLoanamount()

    console.log(mutationUpdate?.data,'mutationupdate')


    return (
        <>
            <div>
                <PrBurron onClick={handleCreate} label={'Create'} />
                <PrBurron onClick={handleChange} label={'Change'} />
                {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}
            </div>
            <div>
            </div>
            
            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} Loan Id {mutation.data !== undefined && mutation.data.data.data.id}</div></div>}</div>}

            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate !== undefined && mutationUpdate.data.data.msg} Loan Id {mutationUpdate !== undefined && mutationUpdate?.data?.data?.data?.id}</div></div>}</div>}



            {change !== 'create' && <><label htmlFor="Name" className="form-label text-sm">Person ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="text-sm  w-full `bg-gray-50 border p-1 border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " /></>}

            {change === 'create' && <><label htmlFor="Name" className="form-label text-sm">Loan ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownLoanId(e)} onChange={(e) => setVid(e.target.value)} className="text-sm  w-full `bg-gray-50 border p-1 border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " /></>}


            {sfcreate === 'create' && <form onSubmit={handleSubmit}>

                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={loan.name} />
                <label htmlFor="Phone" className="form-label text-sm ">Loan Amount</label>
                <TextInput value={loan.amount} type={'number'} onChange={(e) => setLoan({ ...loan, amount: Number(e.target.value) })} />
                <div>
                    <input type="checkbox" className='my-2' checked={loan.is_active} onChange={(e) => setLoan({ ...loan, is_active: e.target.checked })} />
                    <label htmlFor="" className="form-label text-sm">{loan.is_active ? 'Loan Open' : 'Loan Close'}</label>

                </div>

                <label htmlFor="Phone" className="form-label text-sm ">Duration</label>
                <TextInput type={'number'} value={loan.duration} onChange={(e) => setLoan({ ...loan, duration: Number(e.target.value) })} />

                <label htmlFor="Phone" className="form-label text-sm ">Interest</label>
                <TextInput type={'number'} value={loan.interest_rate} onChange={(e) => setLoan({ ...loan, interest_rate: Number(e.target.value) })} />

                <label htmlFor="Phone" className="form-label text-sm ">Remarks</label>
                <TextInput value={loan.remarks} onChange={(e) => setLoan({ ...loan, remarks: e.target.value })} />


                <label htmlFor="Email" className="form-label text-sm">Start Date</label>

                <input type="date" value={loan.start_date} onChange={(e) => setLoan({ ...loan, start_date: e.target.value })} className="text-sm mb-4 bg-gray-50 border p-1 border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                <label htmlFor="Email" className="form-label text-sm">Closing Date</label>

                <input type="date" value={loan.closing_date === null ? '' : loan.closing_date} onChange={(e) => setLoan({ ...loan, closing_date: e.target.value })} className="text-sm mb-4 bg-gray-50 border p-1 border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-950 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                {change !== 'create' && <PrBurron label={'Submit'} buttomType={'submit'} />}

            </form>}



        </>
    )
}

export default LoanAmountCreation