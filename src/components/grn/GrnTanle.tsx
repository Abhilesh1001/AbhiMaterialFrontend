import React,{memo} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {useSelector} from 'react-redux'
import {grnsliiceState } from '@/type/grn/grntype'
import {useGrn} from '@/hooks/grn/useGrn'
import {useGrnView} from '@/hooks/grn/useGrnView'
import PrBurron from '@/components/button/PrBurron'

const GrnTable = () => {


const {data,grnview} = useSelector((state:grnsliiceState)=>state.grnslice)

  const {handleDelete} =useGrnView()
  const {handleChange} = useGrn()

  return (
    <tbody >
                        
    { data?.map((item, index) => {
            return <tr key={index}>
                <th><input type="checkbox" onChange={(e) => handleChange(e.target.value, 'material_no', index)} />
                </th>
                <th scope="row"> <DumyInput indum={index + 1}/></th>
                <th scope="row"> <DumyInput indum={item.grn_line}/></th>
                <td> <DumyInput indum={item.po_no} /></td>
                <td><DumyInput indum={item.material_no} /></td>
                <td><DumyInput indum={item.material_name} /></td>
                <td><DumyInput indum={item.material_name} /></td>
                <td> <DumyInput indum={item.material_price}/></td>

                <td>
                    {grnview ?<DumyInput indum={item.material_qty}/>:<>{item.mrn_no !== null && item.mrn_no !== undefined ? <DumyInput indum={item.material_qty}/>:<input type="number" required value={item.material_qty != null ? item.material_qty : ''} onChange={(e) => handleChange(Number(e.target.value), 'material_qty', index)} className="form-control  text-sm  w-28" />}</>}
                </td>
                <td><DumyInput indum={item.total_amount} /></td>
                <td><DumyInput indum={item.material_tax}/></td>

                <td><DumyInput indum={item.total_tax} /></td>
                <td><DumyInput indum={item.material_text}/></td>
                <td>{grnview ?'' : <>{item.mrn_no !== null && item.mrn_no !== undefined ?'':<PrBurron onClick={()=>handleDelete(index)} label={'Delete'} />}</>}</td>

                <td ><DumyInput indum={'User Name'} /></td>
                <td ><DumyInput indum={'02-01-2021'} /></td>
                <td ><DumyInput indum={item.mrn_no} /></td>
               
            </tr>
        })}

</tbody>
  )
}

export default memo(GrnTable)