import React from 'react'
import axios from 'axios'
import Materialrdumps from '@/components/material/MaterialTable'
import { baseurl } from '@/components/dataAll/data'

import { cookies } from 'next/headers'



interface IndexProps {
    tokenRefresh: string | null;
    tokenAccess: string | null;
  }
  


const getData = async () => {
    const value = cookies().get('tokenAcess')?.value
    console.log(value)
    if(value !==null ){
        const res = await axios.get(`${baseurl}/grn/materialstock`,{headers:{
            Authorization :`Bearer ${value}`
        }})
        const data = res.data
        return data
    }
    return null

}


const Page = async () => {

    const res = await getData()


    return (
        <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6' >
            <div className="container">
            <div className='h-3'></div>

            <div className="row">
                <div className="col-sm-6">
                    <div className=' ml-2 mr-2 h-[87vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                                <tr >
                                    <th scope="col"><div className='ml-2 mr-2'>S.No</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Name</div></th>
                                    <th scope="col" ><div className='ml-2 mr-2'>Materil Unit</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Qty</div></th>
                                </tr>
                            </thead>
                            <Materialrdumps data={res} />
                        </table>
                    </div>
                </div>
                <div className="col-sm-6">

                </div>
            </div>


            </div>
        </div>
    )
}



export default Page