"use client"
import { useReducer } from 'react'
import { useLogin } from '@/hooks/login/useLogin'
import { reducer, initialState } from '@/reducer/loginreducer'
import PrBurron from '@/components/button/PrBurron'
import TextInput from './dummyinput/TextInput'
import {useRouter} from 'next/navigation'
import { getMainheader } from '@/redux/slice'
import { useDispatch } from 'react-redux'
import Loading from './loading/Loading'

const Button = () => {
  const [data, dispatch] = useReducer(reducer, initialState)
  const { handleSubmit,error,loading} = useLogin(data)
  const dispatchData = useDispatch()
  const router = useRouter()
  const handleForgotPassword =()=>{
    dispatchData(getMainheader('ForgotPassword'))
    router.push('/signup/forgotpassword')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {loading && <Loading />}
        {error && error}
        <div className="form-label">Email</div>
        <TextInput type={'email'} value={data.email} onChange={(e) => dispatch({ type: "EMAIL", value: e.target.value })} />
        <div className="form-label">Password</div>
        <TextInput value={data.password} type={'password'} onChange={(e) => dispatch({ type: "PASSWORD", value: e.target.value })} />
        <div className='flex justify-between my-4'>
          <PrBurron label={'Submit'} buttomType={'submit'} />
          <PrBurron onClick={handleForgotPassword} label={'Forget Password'} />
        </div>
      </form>
    </div>


  )
}

export default Button