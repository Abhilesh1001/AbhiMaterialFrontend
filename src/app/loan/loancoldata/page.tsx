'use client'

import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'


import DumyInput from '@/components/dummyinput/DumyInput'
import {loancollData} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';
import { useLoancoldata } from '@/hooks/loan/useLoancoldata'



const Vendor = () => {
    const {handleHOderView,handleSubmit,rdcollection,handleChange} = useLoancoldata()
    
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div className='flex'>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={handleHOderView} label={'New'} />
                   <PrBurron  label={'Change'}/>
                   <PrBurron onClick={handleSubmit} label={'Submit'}/>
                   <div className='text-nowrap text-xl'>Loan Collection</div>
                </div>
                <div>
                </div>
                {/* <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data!==undefined && data.data.msg } RD Holder Id {data!==undefined && data.data.data.rdp_id}</div></div>}</div> */}
            </div>



        </div>
        <div className="row">
        <div className="col-sm-6 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900  bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Collection Amount</th>
                                <th scope="col">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {rdcollection?.map((items:loancollData,index:number)=>{
                                return  <tr key={items.loan_person}>
                                <th scope="row"><DumyInput indum={items.loan_person !==undefined?items.loan_person:null}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><TextInput type={'number'} value= {items.amount_collected} onChange={(e)=>handleChange(Number(e.target.value),'amount_collected',index)} /></td>
                                <td><TextInput  value= {items.remarks} onChange={(e)=>handleChange(e.target.value,'remarks',index)} /></td> 
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