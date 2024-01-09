'use client'
import { loginaction,loginred } from "@/reducer/loginreducer"
import { loginUser } from "@/components/server/loginService"
import { useState,useEffect } from "react"
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import {getUser,getAuthToken,clearAuthToken,clearUser,getUserId,clearUserId} from '@/redux/slice'   
import {StateProps} from '@/type/type'


export const useLogin =  (data:loginred) =>{
    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)

    const dispatch = useDispatch()
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const res = await loginUser(data) 
        console.log(res,'login')
        const tokenRefresh = res.token.refresh;
        const tokenAcess = res.token.access;
        document.cookie =`tokenRefresh=${tokenRefresh}; path=/`
        document.cookie =`tokenAcess=${tokenAcess}; path=/`
        dispatch(getAuthToken({'refresh':tokenRefresh,'access':tokenAcess})) 
        const userToken:{name:string,user_id:number} = jwtDecode(tokenAcess)
        console.log(userToken.name)
        dispatch(getUser(userToken.name))
        dispatch(getUserId(userToken.user_id))
    }

// updatetoken 




useEffect(( ) =>{
    let time = 1000 * 4 * 60
    if(authToken?.access !== undefined ){
        const userToken:{name:string,user_id:number} = jwtDecode(authToken?.access)
        dispatch(getUser(userToken.name)) 
        dispatch(getUserId(userToken.user_id))  
    let interval = setInterval(()=>{
            updataToken()
        },time) 
        return ()=>clearInterval(interval)
    }
  },[authToken?.access])

  const updataToken  = async () =>{
    console.log(authToken?.access)
    let data:{data:{access:string},status:number} = await axios?.post(`${baseurl}cus/api/token/refresh/`,{'refresh':authToken?.refresh})
    
     if(data.status===200){
        const tokenAcess = data.data.access
        dispatch(getAuthToken({'refresh':authToken?.refresh,'access':tokenAcess})) 
        document.cookie =`tokenAcess=${tokenAcess}; path=/`
        document.cookie =`tokenRefresh=${authToken?.refresh}; path=/`
        console.log(tokenAcess)
        const userToken:{name:string,user_id:number} = jwtDecode(tokenAcess)
        dispatch(getUser(userToken.name)) 
        dispatch(getUserId(userToken.user_id))  
     }else{
       handleLogout()
     }
    }
    function handleLogout(){
        document.cookie = 'tokenRefresh=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'tokenAcess=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        dispatch(clearAuthToken(''))
        dispatch(clearUser(""))
    }

    return {handleSubmit,handleLogout}
}