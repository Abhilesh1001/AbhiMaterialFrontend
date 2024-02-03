import React from 'react'
import DumyInput from '../dummyinput/DumyInput'
import {useSelector,useDispatch} from 'react-redux'
import {irnsliiceState,billDetails} from '@/type/irn/irn'
import {getBillData} from '@/redux/irn/irnslicer'

const Billing = () => {
  const dispatch = useDispatch()
  const {irnview,billData} = useSelector((state:irnsliiceState)=>state.irnSlice)
  
  const handleChange = (value:any,key:keyof billDetails) =>{
          console.log(value,key)
          const newData = {...billData}
          newData[key] = value
          console.log(newData)
          dispatch(getBillData(newData))
  }


  return (
    <div className='h-[100px] relative overflow-y-auto shadow-md dark:bg-gray-900 mt-4 mb-2 bg-sky-500 sm:rounded-lg'>
    <table className='w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400'>
        <thead>
            <tr className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                <th><div className='ml-2'>Bill Date</div></th>
                <th>Bill No</th>
                <th>Delivery Note</th>
            </tr>
        </thead>
        <tbody>
                <tr>
                    <td>{irnview ?<DumyInput indum={billData.bill_date}/>:<input type="date" value={billData.bill_date != null ? billData.bill_date : ''} onChange={(e) => handleChange(e.target.value, 'bill_date')} className="form-control  text-sm  w-full" placeholder='DD.MM.YYYY' />}</td>

                    <td>{irnview ?<DumyInput indum={billData.bill_no}/>:<input type="text" value={billData.bill_no != null ? billData.bill_no : ''} onChange={(e) => handleChange(e.target.value, 'bill_no')} className="form-control  text-sm  w-full" />}</td>

                    <td>{irnview ?<DumyInput indum={billData.delivery_note}/>:<input type="text" value={billData.delivery_note != null ? billData.delivery_note: ''} onChange={(e) => handleChange(e.target.value, 'delivery_note')} className="form-control  text-sm  w-full" />}</td>
                </tr>
        </tbody>
    </table>
    </div>
  )
}

export default Billing