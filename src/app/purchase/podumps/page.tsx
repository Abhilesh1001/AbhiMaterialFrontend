'use client'
import dynamic from 'next/dynamic';
import React, { useState,memo } from 'react'
import axios from 'axios'
import PrBurron from '@/components/button/PrBurron'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import {datatype,podataType,vendorType} from '@/type/type'


const Prdumps = dynamic(() => import('@/components/purchaserequest/Prdumps'));


const Page = () => {
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)

    const [data,setData] = useState<podataType[]>([])
    const fetchData = async  () =>{
        const res =await axios.get(`${baseurl}mat/createpo`,{
            headers:{
                Authorization : `Bearer ${authToken?.access}`
            }})
        console.log(res.data)
        setData(res.data)
        
    }

   const handleClick =async  () =>{
        
         fetchData()
   }
   

  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        <div></div>
        <div className=' container'>
        <div className='h-3'></div>
            <PrBurron label='All Purchase Order' onClick={handleClick}/>
        </div>
        <div className=' ml-2 mr-2 h-[87vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    <th scope="col"><div className='ml-2 mr-2'>S.No</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>PO Line</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>PO No</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                                    <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Unit</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Price</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Quantity</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Total Price</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Tax</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Total Amount with Tax</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Text</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Created By</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Date</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>PR line</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Pr No</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Vendor Id</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Vendor Name</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Delivery Id</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Delivery Name</div></th>
                                </tr>
                            </thead>
                            <Prdumps data={data} />
                        </table>
                    </div>
        
    </div>
  )
}

export default memo(Page)