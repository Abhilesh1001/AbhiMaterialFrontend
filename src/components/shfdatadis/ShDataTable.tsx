
import SfperPersonDsis from '@/components/shfdatadis/SfperPersonDsis'
import {shareholderFund} from '@/type/shareholder/shareholde'
import {useQuery} from '@tanstack/react-query'
import {getHideData} from '@/redux/shf/shfslicer'
import DumyInput from '@/components/dummyinput/DumyInput'
import { useShfdata } from '@/hooks/shf/useShfdata'

import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import React, { useEffect, useState,memo } from 'react'
import {shfStateTypr} from '@/type/shareholder/shareholde'




interface prodatatype {
    Sh_id:string, 
    amount_Debit:number|null,
    amount_credit:number|null,
    sh_name:string,
    shf_id:number|null, 
    time:string, 
}

const ShDataTable = () => {

    const {newData} = useShfdata()

    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const {hide} = useSelector((state:shfStateTypr)=>state.shfSlice)
    const dispatch= useDispatch()

    const [prodata,setProdata] = useState<prodatatype[]>([{sh_name:'', Sh_id: '', shf_id:null, amount_credit: null, amount_Debit: null,time:''}])
    
    const handleTotalColView = async (id: any)=>{
        
        try{
            const res = await axios.get(`${baseurl}shar/shfund/${id}`,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})
              console.log(res.data)
              setProdata(res.data)
        }catch(error){
            console.log(error)
        }
        dispatch(getHideData('absolute'))
    }


  return (
    <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-[80vh]">
    <div className={`${hide} top-16 left-40`}>
        <SfperPersonDsis prodataitem ={prodata}  />
    </div>
        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                <tr>
                    <th scope="col" className='px-6 py-2'>Holder Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Amount Invested</th>
                    <th scope="col">Present Value</th>
                </tr>
            </thead>
            <tbody className=' text-gray-50 text-center'> 
                {newData?.map((items:shareholderFund)=>{
                    
                    return  <tr key={items.shf_id}>
                    <th scope="row"><div   onClick={()=>handleTotalColView(items.shf_id)} className='cursor-pointer' ><DumyInput indum={items.shf_id}/></div></th>
                    <td><DumyInput indum={items.name}/></td>
                    <td><DumyInput indum={''}/></td>
                    <td><DumyInput indum={items.totalInvested}/></td>
                    <td><DumyInput indum={''}/></td>
                </tr>
                })}
               
            </tbody>
        </table>
</div>
  )
}

export default memo(ShDataTable)