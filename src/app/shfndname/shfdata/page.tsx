'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'


import DumyInput from '@/components/dummyinput/DumyInput'

import { useShfdata } from '@/hooks/shf/useShfdata'
import {shareholderFund} from '@/type/shareholder/shareholde'



const Vendor = () => {
    
    const {setEnabled,mutation,data,handleKeyDown,vid,setVid,handleSubmit,sharfund,setShareFund,newData} = useShfdata()

  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                   <PrBurron  label={'Change'}/>
                </div>
                <div>
                </div>
                <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data!==undefined && data.data.msg }</div></div>}</div>
                <label htmlFor="Vendor" className="form-label text-sm">Holder Id</label>
                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e)=>setVid(e.target.value)} className="form-control  text-sm  w-full" />
                <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum = {sharfund.name}  />
                <label htmlFor="Phone" className="form-label text-sm ">Credit</label>
                <TextInput value={sharfund.amount_credit} type={'number'}  onChange = {(e)=>setShareFund({...sharfund,amount_credit :Number(e.target.value)})} />

                <label htmlFor="Email" className="form-label text-sm">Debit</label>
                <TextInput type={'number'}  value={sharfund.amount_debit} onChange = {(e)=>setShareFund({...sharfund,amount_debit :Number(e.target.value)})} />
                <label htmlFor="pan" className="form-label text-sm">Particulars</label>
                <TextInput  css={'mb-4'} value={sharfund.particulars} onChange = {(e)=>setShareFund({...sharfund,particulars:e.target.value})} />
               <PrBurron label={'Submit'} buttomType={'submit'} /> 
                </form>
            </div>
            <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Amount Invested</th>
                                <th scope="col">Present Value</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {newData?.map((items:shareholderFund)=>{
                                
                                return  <tr key={items.shf_id}>
                                <th scope="row"><DumyInput indum={items.shf_id}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><DumyInput indum={''}/></td>
                                <td><DumyInput indum={items.totalInvested}/></td>
                                <td><DumyInput indum={''}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor