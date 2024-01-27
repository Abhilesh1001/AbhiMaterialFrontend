'use client'
// dependencies 
import {useSelector} from 'react-redux'
import {memo} from 'react'

// component 
import VendorDetails from '@/components/purchaseorder/VendorDetails'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/purchaseorder/SelectionHeader'

import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'

// hooks / typescript 
import { usePo } from '@/hooks/purchseorder/usePo'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import {posliiceState,datatype} from '@/type/type'
import { format } from 'date-fns';
import PurchaseTable from '@/components/purchaseorder/PurchaseTable'



const PurchaseOrder = () => {
    
    const {data,newPoNo,poview,uppono,podata} = useSelector((state:posliiceState)=>state.poslicer)

    const {handleDelete,handleDelivery,handleVdetails,vendorView,deliveryView} =usePoview()
    const {handleChange} = usePo()
   
    
   console.log(uppono,'uppono')
    return (
        <div className=' dark:bg-gray-800 bg-sky-600 min-h-screen' >
        <div className='container mt-4 overflow-auto text-nowrap'>
        <div className='my-3'>
         <PrBurron onClick={handleDelivery} label={'Delivery Adress'} />
         <PrBurron onClick={handleVdetails} label={'Vendor Details'} />
         
      </div>
      {vendorView!=='view' && <VendorDetails />}
        {deliveryView!=='dview' && <DeliveryAdress />}
            <SelectionHeader />
            <form >
                <div className='h-[500px]  overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" ><div className='ml-2 mr-2'>S.No</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>PR No</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Material No</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Unit</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Material Price</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Quantity</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Total Amount</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Material Tax (%)</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Total Amount Tax (%)</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Material Text</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Delete</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>GRN No.</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Created By</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'>Date</div></th>
                                <th scope="col" ><div className='ml-2 mr-2'></div></th>
                            </tr>
                        </thead>
                        <PurchaseTable/>
                    </table>

                </div>

            </form>
            <div className='my-2'>
            {newPoNo !== null &&  <Aleart newMat = {newPoNo} alertname={'Purchase Order'} label='Created'/>}
            {uppono !== null &&  <Aleart newMat = {uppono} alertname={'Purchase Order'} label={'Updated'}/>}
            </div>
           
        </div>
        </div>
    )
}

export default memo(PurchaseOrder)