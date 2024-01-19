import PrBurron from '@/components/button/PrBurron'
import Button from '../button'


const Login = () => {

  return (
    <div className='container flex justify-center'>
    <div className='mt-10  border-gray-500'>
        <div className='text-bold'>Login Page</div>
        <Button />
        <PrBurron label={'Signup Form'}  />
    </div>


</div>
  )
}

export default Login