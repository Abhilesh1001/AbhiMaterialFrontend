"use client"
import React, { useState,memo,useEffect } from 'react'
import Link from 'next/link'
import {useSelector,useDispatch} from 'react-redux'
import { getMainheader } from '@/redux/slice'

const Main = () => {
    const  dispatch = useDispatch()
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
        invoice:string,
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
        invoice:'hidden'

    })
   
   
    const handleClick = (value:string)=>{
        dispatch(getMainheader(value))
        localStorage.setItem('mainHeader',value)
    } 


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >PO / PR / GRN / Material Stock Main page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenmaterial: `${hidden.hiddenmaterial==='hidden'?'flex':'hidden'}`})}>📁 Material  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenmaterial} flex-col`}>
                <Link href={'/material'} onClick={()=>handleClick('Material create/Update/Change')}>⭐ Material create/Update/Change</Link>
            </ul>
 
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenPr:`${hidden.hiddenPr==='hidden'?'flex':'hidden'}`})}>📁 Purchase Request </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPr} flex-col`}>
                <Link href={'/purchase'} onClick={()=>handleClick('Purchase Request create/Update/Change')}>⭐ Purchase Request create/Update/Change</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenPo : `${hidden.hiddenPo==='hidden'?'flex':'hidden'}`})}>📁 Purchase Order</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenPo} flex-col`}>
                <Link href={'/purchase/purchaseorder'} onClick={()=>handleClick('Purchase Order create/Update/Cahnge')}>⭐ Purchase Order create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenGRN : `${hidden.hiddenGRN==='hidden'?'flex':'hidden'}`})}>📁 GRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenGRN} flex-col`}>
                <Link href={'/grn'} onClick={()=>handleClick('GRN create/Update/Cahnge')}>⭐ GRN create/Update/Cahnge</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , invoice : `${hidden.invoice==='hidden'?'flex':'hidden'}`})}>📁 IRN</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.invoice} flex-col`}>
                <Link href={'/invoice'} onClick={()=>handleClick('IRN create/Update/Cahnge')}>⭐ IRN create/Update/Cahnge</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,hiddenVendor :`${hidden.hiddenVendor==='hidden'?'flex':'hidden'}`})}>📁 Vendor</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenVendor} flex-col`}>
                <Link href={'/vendor'} onClick={()=>handleClick('Vendor create/update/Change')}>⭐ Vendor create/update/Change </Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDumps: `${hidden.hiddenDumps==='hidden'?'flex':'hidden'}`})}>📁 Dumps</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDumps} flex-col`}>
                <Link href={'material/materialstock'} onClick={()=>handleClick('Material Stock')}>⭐ Material Stock </Link>
                <Link href={'purchase/preqdumps'} onClick={()=>handleClick('Purchase Request Dumps')}>⭐ Purchase Request</Link>
                <Link href={"purchase/podumps"} onClick={()=>handleClick('Purchase Order Dumps')}>⭐ Purchase Order</Link>
                <Link href={"grn/grndumps"} onClick={()=>handleClick('GRN Dumps')}>⭐  GRN</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , hiddenDelivery : `${hidden.hiddenDelivery==='hidden'?'flex':'hidden'}`})}>📁 Delivery Adress under devlopment</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenDelivery} flex-col`}>
                <li>⭐ Delivery Address create/Update/Change </li>
            </ul>  
        </div>
            </div>

            <div className="col-sm-4">
            <div className='top-10 relative overflow-auto'>
            <div className='' >RD / Share Fund /Loan Main Page</div>
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,hiddenFundName: `${hidden.hiddenFundName==='hidden'?'flex':'hidden'}`})}>📁 Fund Person  </div>    
            <ul className={`ml-8 cursor-pointer ${hidden.hiddenFundName} flex-col`}>
                <Link href={'/shfndname'} onClick={()=>handleClick('Fund Person Create/Update/Change')}>⭐ Person Create/Update/Cahnge</Link>
            </ul>

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden,capitalDis:`${hidden.capitalDis==='hidden'?'flex':'hidden'}`})}>📁 CAPITAL DISCLOUSRE </div>  
            <ul className={`ml-8 cursor-pointer ${hidden.capitalDis} flex-col`}>
                <Link href={'/shfndname/shfdata'} onClick={()=>handleClick('Fund Deposite /View Total Deposite')}>⭐ Create Fund Deposite /View Total Deposite</Link>
            </ul>  
            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,rdpername : `${hidden.rdpername==='hidden'?'flex':'hidden'}`})}>📁 Rd Person</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.rdpername} flex-col`}>
                <Link href={'/rdname'} onClick={()=>handleClick('RD person Create/Change/Update/View')}>⭐ Create Rd /Change/Update</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , rdColl : `${hidden.rdColl==='hidden'?'flex':'hidden'}`})}>📁 Add RD Collection</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.rdColl} flex-col`}>
                <Link href={'/rdname/rdcoldata'} onClick={()=>handleClick(' Rd Collection')}>⭐ Rd Collection</Link>
                <Link href={'rdname/rdcolpday'} onClick={()=>handleClick('Rd Collection View')}>⭐ Rd Collection View</Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden ,loanpername :`${hidden.loanpername==='hidden'?'flex':'hidden'}`})}>📁 Loan Person</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.loanpername} flex-col`}>
                <Link href={'loan/'} onClick={()=>handleClick('Loan person Create /Delete /Update')}>⭐ Loan person Create /Delete /Update </Link>
            </ul>  

            <div className='cursor-pointer' onClick={()=>setHidden({...hidden , loanColl: `${hidden.loanColl==='hidden'?'flex':'hidden'}`})}>📁 Loan Collection</div>  
            <ul className={`ml-8 cursor-pointer ${hidden.loanColl} flex-col`}>
                <Link href={'loan/loancoldata'} onClick={()=>handleClick('Loan Collection')}>⭐ Loan Collection</Link>
                <Link href={'loan/loancolpday'} onClick={()=>handleClick('Loan Colleection View')}>⭐ Loan Colleection View</Link>
                <Link href={'loan/loanamount'} onClick={()=>handleClick('Loan amount create/change/view')}>⭐ Loan amount create/change/view</Link>
            </ul>  
  
        </div>
            </div>
            <div className="col-sm-4"></div>
        </div>
      
        
    </div>
  )
}

export default memo(Main)