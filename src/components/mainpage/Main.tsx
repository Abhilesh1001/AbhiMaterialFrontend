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
        rdpername :string,
        rdColl : string,
        loanpername :string,
        loanColl : string,
    }>({
        hiddenmaterial:"hidden",
        hiddenPr:"hidden",
        hiddenPo:"hidden",
        hiddenGRN:"hidden",
        hiddenDumps:"hidden",
        hiddenVendor:"hidden",
        hiddenDelivery:"hidden",
        hiddenFundName:"hidden",
        capitalDis :'hidden',
        rdpername: 'hidden',
        rdColl : 'hidden',
        loanpername :'hidden',
        loanColl : 'hidden',

    })


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >Main Page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenmaterial: `${hidden.hiddenmaterial==='hidden'?'flex':'hidden'}`})}>📁 Material  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenmaterial} flex-col`}>
                <Link href={'/material'}>⭐ Material create/Update/Change</Link>
            </ul>
 
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenPr:`${hidden.hiddenPr==='hidden'?'flex':'hidden'}`})}>📁 Purchase Request </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPr} flex-col`}>
                <Link href={'/purchase'}>⭐ Purchase Request create/Update/Change</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenPo : `${hidden.hiddenPo==='hidden'?'flex':'hidden'}`})}>📁 Purchase Order</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPo} flex-col`}>
                <Link href={'/purchase/purchaseorder'}>⭐ Purchase Order create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenGRN : `${hidden.hiddenGRN==='hidden'?'flex':'hidden'}`})}>📁 GRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenGRN} flex-col`}>
                <Link href={'/grn'}>⭐ GRN create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenVendor :`${hidden.hiddenVendor==='hidden'?'flex':'hidden'}`})}>📁 Vendor</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenVendor} flex-col`}>
                <Link href={'/vendor'}>⭐ Vendor create/update/Change </Link>
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
                <li>⭐ Delivery Address create/Update/Change </li>
            </ul>  
        </div>
            </div>
            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >Funds Holder Main Page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenFundName: `${hidden.hiddenFundName==='hidden'?'flex':'hidden'}`})}>📁 Fund Person  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenFundName} flex-col`}>
                <Link href={'/shfndname'}>⭐ Person Create/Update/Cahnge</Link>
            </ul>

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,capitalDis:`${hidden.capitalDis==='hidden'?'flex':'hidden'}`})}>📁 CAPITAL DISCLOUSRE </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.capitalDis} flex-col`}>
                <Link href={'/shfndname/shfdata'}>⭐ Create Fund Deposite /View Total Deposite</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,rdpername : `${hidden.rdpername==='hidden'?'flex':'hidden'}`})}>📁 Rd Person</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.rdpername} flex-col`}>
                <Link href={'/rdname'}>⭐ Create Rd /Change/Update</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , rdColl : `${hidden.rdColl==='hidden'?'flex':'hidden'}`})}>📁 Add RD Collection</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.rdColl} flex-col`}>
                <Link href={'/rdname/rdcoldata'}>⭐ Rd Collection</Link>
                <Link href={'rdname/rdcolpday'}>⭐ Rd Collection View</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,loanpername :`${hidden.loanpername==='hidden'?'flex':'hidden'}`})}>📁 Loan Person</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.loanpername} flex-col`}>
                <Link href={'loan/'}>⭐ Loan person Create /Delete /Update </Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , loanColl: `${hidden.loanColl==='hidden'?'flex':'hidden'}`})}>📁 Loan Collection</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.loanColl} flex-col`}>
                <Link href={'loan/loancoldata'}>⭐ Loan Collection</Link>
                <Link href={'loan/loancolpday'}>⭐ Loan Colleection View</Link>
                <Link href={'loan/loanamount'}>⭐ Loan amount create/change/view</Link>
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