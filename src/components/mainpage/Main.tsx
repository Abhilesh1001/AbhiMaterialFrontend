"use client"
import React, { useState } from 'react'
import Link from 'next/link'

const Main = () => {
    const [hidden,setHidden] = useState<{
        hiddenmaterial:string,
        hiddenPr:string,
        hiddenPo:string,
        hiddenGRN:string,
        hiddenDumps:string,
        hiddenVendor:string,
        hiddenDelivery:string,
        hiddenFundName:string,
        capitalDis : string,
    }>({
        hiddenmaterial:"hidden",
        hiddenPr:"hidden",
        hiddenPo:"hidden",
        hiddenGRN:"hidden",
        hiddenDumps:"hidden",
        hiddenVendor:"hidden",
        hiddenDelivery:"hidden",
        hiddenFundName:"hidden",
        capitalDis :'hidden'
    })


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >Main Page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenmaterial: `${hidden.hiddenmaterial==='hidden'?'flex':'hidden'}`})}>📁 Material  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenmaterial} flex-col`}>
                <Link href={'/material'}>⭐ Create Material</Link>
                <Link href={'/material'}>⭐ Change Material</Link>
                <Link href={'/material'}>⭐View Material</Link>
            </ul>

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenPr:`${hidden.hiddenPr==='hidden'?'flex':'hidden'}`})}>📁 Purchase Request </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPr} flex-col`}>
                <Link href={'/purchase'}>⭐ Create Purchase Request</Link>
                <Link href={'/purchase'}>⭐ Change Purchase Request</Link>
                <Link href={'/purchase/'}>⭐View Purchase Request</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenPo : `${hidden.hiddenPo==='hidden'?'flex':'hidden'}`})}>📁 Purchase Order</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPo} flex-col`}>
                <Link href={'/purchase/purchaseorder'}>⭐ Create Purchase Order</Link>
                <Link href={'/purchase/purchaseorder'}>⭐ Change Purchase Order</Link>
                <Link href={'/purchase/purchaseorder'}>⭐View Purchase Order</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenGRN : `${hidden.hiddenGRN==='hidden'?'flex':'hidden'}`})}>📁 GRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenGRN} flex-col`}>
                <Link href={'/grn'}>⭐ Create GRN</Link>
                <Link href={'/grn'}>⭐ Change GRN</Link>
                <Link href={'/grn'}>⭐View GRN</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenVendor :`${hidden.hiddenVendor==='hidden'?'flex':'hidden'}`})}>📁 Vendor</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenVendor} flex-col`}>
                <Link href={'/vendor'}>⭐ Create Vendor </Link>
                <Link href={'/vendor'}>⭐ Change Vendor</Link>
                <Link href={'/vendor'}>⭐View Vendor</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDumps: `${hidden.hiddenDumps==='hidden'?'flex':'hidden'}`})}>📁 Dumps</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDumps} flex-col`}>
                <li>⭐ Material Stock </li>
                <Link href={'purchase/preqdumps'}>⭐ Purchase Request</Link>
                <Link href={"purchase/podumps"}>⭐ Purchase Order</Link>
                <Link href={"grn/grndumps"}>⭐  GRN</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDelivery : `${hidden.hiddenDelivery==='hidden'?'flex':'hidden'}`})}>📁 Delivery Adress</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDelivery} flex-col`}>
                <li>⭐ Create Delivery </li>
                <li>⭐ Change Delivery</li>
                <li>⭐ View Delivery</li>
            </ul>  
        </div>
            </div>
            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >Funds Holder Main Page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenFundName: `${hidden.hiddenFundName==='hidden'?'flex':'hidden'}`})}>📁 Fund Person  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenFundName} flex-col`}>
                <Link href={'/shfndname'}>⭐ Create Person</Link>
                <Link href={'/shfndname'}>⭐ Change Person</Link>
                <Link href={'/shfndname'}>⭐ Update Person</Link>
            </ul>

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,capitalDis:`${hidden.capitalDis==='hidden'?'flex':'hidden'}`})}>📁 CAPITAL DISCLOUSRE </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.capitalDis} flex-col`}>
                <Link href={'/shfndname/shfdata'}>⭐ Create Fund Deposite</Link>
                <Link href={'/shfndname/shfdata'}>⭐ Change Fund Deposite</Link>
                <Link href={'/shfndname/shfdata'}>⭐View Fund Deposite</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenPo : `${hidden.hiddenPo==='hidden'?'flex':'hidden'}`})}>📁 Purchase Order</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPo} flex-col`}>
                <Link href={'/purchase/purchaseorder'}>⭐ Create Purchase Order</Link>
                <Link href={'/purchase/purchaseorder'}>⭐ Change Purchase Order</Link>
                <Link href={'/purchase/purchaseorder'}>⭐View Purchase Order</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenGRN : `${hidden.hiddenGRN==='hidden'?'flex':'hidden'}`})}>📁 GRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenGRN} flex-col`}>
                <Link href={'/grn'}>⭐ Create GRN</Link>
                <Link href={'/grn'}>⭐ Change GRN</Link>
                <Link href={'/grn'}>⭐View GRN</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenVendor :`${hidden.hiddenVendor==='hidden'?'flex':'hidden'}`})}>📁 Vendor</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenVendor} flex-col`}>
                <Link href={'/vendor'}>⭐ Create Vendor </Link>
                <Link href={'/vendor'}>⭐ Change Vendor</Link>
                <Link href={'/vendor'}>⭐View Vendor</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDumps: `${hidden.hiddenDumps==='hidden'?'flex':'hidden'}`})}>📁 Dumps</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDumps} flex-col`}>
                <li>⭐ Material Stock </li>
                <Link href={'purchase/preqdumps'}>⭐ Purchase Request</Link>
                <Link href={"purchase/podumps"}>⭐ Purchase Order</Link>
                <Link href={"grn/grndumps"}>⭐  GRN</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDelivery : `${hidden.hiddenDelivery==='hidden'?'flex':'hidden'}`})}>📁 Delivery Adress</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDelivery} flex-col`}>
                <li>⭐ Create Delivery </li>
                <li>⭐ Change Delivery</li>
                <li>⭐ View Delivery</li>
            </ul>  
        </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
      
        
    </div>
  )
}

export default Main