
import React, { useReducer } from 'react'
import { useLogin } from '@/hooks/login/useLogin'
import Button from '../button'
type sliceprops ={
    value : number
    logindata : {}
}

type stateProps = {
    counter : sliceprops
}

const Login = () => {

  return (
    <div className='container flex justify-center'>
    <div className='mt-10  border-gray-500'>
        <div className='text-bold'>Login Page</div>
        <Button />
        <button type='button' className="btn btn-secondary text-black">Signup Form</button>  
    </div>


</div>
  )
}

export default Login