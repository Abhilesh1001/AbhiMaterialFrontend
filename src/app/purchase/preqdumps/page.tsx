'use client'
import React, { useState } from 'react'
import axios from 'axios'
import PrBurron from '@/components/button/PrBurron'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import {datatypePr,prmainData} from '@/type/type'
import {format, parseISO} from 'date-fns'
import { prDumps } from '@/components/server/loginService'





const Page = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    
    const [data,setData] = useState<prmainData[]>([])

    const fetchData = async  () =>{
        if(authToken?.access!==undefined){
            const pr = await prDumps(baseurl,authToken?.access) 
            setData(pr)

        }
        
    }

   const handleClick =async  () =>{
        
         fetchData()
   }
   let serialNumber = 0;

  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        <div></div>
        <div className=' container'>
            <div className='h-3'></div>
            <PrBurron label='All Purchase Order' onClick={handleClick}/>
        </div>
        <div className=' ml-2 mr-2 h-[550px] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Line No</th>
                                    <th scope="col">Pr No</th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                                    <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Unit</div></th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Text</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody >
                             {data?.map((item:prmainData,index:number)=>{
                                const newItem  = JSON.parse(item.item_json)
                                return newItem.map((itemJson:datatypePr,indexs:number)=>{    
                                    serialNumber += 1;
                                    return <tr key={indexs}>
                                        <td></td>
                                        <td><DumyInput indum={serialNumber}/></td>
                                        <td><DumyInput indum={itemJson.line_no} /></td>
                                        <td><DumyInput indum={item.pr_no} /></td>
                                        <td><DumyInput indum={itemJson.material_no} /></td>
                                        <td><DumyInput indum={itemJson.material_name} /></td>
                                        <td><DumyInput indum={itemJson.material_unit} /></td>
                                        <td><DumyInput indum={itemJson.material_price} /></td>
                                        <td><DumyInput indum={itemJson.material_qty} /></td>
                                        <td><DumyInput indum={itemJson.total_price} /></td>
                                        <td><DumyInput indum={itemJson.material_text} /></td>
                                        <td><DumyInput indum={item.user} /></td>
                                        <td><DumyInput indum={format(parseISO(item.time),'dd.MM.yy HH.mm.ss')} /></td>
                                        
                                    </tr>
                                })

                             })}
                            </tbody>
                        </table>
                    </div>
        
    </div>
  )
}

export default Page