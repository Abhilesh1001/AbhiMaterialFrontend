import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {vendorType} from '@/type/type'
import axios from 'axios'
import {rdholderName,collData} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';

import React, { useEffect, useState } from 'react'

export const useRdcoldata =()=>{


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

    return {handleHOderView,handleSubmit,rdcollection,handleChange}
}