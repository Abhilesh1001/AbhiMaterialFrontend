'use client'
import React, { useState, memo } from 'react'
import axios from 'axios'
import PrBurron from '@/components/button/PrBurron'
import { useQuery } from '@tanstack/react-query'
import DumyInput from '@/components/dummyinput/DumyInput'

const Page = () => {
    const [enable, setEnable] = useState<boolean>(false)

    const getData = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/grn/materialstock`)
        const data = res.data
        setEnable(false)
        return data
    }

    const { data: res } = useQuery({ queryKey: ['materialStock'], queryFn: getData, enabled: enable })
    console.log(res)
    const handleClick = () => {
        setEnable(true)
    }
    let serialNumber = 0;
    return (
        <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6' >
            <div className="container">
                <div className='h-3'></div>
                <PrBurron label='All Material Stock' onClick={handleClick} />


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
                                <tbody >
                                    {
                                        res?.map((item: any) => {
                                            serialNumber += 1
                                            return <tr key={item.material_no}>
                                                <td><DumyInput indum={serialNumber} /></td>
                                                <td><DumyInput indum={item.material_no} /></td>
                                                <td><DumyInput indum={item.material_name} /></td>
                                                <td><DumyInput indum={item.material_unit} /></td>
                                                <td><DumyInput indum={item.material_qty} /></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-sm-6">

                    </div>
                    PrBurron</div>


            </div>
        </div>
    )
}


export default memo(Page)