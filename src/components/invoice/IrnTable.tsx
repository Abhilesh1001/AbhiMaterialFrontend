import React,{memo} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {useSelector} from 'react-redux'
import { irnsliiceState } from '@/type/irn/irn'

import {useIrn} from '@/hooks/invoice/useIrn'
import {useIrnView} from '@/hooks/invoice/useIrnView'
import PrBurron from '@/components/button/PrBurron'

const IrnTable = () => {

const {data,irnview} = useSelector((state:irnsliiceState)=>state.irnSlice)

  const {handleDelete} =useIrnView()

  const {handleChange} = useIrn()

  return (
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

                <td><DumyInput indum={item.material_qty} /></td>
                <td><DumyInput indum={item.total_amount} /></td>
                <td><DumyInput indum={item.material_tax}/></td>

                <td><DumyInput indum={item.total_tax} /></td>
                <td><DumyInput indum={item.material_text}/></td>
                <td>{irnview ?'' : <PrBurron onClick={()=>handleDelete(index)} label={'Delete'} />}</td>

                <td ><DumyInput indum={'User Name'} /></td>
                <td ><DumyInput indum={'02-01-2021'} /></td>
               
            </tr>
        })}

</tbody>
  )
}

export default memo(IrnTable)