'use client'
// dependencies 
import {useSelector} from 'react-redux'


// component 
import VendorDetails from '@/components/purchaseorder/VendorDetails'
import DeliveryAdress from '@/components/purchaseorder/DeliveryAdress'
import SelectionHeader from '@/components/purchaseorder/SelectionHeader'
import DumyInput from '@/components/dummyinput/DumyInput'
import Aleart from '@/components/alert/Aleart'
import PrBurron from '@/components/button/PrBurron'

// hooks / typescript 
import { usePo } from '@/hooks/purchseorder/usePo'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import {posliiceState,datatype} from '@/type/type'
import { format } from 'date-fns';



const PurchaseOrder = () => {
    
    const {data,newPoNo,poview,uppono,podata} = useSelector((state:posliiceState)=>state.poslicer)
   
    const {handleDelete,handleDelivery,handleVdetails,vendorView,deliveryView} =usePoview()
    const {handleChange} = usePo()
   
    let formattedDateString = ''
    if (podata.time) {
        const time = podata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }
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
                <div className='h-[500px] overflow-auto  relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
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
                        <tbody >
                            
                            { data?.map((item, index) => {
                                    return <tr key={index}>
                                        <th><input type="checkbox" onChange={(e) => handleChange(e.target.value, 'material_no', index)} />
                                        </th>
                                        <th scope="row"> <DumyInput indum={index + 1}/></th>
                                        <td> <DumyInput indum={item.pr_no} /></td>
                                        <td><DumyInput indum={item.material_no} /></td>
                                        <td><DumyInput indum={item.material_name} /></td>
                                        <td><DumyInput indum={item.material_name} /></td>

                                        <td>
                                            {poview ? <DumyInput indum={item.material_price}/> :<>{item.grn_no!==null && item.grn_no!==undefined ?<DumyInput indum={item.material_price}/>:<input type="number" value={item.material_price !== null ? item.material_price : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_price', index)} className="form-control  text-sm  w-26" />}</>}
                                        </td>

                                        <td>
                                            {poview ?<DumyInput indum={item.material_qty}/>:<>{item.grn_no!==null && item.grn_no!==undefined?<DumyInput indum={item.material_qty}/>:<input type="number" value={item.material_qty != null ? item.material_qty : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_qty', index)} className="form-control  text-sm  w-28" />}</>}
                                        </td>

                                        <td><DumyInput indum={item.total_amount} /></td>

                                        <td>
                                            {poview ?<DumyInput indum={item.material_tax}/>:<>{item.grn_no!==null&& item.grn_no!==undefined?<DumyInput indum={item.material_tax}/>:<input type="number" value={item.material_tax !== null ? item.material_tax : ''} onChange={(e) => handleChange(e.target.value, 'material_tax', index)} className="form-control text-sm  w-26" />}</>}
                                            
                                        </td>

                                        <td>
                                        <DumyInput indum={item.total_tax} /></td>

                                        <td>
                                            {poview ?<DumyInput indum={item.material_text}/>:<>{item.grn_no!==null&& item.grn_no!==undefined?<DumyInput indum={item.material_text}/>:<input type="text" onChange={(e) => handleChange(e.target.value, 'material_text', index)} value={item.material_text} className="form-control w-[200px] text-sm  w-26" />}</>}
                                        </td>
                                        <td>
                                        {poview ? '':<>{item.grn_no !==null && item.grn_no!==undefined ?'':<PrBurron label={'Delete'} onClick={()=>handleDelete(index)} />}</>} </td>
                                          
                                            <td >{<DumyInput indum={item.grn_no} />}
                                        </td>

                                        <td >{podata.user !==null ?<DumyInput indum={podata.user} />: "user"}</td>
                                        <td >{podata.user !==null ?<DumyInput indum={formattedDateString} />: ""}</td>
                                       
                                    </tr>
                                })}
                        
                        </tbody>
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

export default PurchaseOrder