'use client'
// dependencies 
import { useSelector } from 'react-redux'
import { memo } from 'react'

// component 
import VendorDetails from '@/components/invoice/Vendor'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/invoice/Selection'
import IrnTable from '@/components/invoice/IrnTable'

import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'
import Billing from '@/components/invoice/BillingInvoice'

// hooks / typescript 
import { useIrnView } from '@/hooks/invoice/useIrnView'

import { irnsliiceState } from '@/type/irn/irn'
import { useIrn } from '@/hooks/invoice/useIrn'


const InvoiceReceipt = () => {
  const { newIrnNo, upirnno,newchang,hiddenalert } = useSelector((state: irnsliiceState) => state.irnSlice)

  const { handleDelivery, handleVdetails, vendorView, deliveryView, handleBilling, billingView } = useIrnView()
  const {handleCloseAlert} = useIrn()
  console.log(upirnno,'inside page')
  return (
    <div className=' dark:bg-gray-800 bg-sky-600 min-h-screen' >
      <div className='container mt-4 overflow-auto text-nowrap'>
        <div className='h-6 p-4 flex flex-col'>
          {hiddenalert !== "hidden" && <div>
            {newchang == 'change' && <div> {newIrnNo && <><Aleart label={'Created'} alertname={'IRN'} onClose={handleCloseAlert} newMat={newIrnNo} /></>}</div>}
            {newchang !== 'change' && <div>{upirnno && <><Aleart label={'Updated'} alertname={'IRN'} onClose={handleCloseAlert} newMat={upirnno} /></>}</div>}
          </div>}
        </div>
        <div className='my-3'>
          <PrBurron onClick={handleDelivery} label={'Delivery Adress'} />
          <PrBurron onClick={handleVdetails} label={'Vendor Details'} />
          <PrBurron onClick={handleBilling} label={'Billing Details'} />
        </div>
        {vendorView !== 'view' && <VendorDetails />}
        {deliveryView !== 'dview' && <DeliveryAdress />}
        {billingView !== 'bview' && <Billing />}

        <SelectionHeader />
        <form >
          <div className={`h-[500px] overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg`}>
            <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
              <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                <tr>
                  <th scope="col" ><div className='ml-2 mr-2'>S.No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Delete</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>PO No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>GRN No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Bill No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Material No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Unit</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Material Price</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Quantity</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Total Amount</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Material Tax (%)</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Total Amount Tax (%)</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Material Text</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Created By</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Date</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Bill Date</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Bill No</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Delivery Note</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Transporter Name</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'>Way Bill</div></th>
                  <th scope="col" ><div className='ml-2 mr-2'></div></th>
                </tr>
              </thead>
              <IrnTable />
            </table>

          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(InvoiceReceipt)