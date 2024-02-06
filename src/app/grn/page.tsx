'use client'
// dependencies 
import {useSelector} from 'react-redux'
import {memo} from 'react'

// component 
import VendorDetails from '@/components/grn/Vendor'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/grn/Selection'
import GrnTable from '@/components/grn/GrnTanle'
import TableHead from '@/components/dummyinput/TableHead'
import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'
import Billing from '@/components/grn/Billing'

// hooks / typescript 
import {useGrnView} from '@/hooks/grn/useGrnView'
import {grnsliiceState } from '@/type/grn/grntype'

const GoodReceipt = () => {
  const {newGrnNo,upgrnno} = useSelector((state:grnsliiceState)=>state.grnslice)

  const {handleDelivery,handleVdetails,vendorView,deliveryView,handleBilling,billingView} =useGrnView()

  const grnTableData =  ['','S No.','GRN Line', 'PO No','Material No','Material Name','Unit','Material Price','Quantity','Total Amount','Material Tax (%)','Total Amount Tax (%)','Material Text','Delete','Created By','Date','IRN No']


  return (
    <div className=' dark:bg-gray-800 bg-sky-600 min-h-screen' >
    <div className='container mt-4 overflow-auto text-nowrap'>
      <div className='my-3'>
         <PrBurron onClick={handleDelivery} label={'Delivery Adress'} />
         <PrBurron onClick={handleVdetails} label={'Vendor Details'} />
         <PrBurron onClick={handleBilling} label={'Billing Details'} />
      </div>
        {vendorView!=='view' && <VendorDetails />}
        {deliveryView!=='dview' && <DeliveryAdress />}
        {billingView!=='bview'&& <Billing />}
        
        <SelectionHeader />

            <div className={`h-[500px] overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg`}>
                <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                    <TableHead mainData={grnTableData} />
                    <GrnTable />
                </table>
            </div>
        <div className='my-2'>
        {newGrnNo !== null &&  <Aleart newMat = {newGrnNo} alertname={'GRN'} label='Created'/>}
        {upgrnno !== null &&  <Aleart newMat = {upgrnno} alertname={'GRN'} label={'Updated'}/>}
        </div>
       
    </div>
    </div>
  )
}

export default memo(GoodReceipt)