'use client'
import Login from '@/components/Login/Login'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react'
import Main from '@/components/mainpage/Main'

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
    <main className="min-h-screen dark:bg-gray-800 bg-sky-600 h-auto text-gray-50 lg:mt-6 mt-7">
           {user === "" && <Login />}
           {user && <Main /> }
    </main>
  )
}
