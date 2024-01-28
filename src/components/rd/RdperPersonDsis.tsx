import React from 'react'
import DumyInput from '../dummyinput/DumyInput';
import {getHideData} from '@/redux/shf/shfslicer'
import {useSelector,useDispatch} from 'react-redux'

interface ProdataType {
    id: number|null;
    person_id: number | null;
    person_name:string,
    amount_collected:number|null,
    remarks : string,
    collection_date:string,
}

interface RdperPersonDsisProps {
    prodataitem: ProdataType[];
}

const RdperPersonDis: React.FC<RdperPersonDsisProps>  = (props) => {
    const dispatch= useDispatch()

  
  return (
    <div>
          <div  onClick={()=>dispatch(getHideData('hidden'))} className=' bg-red-900 w-20 text-center rounded-t cursor-pointer'>Close</div>
           <div className='overflow-auto'>

          
          <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">

                        <thead className='sticky top-0 z-1 text-nowrap bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Name</th>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col" className='px-6 py-2'>Fund Deposite Id</th>
                                <th scope="col" className='px-6 py-2'>Amount Collected</th>
                                <th scope="col" className='px-6 py-2'>Collection Date</th>
                                <th scope="col" className='px-6 py-2'>Remarks</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center text-nowrap'> 
                            {props?.prodataitem !== null  && props?.prodataitem !== undefined && props?.prodataitem?.map(({id,person_id,person_name,amount_collected,remarks,collection_date})=>{
                                
                                return  <tr key={id}>

                                <th scope="row"><DumyInput indum={person_name}/></th>
                                <td><DumyInput indum={person_id}/></td>
                                <td><DumyInput indum={id}/></td>
                                <td><DumyInput indum={amount_collected}/></td>
                                <td><DumyInput indum={collection_date}/></td>
                                <td><DumyInput indum={remarks}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
                    </div>
    </div>
  )
}

export default RdperPersonDis