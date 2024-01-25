'use client'

import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format,parseISO } from 'date-fns';
import { useLoanamount } from '@/hooks/loan/useLoanamount'




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
            <div className="col-sm-4 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                   <PrBurron  label={'Change'}/>
                </div>
                <div>
                </div>
                <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{data!==undefined && data.data.msg } Loan No {data!==undefined && data.data.data.id}</div></div>}</div>
                <label htmlFor="Vendor" className="form-label text-sm">Loan No</label>
                <TextInput value={''} type={'number'} onChange = {(e)=>setVid(e.target.value)} />

                <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Person ID</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e)=>setVid(e.target.value)} className="form-control  text-sm  w-full" />

                <label htmlFor="Name" className="form-label text-sm">Name</label> 
                <DumyInput indum={loan.name} />
               
                
                <label htmlFor="Phone" className="form-label text-sm ">Loan Amount</label>
                <TextInput value={loan.amount} type={'number'} onChange={(e)=>setLoan({...loan,amount :Number(e.target.value)})} />
                
                <div>
                <label htmlFor="" className="form-label text-sm">Loan Open</label>
                <input type="checkbox" className='mx-4' checked={loan.is_active}  onChange={(e)=>setLoan({...loan, is_active:e.target.checked})} /> 

                </div>

                <label htmlFor="Phone" className="form-label text-sm ">Remarks</label>
                <TextInput value={loan.remarks} onChange={(e)=>setLoan({...loan,remarks :e.target.value})} />

                <label htmlFor="Email" className="form-label text-sm">Loan Closing Date</label>
                <input type="date" onChange={(e) => setLoan({ ...loan, closing_date: e.target.value })} className="form-control text-sm mb-4 " />            
               <PrBurron label={'Submit'} buttomType={'submit'} />
               </form>
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