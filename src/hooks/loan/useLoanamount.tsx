import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import {loanholderName} from '@/type/shareholder/shareholde'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


interface MyData {
    data:{
        msg : string,
        data:{
            id:null |number,
            msg: string
        }
    },
    isPending :boolean,
    
} 

interface loanType {
    loan_person ?:null|number
    name : string,
    amount : null|number,
    closing_date : string|null,
    remarks: string,
    is_active:boolean,
}

export const useLoanamount=()=>{



    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [loan,setLoan] = useState<loanType>({loan_person:null,name:'',amount:null, closing_date:null,remarks:'',is_active:true})
    const [vid,setVid]= useState<string>('')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:loanType) => {
          return await axios.post(`${baseurl}shar/loanamount`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setLoan({loan_person:null,name:'',amount:null, closing_date:null,remarks:'',is_active:true})
          },  
    })
    const {data}:{data?:MyData} = mutation
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const newDatata = {
            user:userId,
            loan_person: loan.loan_person,
            loan_amount : loan.amount,
            remarks : loan.remarks,
            is_active : loan.is_active,
            closing_date : loan.closing_date
            }
            console.log(newDatata,'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}shar/loanamount`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          console.log(res.data)
          return res.data 
    }
    const [enabled, setEnabled] = useState(false);
 
    const {data:newData,error:errors} = useQuery({ queryKey: ['rdname',data], queryFn: fetchTodoList,enabled:enabled })
    console.log(newData)


    // get initilal Data 
    const mutationFund = useMutation<any,any,any,unknown>({
        mutationFn: async (newTodo:loanType) => {
          return await axios.get(`${baseurl}shar/loanname/${newTodo}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
            console.log(data.data)
            setLoan((prev)=>{
                return {
                    ...prev,
                    name : data.data.name,
                    loan_person:data.data.loan_id
                }
            })
          }, 
    })
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log(value)
        if (e.key === 'Enter') {
            console.log('ok')
            const vid = parseInt(value)
            console.log(vid)
            e.preventDefault();
            mutationFund.mutate(vid)
        }
    }


    return {setEnabled,mutation,data,setVid,handleSubmit,setLoan,handleKeyDown,loan,vid,newData}
}