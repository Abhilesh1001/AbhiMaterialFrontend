'use client'
import React,{useEffect} from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/login/useLogin'
import './style.css'
import {useSelector,useDispatch} from 'react-redux'
import {getAuthToken} from '@/redux/slice' 
import PrBurron from './button/PrBurron'
import { useRouter } from 'next/navigation';


export type StateProps = {
    counter : {
        user : string|null,
    }   
  }
  

const Navbar = () => {
    const dispatch = useDispatch()
    const {user} =useSelector((state:StateProps)=>state.counter)
    const data = { email: '', password: '' }
    const { handleLogout } = useLogin(data)
   
    const router = useRouter()

    const handleLogin = () =>{
        console.log('ok')     
        router.push('/')
    }

    useEffect(() => {
        const authTokenData = document.cookie === null || document.cookie === undefined
            ? null
            : {
                'refresh': document.cookie?.split(';')[0]?.split('tokenRefresh=')[1],
                'access': document.cookie?.split(';')[1]?.split('tokenAcess=')[1]
              };

        dispatch(getAuthToken(authTokenData));
    }, [dispatch]);

    return (     
            <nav className="lg:px-16 z-10 dark:bg-black bg-sky-500 shadow-md flex flex-wrap items-center justify-center lg:py-0 fixed  top-0 w-full">
                <div className="flex-1 flex justify-between items-center">
                    <Link href="/" className="flex text-lg font-semibold">
                        <div className="relative  text-gray-900 dark:text-gray-50">AbhiMaterials</div>
                    </Link>
                <div className="flex-1 flex justify-between items-center ml-5 mr-5">
                    <input type="text" className='form-control  dark:text-white dark:bg-slate-950    ' />
                </div>
                </div>
                <label htmlFor="menu-toggle" className="cursor-pointer mr-10 lg:hidden block">
                    <svg
                        className="fill-current text-black text-sm"
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                    >
                        <title>menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="menu-toggle" />
                <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                    <nav>
                        <ul className="text-xl text-center items-center gap-x-5 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
                            <li className="py-2 lg:py-0 ">
                                <a
                                    className=" dark:text-gray-50 text-sm text-gray-950"
                                    href="#"
                                >
                                    Search
                                </a>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <Link 
                                    className="text-gray-950 text-sm dark:text-gray-50 "
                                    href={'/material'}
                                >
                                    Material Create
                                </Link>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <Link
                                    className="text-gray-950 text-sm dark:text-gray-50"
                                    href={'/purchase'}
                                >
                                    PR
                                </Link>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <Link
                                    className="text-gray-950 text-sm dark:text-gray-50"
                                    href={'/purchase/purchaseorder'}
                                >
                                    PO
                                </Link>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <Link
                                    className="text-gray-950 text-sm dark:text-gray-50"
                                    href={'/vendor'}
                                >
                                    Vendor
                                </Link>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <a
                                    className="text-gray-950 text-sm dark:text-gray-50"
                                    href="#"
                                >
                                    GRN 
                                </a>
                            </li>
                            <li className="py-2 lg:py-0 ">
                                <a
                                    className="text-gray-950 text-sm dark:text-gray-50"
                                    href="#"
                                >
                                    {!!user && user?.charAt(0).toUpperCase() + user?.slice(1) }
                                </a>
                            </li>
                            <li className="py-2 lg:py-0 ">
                            <PrBurron onClick={handleLogout}  label={'Logout'}/> 
                            <PrBurron onClick={handleLogin}  label={'Login'}/> 
                            </li>
                        </ul>
                    </nav>
                </div>
            </nav>
    )
}

export default Navbar