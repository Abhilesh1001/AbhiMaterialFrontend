
'use client'
import React from 'react'
import { useMaterial } from '@/hooks/material/useMaterial'
interface matType {
    s_no:number | null,
    material_name:string, 
    material_group:string,
    unit:string, 
    user :string,
}


const MaterialDisplaytable = () => {
    const {matdata } = useMaterial()
   console.log(matdata)
  return (
    <div className="col-sm-6 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg max-h-screen h-full">
    <table className="w-full text-sm mt-4 text-left rtl:text-right text-gray-500 bg-sky-600 dark:text-gray-400">
        <thead className='text-xs text-gray-50 uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
                <th className='px-6 py-1' scope="col">Material Code</th>
                <th className='px-6 py-1' scope="col">Material Name</th>
                <th className='px-6 py-1' scope="col">Material Group</th>
                <th className='px-6 py-1' scope="col">Unit</th>
                <th className='px-6 py-1' scope="col">User</th> 
            </tr>
        </thead>
        <tbody>
            {
                matdata?.length != undefined && matdata?.length > 0 && matdata?.map(( items:matType ) => {
                    const {s_no,material_name,material_group,unit,user} = items
                    return <tr className='odd:bg-sky-600 text-gray-50 odd:dark:bg-gray-900 even:bg-sky-400  even:dark:bg-gray-800 border-b dark:border-gray-700' key={s_no}>
                        <th className='px-6 py-1' scope="row">{s_no}</th>
                        <td className='px-6 py-1'>{material_name}</td>
                        <td className='px-6 py-1'>{material_group}</td>
                        <td className='px-6 py-1'>{unit}</td>
                        <td className='px-6 py-1'>{user}</td>
                    </tr>
                })
            }

        </tbody>
    </table>
</div>
  )
}

export default MaterialDisplaytable