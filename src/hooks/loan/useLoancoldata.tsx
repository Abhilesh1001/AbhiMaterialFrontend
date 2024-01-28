
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {loancollData} from '@/type/shareholder/shareholde'

interface MyData {
    data :{
       msg:string
    }
}




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

    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:loancollData[]) => {
          return await axios.post(`${baseurl}shar/loancoll`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setRdcollection([{user:userId,loan_person :null,amount_collected : null,remarks: '',name:''}])
          },  
    })


    const handleSubmit = async () =>{
        console.log(rdcollection)    

        mutation.mutate(rdcollection)
    
}


    const handleChange = (value:string|number,key:keyof loancollData,index:number )=>{
        const freData:any = [...rdcollection]
        freData[index][key]=value
        setRdcollection(freData)
    }

    const [enable,setEnable] = useState(false)
    const [Id,setId] = useState<null|number>(null)

    const fetchData = async ()=>{
        console.log('ok',Id)
        setEnable(false)
        const res =await  axios.get(`${baseurl}shar/loancoll/${Id}`,{
            headers:{
                Authorization:`Bearer ${authToken?.access}`
              }
        })


        return res.data
    }

    const {data} = useQuery({queryKey:[`allCollLoanData${Id}`],queryFn:fetchData,enabled:enable})
    console.log(data,'data')

    const handleclickrdcolallview=(id:number|null)=>{
        
        setEnable(true)
        setId(id)

    }



    return {handleHOderView,handleSubmit,rdcollection,handleChange,mutation,handleclickrdcolallview,data}
}