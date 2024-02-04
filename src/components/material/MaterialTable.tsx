import React from 'react'
import DumyInput from '@/components/dummyinput/DumyInput'



interface Materialrdumpsprops{
    data :[{
            material_no: number | null,
            material_name: string,
            material_unit: string,
            material_qty: number|null
    }],
   
}

let serialNumber = 0;
const Materialrdumps = async (props:Materialrdumpsprops) => {
  return (
    <tbody >
      {
        props?.data?.map(({material_no,material_name,material_unit,material_qty})=>{
            console.log(material_no,material_name)
            serialNumber += 1
            return <tr key={material_no}>
                <td><DumyInput indum={serialNumber}/></td>
                <td><DumyInput indum={material_no}/></td>
                <td><DumyInput indum={material_name}/></td>
                <td><DumyInput indum={material_unit}/></td>
                <td><DumyInput indum={material_qty}/></td>
            </tr>
        })
      }
   </tbody>
  )
}




export default Materialrdumps

