'use client'
// dependencies 
import {useSelector} from 'react-redux'

// component 
import VendorDetails from '@/components/grn/Vendor'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/grn/Selection'
import DumyInput from '@/components/dummyinput/DumyInput'
import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'
import Billing from '@/components/grn/Billing'

// hooks / typescript 
import {useGrn} from '@/hooks/grn/useGrn'
import {useGrnView} from '@/hooks/grn/useGrnView'
import {grnsliiceState } from '@/type/grn/grntype'

const GoodReceipt = () => {
  const {data,newGrnNo,upgrnno,grnview,} = useSelector((state:grnsliiceState)=>state.grnslice)

  const {handleDelete,handleDelivery,handleVdetails,vendorView,deliveryView,handleBilling,billingView} =useGrnView()
  console.log()
  const {handleChange} = useGrn()
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
        <form >
            <div className={`h-[500px] overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg`}>
                <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                    <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col" ><div className='ml-2 mr-2'>S.No</div></th>
                            <th scope="col" ><div className='ml-2 mr-2'>PO No</div></th>
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
                            <th scope="col" ><div className='ml-2 mr-2'>Created By</div></th>
                            <th scope="col" ><div className='ml-2 mr-2'>Date</div></th>
                            <th scope="col" ><div className='ml-2 mr-2'></div></th>
                        </tr>
                    </thead>
                    <tbody >
                        
                        { data?.map((item, index) => {
                                return <tr key={index}>
                                    <th><input type="checkbox" onChange={(e) => handleChange(e.target.value, 'material_no', index)} />
                                    </th>
                                    <th scope="row"> <DumyInput indum={index + 1}/></th>
                                    <td> <DumyInput indum={item.po_no} /></td>
                                    <td><DumyInput indum={item.material_no} /></td>
                                    <td><DumyInput indum={item.material_name} /></td>
                                    <td><DumyInput indum={item.material_name} /></td>
                                    <td> <DumyInput indum={item.material_price}/></td>

                                    <td>
                                        {grnview ?<DumyInput indum={item.material_qty}/>:<input type="number" value={item.material_qty != null ? item.material_qty : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_qty', index)} className="form-control  text-sm  w-28" />}
                                    </td>
                                    <td><DumyInput indum={item.total_amount} /></td>
                                    <td><DumyInput indum={item.material_tax}/></td>

                                    <td><DumyInput indum={item.total_tax} /></td>
                                    <td><DumyInput indum={item.material_text}/></td>
                                    <td>{grnview ?'' : <PrBurron onClick={()=>handleDelete(index)} label={'Delete'} />}</td>

                                    <td ><DumyInput indum={'User Name'} /></td>
                                    <td ><DumyInput indum={'02-01-2021'} /></td>
                                   
                                </tr>
                            })}
                    
                    </tbody>
                </table>

            </div>

        </form>
        <div className='my-2'>
        {newGrnNo !== null &&  <Aleart newMat = {newGrnNo} alertname={'GRN'} label='Created'/>}
        {upgrnno !== null &&  <Aleart newMat = {upgrnno} alertname={'GRN'} label={'Updated'}/>}
        </div>
       
    </div>
    </div>
  )
}

export default GoodReceipt