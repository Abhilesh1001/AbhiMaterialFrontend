"use client"
import { useReducer } from 'react'
import { useLogin } from '@/hooks/login/useLogin'
import { reducer, initialState } from '@/reducer/loginreducer'
import PrBurron from '@/components/button/PrBurron'
import TextInput from './dummyinput/TextInput'

const Button = () => {
  const [data, dispatch] = useReducer(reducer, initialState)
  const { handleSubmit} = useLogin(data)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-label">Email</div>
        <TextInput value={data.email} onChange={(e) => dispatch({ type: "EMAIL", value: e.target.value })} />
        <div className="form-label">Password</div>
        <TextInput value={data.password} onChange={(e) => dispatch({ type: "PASSWORD", value: e.target.value })} />
        <div className='flex justify-between my-2'>
          <PrBurron label={'Submit'} buttomType={'submit'} />
          <PrBurron label={'Forget Password'} />
        </div>
      </form>
    </div>


  )
}

export default Button