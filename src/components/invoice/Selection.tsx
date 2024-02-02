import {irnsliiceState} from '@/type/irn/irn'
import React,{memo} from 'react'
import {useSelector} from 'react-redux'
import Loading from '../loading/Loading'
import PrBurron from '../button/PrBurron'
import {useIrn} from '@/hooks/invoice/useIrn'
import {useIrnView} from '@/hooks/invoice/useIrnView'

const SelectionHeader = () => {
    const {irndata,selectedValue,mainData,irnchange} = useSelector((state:irnsliiceState)=>state.irnSlice)
   const {handleRadioChange,handlePOGRNView,handleSubmit,loadingNewPoCreation,hasTrueValue} =useIrn()
   const {handleViewClick,handleGrnchange,handleInsert,handleUpdateGRN,ResetGRN} = useIrnView()
  
  return (
    <div >
    <div className='flex'>
        <input checked={selectedValue === 'PO'} id="default-radio-1" type="radio" value="PO" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="PR" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-4 mb-2">PO</label>

        <input checked={selectedValue === 'IRN'} id="default-radio-1" type="radio" value="IRN" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
        <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">IRN</label>
    </div>

    <div className='' style={{ display: 'flex' }}>
        <input type="text" className='form-control w-20 text-sm' onChange={handlePOGRNView} />

        {
            selectedValue === 'IRN' && <>
            <PrBurron label={'View'} onClick={handleViewClick} />
            <PrBurron label={'Change'} onClick={handleGrnchange} />
                {irnchange && <>{!hasTrueValue?<button className="btn btn-success mx-2  text-gray-800 dark:bg-green-500 bg-green-500 dark:text-gray-50 h-8 text-sm" type='button' onClick={()=>handleUpdateGRN(Number(irndata.irn_no))} >Update</button>:<PrBurron label='Update'/>}</>}
            </>
        }
        {
            selectedValue === 'PO' && <> 
            <PrBurron label={'Insert PO'} onClick={handleInsert} />

            {!hasTrueValue ? <button className="btn btn-success mx-2 dark:bg-green-800 text-gray-800 bg-green-500 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Save</button>:<PrBurron label='Save'/>}

            </>
        }
        <PrBurron label={'Reset'} onClick={ResetGRN} />
        
        <button className="btn btn-warning mx-2  text-gray-800 dark:bg-slate-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Print</button>
        <div className='flex items-center mr-4 text-slate-50'>Total Tax</div>
        <div className='flex items-center  text-green-400'>{mainData.TotalTax}</div>
        <div className='flex items-center ml-4 dark:text-slate-50'>Total Amount</div>
        <div className='flex items-center text-green-400 ml-4'>{mainData.TotalWithtax}</div>
        <div className='w-full flex justify-center'>{loadingNewPoCreation && <Loading />}</div>
        {irndata.irn_no && <div className=' text-gray-50'>GRN : {irndata.irn_no}</div>}

    </div>
</div>
  )
}

export default memo(SelectionHeader)