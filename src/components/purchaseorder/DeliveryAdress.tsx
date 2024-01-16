// dependencies 
import React, { useEffect, useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

// typeScript 
import { StateProps, posliiceState } from '@/type/type'

// redux 
import { getDEliveryAdress } from '@/redux/po/poslicer'

// component 
import DumyInput from '../dummyinput/DumyInput'


const DeliveryAdress = () => {
    const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
    const { deliveryadress: devAdress } = useSelector((state: posliiceState) => state.poslicer)
    const dispatch = useDispatch()
    const addressDetails = async () => {

        try {
            const data = await axios.get(`${baseurl}mat/createDelivery/1/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })

            dispatch(getDEliveryAdress(data.data))
        } catch (errors) {
            console.log(errors)
        }
    }
    useEffect(() => {
        if(authToken?.access!==null){
            addressDetails()
        }
    }, [authToken?.access])


    return (
        <div className='h-[100px] relative overflow-y-auto shadow-md dark:bg-gray-900 mt-4 mb-2 bg-sky-500 sm:rounded-lg'>
        <table className='w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400'>
            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                <tr>
                    <th>Delivery Id</th>
                    {devAdress.name !== "" && <><th>Name</th>
                        <th>Phone No</th>
                        <th>Name</th>
                        <th>Delivery Adrress</th>
                        <th>GST No</th>
                        <th>Email</th></>}

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><DumyInput indum={devAdress.s_no !== null && devAdress.s_no !== undefined ?devAdress.s_no :''  } /></td>
                    {devAdress.name !== "" && <><td> <DumyInput indum={devAdress.name} /></td>
                        <td> <DumyInput indum={devAdress.phone_no} />  </td>
                        <td><DumyInput indum={devAdress.vendor_name} /></td>
                        <td><DumyInput indum={devAdress.address} /></td>
                        <td><DumyInput indum={devAdress.gst} /></td>
                        <td><DumyInput indum={devAdress.email} /></td></>}

                </tr>
            </tbody>
        </table>
        </div>
    )
}

export default memo(DeliveryAdress)