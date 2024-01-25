
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {loancollData} from '@/type/shareholder/shareholde'






export const useLoancoldata=()=>{


    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdcollection,setRdcollection] = useState<loancollData[]>([{user:userId,loan_person :null,amount_collected : null,remarks: '',name:''}])
    console.log('rdcoll',rdcollection)
   

    const handleHOderView = async ()=>{

        try{
            const res = await axios.get(`${baseurl}shar/loanname`,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})
              const dataCol =  res.data.map((items:{loan_id:number,name:string})=>{
                    const neData = {
                        user:userId,
                        loan_person : items.loan_id,
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

        const res = await axios.post(`${baseurl}shar/loancoll`, rdcollection,{headers:{
            Authorization:`Bearer ${authToken?.access}`
        }})
        const data = res.data
        setRdcollection([{user:userId,loan_person :null,amount_collected : null,remarks: '',name:''}])
        
    }catch(error){
        console.log(error)
    }
}


    const handleChange = (value:string|number,key:keyof loancollData,index:number )=>{
        const freData:any = [...rdcollection]
        freData[index][key]=value
        setRdcollection(freData)
    }


    return {handleHOderView,handleSubmit,rdcollection,handleChange}
}