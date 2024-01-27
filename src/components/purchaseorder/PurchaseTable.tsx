import React,{memo} from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'
import {posliiceState,datatype} from '@/type/type'
import {useSelector} from 'react-redux'
import { usePo } from '@/hooks/purchseorder/usePo'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import { format } from 'date-fns';
import PrBurron from '@/components/button/PrBurron'

const PurchaseTable = () => {
    const {data,poview,podata} = useSelector((state:posliiceState)=>state.poslicer)

    const {handleDelete} =usePoview()
    const {handleChange} = usePo()
    let formattedDateString = ''
    if (podata.time) {
        const time = podata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }


  return (
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
  )
}

export default memo(PurchaseTable)