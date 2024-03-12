'use client'
import DumyInput from '../dummyinput/DumyInput'
import { useIsMaterial } from '@/hooks/material/useIssueMatrial';
import {useSelector,useDispatch} from 'react-redux'
import {matState,matType} from '@/type/material/materia-type'
import PrBurron from '../button/PrBurron';
import TableHead from '../dummyinput/TableHead';

interface dataType {
    viewdata :string 
    changeData:string
}

const MaterialIssueTable = (props:dataType) => {
    const {matData:data} =  useSelector((state:matState)=>state.matSlice)
    const {handleKeyDown,handleChange,handleDelete,view,change} = useIsMaterial()
    let serialNo = 0
    const materialIssue = ['S No','Line No','Material No','Material Name','Material Unit', 'Material Qty','Material Issue','Remarks','Delete']

    const renderTableRows = () => {
        return data?.map((item:matType,index) => {
            serialNo+=1
           return  <tr key={index}>
                    <td><DumyInput indum={serialNo} /></td>
                    <td ><DumyInput indum={item.mi_line} /></td>
                        <td >{props.viewdata !=='change'  ?<DumyInput indum={item.material_no} />: <input type='number' value={item.material_no!==null?item.material_no===0?'':item.material_no:''} className='form-control text-sm' onKeyDown={(e)=>handleKeyDown(e,index)} onChange={(e)=>handleChange(Number(e.target.value),'material_no',index)} />}</td>

                        <td ><DumyInput indum={item.material_name} /></td>
                        <td ><DumyInput indum={item.material_unit} /></td>
                        <td ><DumyInput indum={item.material_qty} /></td>
                        <td >{props.viewdata !=='change' ?<DumyInput indum={item.material_issue} />:<input type='number' className='form-control text-sm' value={item.material_issue!==null?item.material_issue===0?'':item.material_issue:''}  onChange={(e)=>handleChange(Number(e.target.value),'material_issue',index)} />}</td>

                        <td >{props.viewdata !=='change'?<DumyInput indum={item.material_remarks} />:<input type='text' className='form-control text-sm w-60' value={item.material_remarks!==null?item.material_remarks:''}  onChange={(e)=>handleChange(e.target.value,'material_remarks',index)} />}</td>

                        <td>{props.viewdata !=='change' ?'':<PrBurron label={'Delete'} onClick={()=>handleDelete(index)} />}</td>
                </tr>
        })
    };


  return (
    <div className=' ml-2 mr-2 h-[550px] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
            <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 " >

                     <TableHead mainData ={materialIssue} />                    
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
  )
}

export default MaterialIssueTable