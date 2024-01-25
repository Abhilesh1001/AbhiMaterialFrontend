import {vendorType} from '@/type/type'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useMutation,useQuery} from '@tanstack/react-query'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import {shareholderName} from '@/type/shareholder/shareholde'

interface MyData {
    data:{
        msg : string,
        data:shareholderName
    },
    isPending :boolean,
    
}

export const useShfname = ()=>{
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)

    const [shareholder,setShareHolder] = useState<shareholderName>({name:'',email:'', pan_no:'',phone_no:''})
    const [vid,setVid]= useState<string>('')



        // create data 
        const mutation = useMutation<MyData,any,any,unknown>({
            mutationFn: async (newTodo:shareholderName) => {
              return await axios.post(`${baseurl}shar/shname`, newTodo,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})} ,
              onSuccess: () => {
                setShareHolder({name:'',email:'', pan_no:'',phone_no:''})
              },  
        })
        const {data}:{data?:MyData} = mutation
        
        const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
            e.preventDefault()
            console.log(shareholder)
            const newDatata = {
                "user":userId,
                "name": shareholder.name,
                "email": shareholder.email,
                "pan_no": shareholder.pan_no, 
                "phone_no": shareholder.phone_no
                }
            mutation.mutate(newDatata)
        }
    
        // receive Data 
        const fetchTodoList = async () =>{
            const res = await axios.get(`${baseurl}shar/shname`,{headers:{
                Authorization:`Bearer ${authToken?.access}`
              }})
              return res.data
        }
        const [enabled, setEnabled] = useState(false);
     
        const {data:newData,error:errors} = useQuery({ queryKey: ['shname',data], queryFn: fetchTodoList,enabled:enabled })
     

    return {shareholder,setShareHolder,newData,setEnabled,mutation,data,setVid,vid,handleSubmit}
}