import React,{memo} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {useSelector} from 'react-redux'
import { irnsliiceState } from '@/type/irn/irn'
import {useIrnView} from '@/hooks/invoice/useIrnView'
import PrBurron from '@/components/button/PrBurron'
import { format } from 'date-fns';


const IrnTable = () => {

const {data,irnview,irndata} = useSelector((state:irnsliiceState)=>state.irnSlice)
  const {handleDelete} =useIrnView()

  return (
    <tbody >
                        
    { data?.map((item, index) => {
            return <tr key={index}>
                <th scope="row"> <DumyInput indum={index + 1}/></th>
                <td>{irnview ?'' : <PrBurron onClick={()=>handleDelete(index)} label={'Delete'} />}</td>
                <td> <DumyInput indum={item.po_no} /></td>
                <td> <DumyInput indum={item.grn_no} /></td>
                <td ><DumyInput indum={item.billing.bill_no} /></td>
                <td><DumyInput indum={item.material_no} /></td>
                <td><DumyInput indum={item.material_name} /></td>
                <td><DumyInput indum={item.material_name} /></td>
                <td> <DumyInput indum={item.material_price}/></td>

                <td><DumyInput indum={item.material_qty} /></td>
                <td><DumyInput indum={item.total_amount} /></td>
                <td><DumyInput indum={item.material_tax}/></td>

                <td><DumyInput indum={item.total_tax} /></td>
                <td><DumyInput indum={item.material_text}/></td>
                <td ><DumyInput indum={irndata.user===null?'User':irndata.user} /></td>
                <td ><DumyInput indum={irndata.user===null?'date':format(irndata.time,'dd-mm-yyyy')} /></td>
                <td ><DumyInput indum={item.billing.bill_date} /></td>
                <td ><DumyInput indum={item.billing.bill_no} /></td>
                <td ><DumyInput indum={item.billing.delivery_note} /></td>
                <td ><DumyInput indum={item.billing.transporter_name} /></td>
                <td ><DumyInput indum={item.billing.way_bill} /></td>

               
            </tr>
        })}

</tbody>
  )
}

export default memo(IrnTable)