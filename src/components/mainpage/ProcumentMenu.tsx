
'use client'
import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { getHidden, getMainheader } from '@/redux/slice'
import { soundClick } from '@/sound/sound'
import { StateProps } from '@/type/type'
import Link from 'next/link'
import { useMenu } from '@/hooks/menu/useMenu'

const ProcumentMenu = () => {
    const dispatch = useDispatch()
    const {hidden} = useSelector((state:StateProps)=>state.counter)
    const {setHiddenMenu} = useMenu()

    const handleClick = (value:string)=>{
        soundClick?.play()
        dispatch(getMainheader(value))
        localStorage.setItem('mainHeader',value)
        setHiddenMenu('hidden')
    } 
  return (
    <div className="">
            <div className='top-10 relative overflow-auto'>
            <div className='' >PO / PR / GRN / Material Stock Main page</div>

            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden,hiddenmaterial: `${hidden.hiddenmaterial==='hidden'?'flex':'hidden'}`}))}>📁 Material  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenmaterial} flex-col`}>
                <Link href={'/material'} onClick={()=>handleClick('Material create/Update/Change')}>⭐ Material create/Update/Change</Link>
            </ul>
 
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden,hiddenPr:`${hidden.hiddenPr==='hidden'?'flex':'hidden'}`}))}>📁 Purchase Request </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPr} flex-col`}>
                <Link href={'/purchase'} onClick={()=>handleClick('Purchase Request create/Update/Change')}>⭐ Purchase Request create/Update/Change</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden ,hiddenPo : `${hidden.hiddenPo==='hidden'?'flex':'hidden'}`}))}>📁 Purchase Order</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPo} flex-col`}>
                <Link href={'/purchase/purchaseorder'} onClick={()=>handleClick('Purchase Order create/Update/Cahnge')}>⭐ Purchase Order create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , hiddenGRN : `${hidden.hiddenGRN==='hidden'?'flex':'hidden'}`}))}>📁 GRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenGRN} flex-col`}>
                <Link href={'/grn'} onClick={()=>handleClick('GRN create/Update/Cahnge')}>⭐ GRN create/Update/Cahnge</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , invoice : `${hidden.invoice==='hidden'?'flex':'hidden'}`}))}>📁 IRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.invoice} flex-col`}>
                <Link href={'/invoice'} onClick={()=>handleClick('IRN create/Update/Cahnge')}>⭐ IRN create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden ,hiddenVendor :`${hidden.hiddenVendor==='hidden'?'flex':'hidden'}`}))}>📁 Vendor</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenVendor} flex-col`}>
                <Link href={'/vendor'} onClick={()=>handleClick('Vendor create/update/Change')}>⭐ Vendor create/update/Change </Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , hiddenDumps: `${hidden.hiddenDumps==='hidden'?'flex':'hidden'}`}))}>📁 Dumps</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDumps} flex-col`}>
                <Link href={'/material/materialstock'} onClick={()=>handleClick('Material Stock')}>⭐ Material Stock </Link>
                <Link href={'/purchase/preqdumps'} onClick={()=>handleClick('Purchase Request Dumps')}>⭐ Purchase Request</Link>
                <Link href={"/purchase/podumps"} onClick={()=>handleClick('Purchase Order Dumps')}>⭐ Purchase Order</Link>
                <Link href={"/grn/grndumps"} onClick={()=>handleClick('GRN Dumps')}>⭐  GRN</Link>
                <Link href={"/invoice/irndumps"} onClick={()=>handleClick('IRN Dumps')}>⭐  IRN</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden ,issuematerial :`${hidden.issuematerial==='hidden'?'flex':'hidden'}`}))}>📁 Material Issue</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.issuematerial} flex-col`}>
                <Link href={'/material/IssueMaterial'} onClick={()=>handleClick('Material Issue/update/View')}>⭐ Material Issue/update/View </Link>
            </ul> 
        
            <div className='cursor-pointer' onClick={()=>dispatch(getHidden({...hidden , hiddenDelivery : `${hidden.hiddenDelivery==='hidden'?'flex':'hidden'}`}))}>📁 Delivery Adress under devlopment</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDelivery} flex-col`}>
                <li>⭐ Delivery Address create/Update/Change </li>
            </ul>  
        </div>
            </div>
  )
}

export default ProcumentMenu