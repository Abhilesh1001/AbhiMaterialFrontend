'use client'
// dependencies 
import { useSelector } from 'react-redux'
import { memo } from 'react'

// component 
import VendorDetails from '@/components/purchaseorder/VendorDetails'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/purchaseorder/SelectionHeader'

import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'

// hooks / typescript 
import { usePoview } from '@/hooks/purchseorder/usePoview'
import { posliiceState } from '@/type/type'
import PurchaseTable from '@/components/purchaseorder/PurchaseTable'
import { usePo } from '@/hooks/purchseorder/usePo'

const PurchaseOrder = () => {

    const { newPoNo, uppono,hiddenalert,newchang } = useSelector((state: posliiceState) => state.poslicer)
    const {handleCloseAlert} = usePo()

    const { handleDelivery, handleVdetails, vendorView, deliveryView} = usePoview()

    const renderTableHeader = () => {
        const tableHead = ['', 'S No', 'PO Line', 'PR No', 'Material No', 'Material Name', 'Unit', 'Material Price', 'Quantity', 'Total Amount', 'Material Tax (%)', 'Total Amount Tax (%)', 'Material Text', 'Delete', 'GRN No.', 'Created By', 'Date', 'PR Line']
        return (
            <tr>
                {tableHead.map((item: any, index: number) => (
                    <th key={index}>
                        <div className='ml-2 mr-2 flex'>{item}</div>
                    </th>
                ))}
            </tr>
        );
    };

    return (
        <div className=' dark:bg-gray-800 bg-sky-600 min-h-screen' >
            <div className='container mt-4 overflow-auto text-nowrap'>
                <div className='h-6 p-4 flex flex-col'>
                    {hiddenalert !== "hidden" && <div>
                        {newchang == 'change' && <div> {newPoNo && <><Aleart label={'Created'} alertname={'Purchase Order'} onClose={handleCloseAlert} newMat={newPoNo} /></>}</div>}
                        {newchang !== 'change' && <div>{uppono && <><Aleart label={'Updated'} alertname={'Purchase Order'} onClose={handleCloseAlert} newMat={uppono} /></>}</div>}
                    </div>}

                </div>

                <div className='my-3'>
                    <PrBurron onClick={handleDelivery} label={'Delivery Adress'} />
                    <PrBurron onClick={handleVdetails} label={'Vendor Details'} />
                </div>
                {vendorView !== 'view' && <VendorDetails />}
                {deliveryView !== 'dview' && <DeliveryAdress />}
                <SelectionHeader />
                <form >
                    <div className='h-[500px]  overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                                {renderTableHeader()}
                            </thead>
                            <PurchaseTable />
                        </table>

                    </div>

                </form>
                <div className='my-2'>

                </div>

            </div>
        </div>
    )
}

export default memo(PurchaseOrder)