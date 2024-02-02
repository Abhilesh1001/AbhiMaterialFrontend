// dependenciew
import React, {memo } from 'react'
import { useSelector } from 'react-redux'

// components 
import DumyInput from '../dummyinput/DumyInput'
import { irnsliiceState } from '@/type/irn/irn'


const VendorDetails = () => {
    const {vendoradress} = useSelector((state:irnsliiceState)=>state.irnSlice)
    
    return (
          <div className='h-[100px] relative overflow-y-auto shadow-md dark:bg-gray-900 mt-4 mb-2 bg-sky-500 sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400'>
                <thead>
                    <tr className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                        <th>Party Id</th>
                        <><th>Name</th>
                        <th>Phone No</th>
                        <th>Party Name</th>
                        <th>Party Adrress</th>
                        <th>Party GST No</th>
                        <th>Email</th></> 
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td><DumyInput indum={vendoradress.s_no === undefined ?'':vendoradress.s_no} /></td>
                            <><td><DumyInput indum={vendoradress.name} /></td>
                            <td><DumyInput indum={vendoradress.phone_no} /></td>
                            <td><DumyInput indum={vendoradress.vendor_name} /></td>
                            <td><DumyInput indum={vendoradress.address} /></td>
                            <td><DumyInput indum={vendoradress.gst} /></td>
                            <td><DumyInput indum={vendoradress.email} /></td></>
                        
                            
                        </tr>
                </tbody>
            </table>
            </div>

    )
}

export default memo(VendorDetails)