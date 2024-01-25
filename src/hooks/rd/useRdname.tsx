import axios from 'axios'
import {vendorType} from '@/type/type'
import React, { useEffect, useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {rdholderName} from '@/type/shareholder/shareholde'
interface MyData {
    data:{
        msg : string,
        data:rdholderName
    },
    isPending :boolean,
    
}



export const useRdname=()=>{



    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdholder,setrdholder] = useState<rdholderName>({name:'',email:'', pan_no:'',phone_no:''})
    const [vid,setVid]= useState<string>('')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdholderName) => {
          return await axios.post(`${baseurl}shar/rdname`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdholder({name:'',email:'', pan_no:'',phone_no:''})
          },  
    })
    const {data}:{data?:MyData} = mutation
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
       
        const newDatata = {
            "user":userId,
            "name": rdholder.name,
            "email": rdholder.email,
            "pan_no": rdholder.pan_no, 
            "phone_no": rdholder.phone_no
            }
            console.log(newDatata,'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}shar/rdname`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          return res.data
    }
    const [enabled, setEnabled] = useState(false);
 
    const {data:newData,error:errors} = useQuery({ queryKey: ['rdname',data], queryFn: fetchTodoList,enabled:enabled })
    console.log(newData)

    return {setEnabled,mutation,data,setVid,vid,handleSubmit,rdholder,setrdholder,newData}
}