'use client'
import React, { useEffect, useState, memo } from 'react'
import Link from 'next/link'
import { useLogin } from '@/hooks/login/useLogin'
import { getMainheader } from '@/redux/slice'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAuthToken } from '@/redux/slice'
import PrBurron from './button/PrBurron'
import { useRouter } from 'next/navigation';
import { soundClick } from '@/sound/sound'
import { IoMdMenu } from "react-icons/io";
import ShareholderMenu from './mainpage/ShareholderMenu'
import ProcumentMenu from './mainpage/ProcumentMenu'
import { useMenu } from '@/hooks/menu/useMenu'

export type StateProps = {
    counter: {
        user: string | null,
        mainheader: string,
    }
}


const Navbar = () => {
    const dispatch = useDispatch()
    const { user, mainheader } = useSelector((state: StateProps) => state.counter)
    const data = { email: '', password: '' }
    const { handleLogout } = useLogin(data)
    const {handleClickMenu,hiddenmenu} = useMenu()
    

    useEffect(() => {
        const mainhesder = localStorage.getItem('mainHeader')
        if (mainhesder !== null) {
            dispatch(getMainheader(mainhesder))
        }
    }, [])


    const router = useRouter()

    const handleInput = () => {

    }
    const handleLogin = () => {

        dispatch(getMainheader('Login Page'))
        soundClick?.play()
        router.push('/')
    }

    const handleInputCahnge = () => {

    }

    useEffect(() => {
        if (document.cookie !== undefined && document.cookie !== null) {
            const authTokenData: any = (() => {
                const cookies = document.cookie.split(';');
                const tokenRefresh = cookies.find(cookie => cookie.trim().startsWith('tokenRefresh='));
                const tokenAccess = cookies.find(cookie => cookie.trim().startsWith('tokenAcess='));

                return {
                    'refresh': tokenRefresh?.split('tokenRefresh=')[1],
                    'access': tokenAccess?.split('tokenAcess=')[1]
                };
            })();
            dispatch(getAuthToken(authTokenData));
        }
    }, [dispatch]);


    const hanclickMainHead = (value: string) => {
        dispatch(getMainheader(value))
    }

   


    return (
        <nav className="lg:px-16 z-10 dark:bg-black bg-sky-500 shadow-md flex flex-wrap items-center justify-center lg:py-0 fixed  top-0 w-full">
            <div className="flex-1 flex justify-between items-center">
                <div className='relative'>
                <IoMdMenu className='cursor-pointer mr-4 text-2xl dark:text-gray-50 ml-2' onClick={handleClickMenu} />
                  {hiddenmenu !=='hidden' &&  <div className='fixed rounded top-14 overflow-auto  z-10 text-gray-50 bg-gray-600 h-[80%] text-nowrap w-[535px]'>
                    <div className='pl-4 flex flex-col gap-4'>
                         <ProcumentMenu />
                         <ShareholderMenu />
                    </div>
                       
                    </div> }
                </div>

                <Link href="/" className="flex text-lg font-semibold">
                    <div className="relative  text-gray-900 dark:text-red-700 " onClick={() => hanclickMainHead('Index Page')}>AbhiMaterials</div>
                </Link>
                <div className="flex-1 h-12  text-gray-900 dark:text-green-600 flex justify-between items-center ml-5 mr-5 w-full">
                    {mainheader}
                </div>

            </div>

            <label htmlFor="menu-toggle" className="cursor-pointer mr-10 lg:hidden block">
                <svg
                    className="fill-current text-gray-950 text-sm dark:text-gray-50"
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                >
                    <title>menu</title>
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                </svg>
            </label>
            <input className="hidden" onChange={handleInput} type="checkbox" id="menu-toggle" />

            <div className="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
                <nav>
                    <ul className="text-xl text-center items-center gap-x-5 md:gap-x-4 lg:text-lg lg:flex  lg:pt-0">
                        {/* <li className="py-2 lg:py-0 ">
                                <a className=" dark:text-gray-50 text-sm text-gray-950" href="#">Search</a>
                            </li> */}
                        <li className="py-2 lg:py-0 ">
                            <Link className="text-gray-950 text-sm dark:text-gray-50 " href={'/material'}>Materia Create
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
                            <Link
                                className="text-gray-950 text-sm dark:text-gray-50"
                                href={'/grn'}
                            >
                                GRN
                            </Link>
                        </li>
                        <li className="py-2 lg:py-0 ">
                            <a
                                className="text-gray-950 text-sm dark:text-gray-50"
                                href="#"
                            >
                                {!!user && user?.charAt(0).toUpperCase() + user?.slice(1)}
                            </a>
                        </li>
                        <li className="py-2 lg:py-0 ">
                            {user && <PrBurron onClick={handleLogout} label={'Logout'} />}
                            {!user && < PrBurron onClick={handleLogin} label={'Login'} />}
                        </li>
                    </ul>
                </nav>
            </div>
        </nav>
    )
}

export default memo(Navbar)