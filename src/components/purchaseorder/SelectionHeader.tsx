
import { usePo } from '@/hooks/purchseorder/usePo'
import { posliiceState,mainType } from '@/type/type'
import React,{memo} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Loading from '../loading/Loading'


const SelectionHeader = () => {
   const {handleRadioChange,handlePRPOView,handleViewClick,handleForm,handleSubmit,loadingNewPoCreation} = usePo()
   const {podata,selectedValue,mainData} = useSelector((state:posliiceState)=>state.poslicer)
   let mainamount:mainType = {TotalAmount:null, TotalWithtax:null, TotalTax:null}
   if(podata.maindata){
      mainamount = JSON.parse(podata.maindata)
   }
 
  return (
    <div >
    <div className='flex'>
        <input checked={selectedValue === 'PR'} id="default-radio-1" type="radio" value="PR" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />

        <label htmlFor="PR" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-4 mb-2">PR</label>
        <input checked={selectedValue === 'PO'} id="default-radio-1" type="radio" value="PO" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">PO</label>
    </div>

    <div className='' style={{ display: 'flex' }}>
        <input type="text" className='form-control w-20 text-sm' onChange={handlePRPOView} />

        {
            selectedValue === 'PO' && <> <button className="btn btn-secondary mx-2 text-gray-800 dark:bg-slate-400  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleViewClick}>View</button>
                <button className="btn btn-primary mx-2  text-gray-800 dark:bg-slate-400  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Change</button>
                <button className="btn btn-secondary mx-2  text-gray-800 dark:bg-slate-400  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleForm}>Add Form</button>
                <button className="btn btn-success mx-2  text-gray-800 dark:bg-slate-400  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Update</button>
            </>
        }
        {
            selectedValue === 'PR' && <> <button className="btn btn-secondary mx-2 dark:bg-slate-400 text-gray-800   bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleViewClick}>Create PO</button><button className="btn btn-success mx-2 dark:bg-slate-400 text-gray-800   bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Save</button>
            </>
        }
        <button className="btn btn-warning mx-2  text-gray-800 dark:bg-slate-400  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Print</button>
        <div className='flex items-center mr-4'>Total Tax</div>
        <div className='flex items-center  text-green-400'>{selectedValue === 'PO'?mainamount.TotalTax:mainData.TotalTax}</div>
        <div className='flex items-center ml-4'>Total Amount</div>
        <div className='flex items-center text-green-400 ml-4'>{selectedValue === 'PO'?mainamount.TotalWithtax:mainData.TotalWithtax}</div>
        <div className='w-full flex justify-center'>{loadingNewPoCreation && <Loading />}</div>
    </div>
</div>
  )
}

export default memo(SelectionHeader)