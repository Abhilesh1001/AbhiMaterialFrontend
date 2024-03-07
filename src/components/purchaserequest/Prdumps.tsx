import React from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {format, parseISO} from 'date-fns'

import {datatype,podataType,vendorType} from '@/type/type'

interface propdaData {
    data : podataType[]
}

const Prdumps = (props:propdaData) => {
    const data = props.data
   
   let serialNumber = 0;

  return (
    <tbody >
    {data?.map((item:podataType,index:number)=>{
       const newItem  = JSON.parse(item.item_pr)
       const vendorDetails:vendorType = JSON.parse(item.vendor_address)
       const DeliveryDetails:vendorType = JSON.parse(item.delivery_address)
       return newItem.map((itemJson:datatype,indexs:number)=>{    
           serialNumber += 1;
           return <tr key={indexs}>
               <td></td>
               <td><DumyInput indum={serialNumber}/></td>
               <td><DumyInput indum={itemJson.line_no} /></td>
               <td><DumyInput indum={item.po_no} /></td>
               <td><DumyInput indum={itemJson.material_no} /></td>
               <td><DumyInput indum={itemJson.material_name} /></td>
               <td><DumyInput indum={itemJson.material_unit} /></td>
               <td><DumyInput indum={itemJson.material_price} /></td>
               <td><DumyInput indum={itemJson.material_qty} /></td>
               <td><DumyInput indum={itemJson.total_amount} /></td>
               <td><DumyInput indum={itemJson.material_tax}/></td>
               <td><DumyInput indum={itemJson.total_tax} /></td>
               <td><DumyInput indum={itemJson.material_text} /></td>
               <td><DumyInput indum={item.user} /></td>
               <td><DumyInput indum={format(parseISO(item.time),'dd.MM.yy')} /></td>
               <td><DumyInput indum={itemJson.pr_no} /></td>
               <td><DumyInput indum={itemJson.line_no} /></td>
               <td><DumyInput indum={vendorDetails.s_no !==undefined ? vendorDetails.s_no:''  } /></td>
               <td><DumyInput indum={vendorDetails.vendor_name} /></td>
               <td><DumyInput indum={DeliveryDetails.s_no!==undefined ? DeliveryDetails.s_no:''} /></td>
               <td><DumyInput indum={DeliveryDetails.vendor_name} /></td>
           </tr>
       })
    })}
   </tbody>
  )
}

export default Prdumps