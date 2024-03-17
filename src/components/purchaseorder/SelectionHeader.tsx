import { usePo } from '@/hooks/purchseorder/usePo'
import { posliiceState, mainType } from '@/type/type'
import React, { memo, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../loading/Loading'
import PrBurron from '../button/PrBurron'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import PoPrint from '../print/PoPrint'
import { useReactToPrint } from 'react-to-print';



const SelectionHeader = () => {
    const { handleRadioChange, handlePRPOView, handleSubmit, loadingNewPoCreation, hasTrueValue } = usePo()
    const { handleViewClick, handlePochange, handleInsert, handleInsertPrInpo, handleUpdatePo, ResetPo } = usePoview()
    const { podata, selectedValue, mainData, pochange } = useSelector((state: posliiceState) => state.poslicer)
    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({ 
        content: () => componentRef.current, 
        
    });

    return (
        <div >
            <div className='flex'>
                <input checked={selectedValue === 'PR'} id="default-radio-1" type="radio" value="PR" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />

                <label htmlFor="PR" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 mr-4 mb-2">PR</label>
                <input checked={selectedValue === 'PO'} id="default-radio-1" type="radio" value="PO" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleRadioChange} />
                <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">PO</label>
            </div>

            <div className='overflow-auto' style={{ display: 'flex' }}>
                <input type="number" className='form-control w-20 text-sm' onChange={handlePRPOView} />

                {
                    selectedValue === 'PO' && <>
                        <PrBurron label={'View'} onClick={handleViewClick} />
                        <PrBurron label={'Change'} onClick={handlePochange} />
                        {pochange && <PrBurron label={'Insert PR'} onClick={handleInsertPrInpo} />}
                        {pochange && <>{!hasTrueValue ? <button className="btn btn-success mx-2 btn-sm  text-gray-800 dark:bg-green-400  bg-green-400 dark:text-gray-50 h-8 text-sm" type='button' onClick={() => handleUpdatePo(Number(podata.po_no))} >Update</button> : <PrBurron label='Update' />}</>}
                    </>
                }
                {
                    selectedValue === 'PR' && <>
                        <PrBurron label={'Insert PR'} onClick={handleInsert} />

                        {!hasTrueValue ? <button className="btn btn-success btn-sm mx-2 dark:bg-green-400 text-gray-800 bg-green-400  dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Save</button> : <PrBurron label='Save' />}

                    </>
                }
                <PrBurron label={'Reset'} onClick={ResetPo} />
                <div className="hidden">
                    <PoPrint ref={componentRef} />
                </div>
                <button className="btn btn-warning mx-2 btn-sm  text-gray-800 dark:bg-slate-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" onClick={handlePrint} type='button'>Print</button>
                <div className='flex items-center mr-4 text-slate-50'>Total Tax</div>
                <div className='flex items-center  text-green-400'>{mainData.TotalTax}</div>
                <div className='flex items-center ml-4 dark:text-slate-50'>Total Amount</div>
                <div className='flex items-center text-green-400 ml-4'>{mainData.TotalWithtax}</div>
                <div className='w-full flex justify-center'>{loadingNewPoCreation && <Loading />}</div>
                {podata.po_no && <div className=' text-gray-50'>Purchase Order : {podata.po_no}</div>}

            </div>
        </div>
    )
}

export default memo(SelectionHeader)