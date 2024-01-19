'use server'
import { loginred } from "@/reducer/loginreducer";
import axios from 'axios'

export const loginUser = async (userData: loginred) => {
        try{
            const res = await axios.post('http://127.0.0.1:8000/cus/authlogin/',userData)
            return res.data
        }catch(error){
            console.log(error)
            return error
        }
  };


export const prDumps = async (baseurl:string,authToken:string)=>{
    console.log('ok')
    const res =await axios.get(`${baseurl}mat/createpurchase`,{
        headers:{
            Authorization : `Bearer ${authToken}`
        }})
        return res.data
}

