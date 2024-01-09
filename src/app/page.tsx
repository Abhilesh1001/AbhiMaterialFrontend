'use client'
import Login from '@/components/Login/Login'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'

export type StateProps = {
  counter : {
      user : string|null,
  }   
}


export default function Home() {
  const {user} = useSelector((state:StateProps)=>state.counter)
  console.log('typeof type',typeof user)
  useEffect(()=>{
   
  },[user])
  
  return (
    <main className="">
           {user === "" && <Login />}
           
    </main>
  )
}
