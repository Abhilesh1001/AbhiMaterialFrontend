import React from 'react'
import { podataType, datatype, posliiceState, } from '@/type/type'
import { useSelector } from 'react-redux'
import { format } from 'date-fns';
import DumyInput from '../dummyinput/DumyInput';

const PoView = () => {
    const { podata,data } = useSelector((state: posliiceState) => state.poslicer)
    const user = podata.user
    let formattedDateString = ''
    if (podata.time) {
        const time = podata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }
    return (
        <>
            {
                data?.map((item, index) => {
                    return <tr key={index}>
                        <th></th>
                        <th scope="row"><DumyInput indum={index + 1} /></th>
                        <td><DumyInput indum={item.pr_no}/></td>
                        <td><DumyInput indum={item.material_no}/></td>
                        <td><DumyInput indum={item.material_name}/></td>
                        <td><DumyInput indum={item.material_unit}/></td>
                        <td> <DumyInput indum={item.material_price}/></td>
                        <td><DumyInput indum={item.material_qty}/></td>
                        <td><DumyInput indum={item.total_amount}/></td>
                        <td><DumyInput indum={item.material_tax}/></td>
                        <td><DumyInput indum={item.total_tax}/></td>
                        <td><DumyInput indum={item.material_text}/></td>
                        <td><DumyInput indum={'Delete'}/></td>
                        <td ><DumyInput indum={user}/></td>
                        <td ><DumyInput indum={formattedDateString}/></td>
                    </tr>
                })}
        </>
    )
}

export default PoView