import {grnsliiceState } from  '@/type/grn/grntype'
import React,{memo} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import Loading from '../loading/Loading'
import PrBurron from '../button/PrBurron'
import {useGrn} from '@/hooks/grn/useGrn'
import {useGrnView} from '@/hooks/grn/useGrnView'

const SelectionHeader = () => {
   const {grndata,selectedValue,mainData,grnchange} = useSelector((state:grnsliiceState)=>state.grnslice)
   const {handleRadioChange,handlePOGRNView,handleSubmit,loadingNewPoCreation,hasTrueValue} =useGrn()
   const {handleViewClick,handleGrnchange,handleInsert,handleInsertPoInGRN,handleUpdateGRN,ResetGRN} = useGrnView()
  
  return (
    <div >
    <div className='flex'>  
        <input checked={selectedValue === 'PO'} id="default-radio-1" type="radio" value="PO" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="PR" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-4 mb-2">PO</label>

        <input checked={selectedValue === 'GRN'} id="default-radio-1" type="radio" value="GRN" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">GRN</label>
    </div>

    <div className='overflow-auto' style={{ display: 'flex' }}>
        <input type="text" className='form-control w-20 text-sm' onChange={handlePOGRNView} />

        {
            selectedValue === 'GRN' && <>
            <PrBurron label={'View'} onClick={handleViewClick} />
            <PrBurron label={'Change'} onClick={handleGrnchange} />
                {grnchange && <>{!hasTrueValue?<button className="btn btn-success mx-2  text-gray-800 dark:bg-green-500 bg-green-500 btn-sm dark:text-gray-50 h-8 text-sm" type='button' onClick={()=>handleUpdateGRN(Number(grndata.grn_no))} >Update</button>:<PrBurron label='Update'/>}</>}
            </>
        }
        {
            selectedValue === 'PO' && <> 
            <PrBurron label={'Insert PO'} onClick={handleInsert} />

            {!hasTrueValue ? <button className="btn btn-success mx-2 dark:bg-green-800 text-gray-800 bg-green-500 dark:text-gray-50 h-8 text-sm  btn-sm" type='button' onClick={handleSubmit} >Save</button>:<PrBurron label='Save'/>}

            </>
        }
        <PrBurron label={'Reset'} onClick={ResetGRN} />
        
        <button className="btn btn-warning mx-2  btn-sm  text-gray-800 dark:bg-slate-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Print</button>
        <div className='flex items-center mr-4 text-slate-50'>Total Tax</div>
        <div className='flex items-center  text-green-400'>{mainData.TotalTax}</div>
        <div className='flex items-center ml-4 dark:text-slate-50'>Total Amount</div>
        <div className='flex items-center text-green-400 ml-4'>{mainData.TotalWithtax}</div>
        <div className='w-full flex justify-center'>{loadingNewPoCreation && <Loading />}</div>
        {grndata.grn_no && <div className=' text-gray-50'>GRN : {grndata.grn_no}</div>}

    </div>
</div>
  )
}

export default memo(SelectionHeader)