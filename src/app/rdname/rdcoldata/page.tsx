'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import {vendorType} from '@/type/type'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import DumyInput from '@/components/dummyinput/DumyInput'
import {rdholderName,collData} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';


const Vendor = () => {
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdcollection,setRdcollection] = useState<collData[]>([{user:userId,person :null,amount_collected : null,remarks: '',name:''}])
    console.log('rdcoll',rdcollection)
   

    const handleHOderView = async ()=>{

        try{
            const res = await axios.get(`${baseurl}shar/rdname`,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})
              const dataCol =  res.data.map((items:{rdp_id:number,name:string})=>{
                    const neData = {
                        user:userId,
                        person : items.rdp_id,
                        name : items.name,
                        amount_collected : null,
                        remarks: null
                    }
                    return neData
              })
              setRdcollection(dataCol)
        }catch(error){
            console.log(error)
        }

    }


    const handleSubmit = async () =>{
        console.log(rdcollection)

    
    try{

        const res = await axios.post(`${baseurl}shar/rdcoll`, rdcollection,{headers:{
            Authorization:`Bearer ${authToken?.access}`
        }})
        const data = res.data
        setRdcollection([{user:userId,person :null,amount_collected : null,remarks: '',name:''}])
        
    }catch(error){
        console.log(error)
    }
}


    const handleChange = (value:string|number,key:keyof collData,index:number )=>{
        const freData:any = [...rdcollection]
        freData[index][key]=value
        setRdcollection(freData)
    }
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={handleHOderView} label={'New'} />
                   <PrBurron  label={'Change'}/>
                   <PrBurron onClick={handleSubmit} label={'Submit'}/>
                </div>
                <div>
                </div>
                {/* <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data!==undefined && data.data.msg } RD Holder Id {data!==undefined && data.data.data.rdp_id}</div></div>}</div> */}
            </div>



        </div>
        <div className="row">
        <div className="col-sm-6 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900  bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Collection Amount</th>
                                <th scope="col">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {rdcollection?.map((items:collData,index:number)=>{
                                return  <tr key={items.person}>
                                <th scope="row"><DumyInput indum={items.person !==undefined?items.person:null}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><TextInput type={'number'} value= {items.amount_collected} onChange={(e)=>handleChange(Number(e.target.value),'amount_collected',index)} /></td>
                                <td><TextInput  value= {items.remarks} onChange={(e)=>handleChange(e.target.value,'remarks',index)} /></td> 
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