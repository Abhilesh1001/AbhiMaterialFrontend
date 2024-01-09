"use client"
import { useReducer } from 'react'
import { useLogin } from '@/hooks/login/useLogin'




import React from 'react'
import { reducer, initialState } from '@/reducer/loginreducer'

const Button = () => {
  const [data, dispatch] = useReducer(reducer, initialState)
  const { handleSubmit} = useLogin(data)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-label">Email</div>
        <input type="text" className="form-control dark:bg-gray-800" onChange={(e) => dispatch({ type: "EMAIL", value: e.target.value })} />
        <div className="form-label">Password</div>
        <input type="text" className="form-control  dark:bg-gray-800" onChange={(e) => dispatch({ type: "PASSWORD", value: e.target.value })} />
        <div className='flex justify-between'>
          <button type='submit' className="btn btn-secondary my-4  text-black ">Submit</button>
          <button type='button' className="btn btn-secondary my-4 text-black">Forget Password</button>
        </div>
      </form>
    </div>


  )
}

export default Button