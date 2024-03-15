'use client'

import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format,parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'
import LoanAmountCreation from '@/components/loan/LoanAmountCreation'




interface loanDetails {
    id : number|null,
    loan_person :string,
    loan_amount : number|null,
    opening_date: string,
    closing_date : string,
    is_active: boolean,
    total_pending_amoount?:number|null,
    balance_amount?:number|null,
    remarks: string,
}




const Vendor = () => {

    const {setEnabled,mutation,data,setVid,handleSubmit,setLoan,handleKeyDown,loan,vid,newData} = useLoanamount()
   


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
                                   
                                    <div className="modal-action mt-0">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>
                                    </div>
                                    <LoanAmountCreation />
                                </div>
                            </dialog>

                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                </div>
                <div>
                </div>
                
            </div>


            <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Lone No</th>
                                <th scope="col">Loan Person</th>
                                <th scope="col">Loan Amount</th>
                                <th scope="col">Loan Opening Date</th>
                                <th scope="col">Loan Close Date</th>
                                <th scope="col">Loan Status</th>
                                <th scope="col">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {newData?.map((items:loanDetails)=>{
                                return  <tr key={items.id}>
                                <th scope="row"><DumyInput indum={items.id !==undefined?items.id:null}/></th>
                                <td><DumyInput indum={items.loan_person}/></td>
                                <td><DumyInput indum={items.loan_amount}/>{}</td>
                                <td><DumyInput indum={items.opening_date !==undefined?format(parseISO(items.opening_date),'dd.MM.yy') :''}/></td>
                                <td><DumyInput indum={items.closing_date !==undefined && items.closing_date !==null ?format(parseISO(items.closing_date),'dd.MM.yy') :''}/></td>
            
                                <td><DumyInput indum={`${items.is_active? 'Loan Active' :'Loan Paid'}`}/></td>
                                <td><DumyInput indum={items.remarks}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
            </div>

        </div>
    </div>
    </div>
    
  )
}

export default Vendor