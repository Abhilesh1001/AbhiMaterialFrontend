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


