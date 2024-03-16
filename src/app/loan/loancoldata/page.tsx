'use client'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import {useSelector,useDispatch} from 'react-redux'
import DumyInput from '@/components/dummyinput/DumyInput'
import {loancollData} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';
import { useLoancoldata } from '@/hooks/loan/useLoancoldata'
import RdperPersonDis from '@/components/loan/LoanPersonDisplay'
import {shfStateTypr} from '@/type/shareholder/shareholde'
import { getHideData } from '@/redux/shf/shfslicer'


const Vendor = () => {

    const dispatch =  useDispatch()
    const {hide} = useSelector((state:shfStateTypr)=>state.shfSlice)
    const {handleHOderView,handleSubmit,loancollection,handleChange,mutation,handleclickrdcolallview,data} = useLoancoldata()
    
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div className='flex'>
                   <PrBurron onClick={handleHOderView} label={'New'} />
                   <PrBurron onClick={handleSubmit} label={'Submit'}/>
                   <div className='text-nowrap text-xl'> <div className='w-full flex justify-center'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation!==undefined && mutation.data.data.msg }</div></div>}</div></div>
                </div>
                <div>
                </div>
            </div>
        </div>
        <div className="row">
        <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900  bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Loan Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Collection Amount</th>
                                <th scope="col">Remarks</th>
                                <th scope="col">Check Collection</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {loancollection?.map((items:loancollData,index:number)=>{
                                return  <tr key={items.loan_person}>
                                <th scope="row"><DumyInput indum={items.loan_person !==undefined?items.loan_person:null}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><TextInput type={'number'} value= {items.amount_collected} onChange={(e)=>handleChange(Number(e.target.value),'amount_collected',index)} /></td>
                                <td><TextInput  value= {items.remarks} onChange={(e)=>handleChange(e.target.value,'remarks',index)} /></td> 
                                <th>
                                            <button className="btn btn-sm bg-sky-500 dark:bg-gray-900" onClick={() => {
                                                const modal = document.getElementById('my_modal_2') as HTMLDialogElement;
                                                if (modal) {
                                                    modal.showModal();
                                                }
                                                handleclickrdcolallview(items.loan_person);
                                            }}>Check Collection</button>
                                        </th>
                            </tr>
                            })}
                        </tbody>
                    </table>
            </div>


            <dialog id="my_modal_2" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl bg-sky-600 dark:bg-gray-800 mt-0">
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn mb-2">Close</button>
                                </form>
                            </div>
                            <RdperPersonDis prodataitem={data} />
                        </div>
                    </dialog>
        </div>

    </div>
    </div>  
    
  )
}

export default Vendor