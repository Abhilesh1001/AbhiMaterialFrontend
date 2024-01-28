import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {vendorType} from '@/type/type'
import axios from 'axios'
import {rdholderName,collData} from '@/type/shareholder/shareholde'


import React, { useEffect, useState } from 'react'

interface MyData {
     data :{
        msg:string
     }
}

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

    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:collData[]) => {
          return await axios.post(`${baseurl}shar/rdcoll`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setRdcollection([{user:userId,person :null,amount_collected : null,remarks: '',name:''}])
          },  
    })
    
    const handleSubmit = async () =>{
     mutation.mutate(rdcollection) 
}


    const handleChange = (value:string|number,key:keyof collData,index:number )=>{
        const freData:any = [...rdcollection]
        freData[index][key]=value
        setRdcollection(freData)
    }
    const [enable,setEnable] = useState(false)
    const [Id,setId] = useState<null|number>(null)
    

    const fetchData = async ()=>{
        console.log('ok',Id)
        setEnable(false)
        const res =await  axios.get(`${baseurl}shar/rdcoll/${Id}`,{
            headers:{
                Authorization:`Bearer ${authToken?.access}`
              }
        })

        // console.log(res.data)
        return res.data
    }

    const {data} = useQuery({queryKey:[`allCollRdData${Id}`],queryFn:fetchData,enabled:enable})
    console.log(data,'data')

    const handleclickrdcolallview=(id:number|null)=>{
        
        setEnable(true)
        setId(id)

    }

    return {handleHOderView,handleSubmit,rdcollection,handleChange,mutation,handleclickrdcolallview,data}
}