
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import { useMutation, useQuery } from '@tanstack/react-query'
import { vendorType } from '@/type/type'
import { soundClick,soundSsuccess,soundError } from '@/sound/sound'

export const useVendor =()=>{

    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)


    const [vendor, setVendor] = useState<vendorType>({ name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '' })
    const [vid, setVid] = useState<string>('')
    const [change, setChange] = useState('change')
    const [sfcreate, setSfcreate] = useState('create')

    // create data 
    const mutation = useMutation({
        mutationFn: async (newTodo: vendorType) => {
            return await axios.post(`${baseurl}mat/createvender`, newTodo, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
    })
    console.log(mutation.data,'inuseVendor')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(vendor)
    }

    // receive Data 
    const fetchTodoList = async () => {
        const res = await axios.get(`${baseurl}mat/createvender`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data
    }





    const handleUPdate =()=> {

        const newData = {
            name: vendor.name,
            phone_no: vendor.phone_no,
            vendor_name: vendor.phone_no,
            gst: vendor.gst,
            email: vendor.email,
            address: vendor.address,
            user : userId
        }
        mutationUpdate.mutate(newData)

    }

    const handleChange=()=>{
        setChange(`${change!=='create'?'create':null}`)

    }

    const handleCreate=()=>{
        // soundClick?.play()
        setVendor(
            { name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '' }
        )
        setSfcreate('create')
        setChange('')

    }

    const mutationUpdate =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.patch(`${baseurl}mat/createvender/${vid}/`,data,{headers:{
          Authorization:`Bearer ${authToken?.access}`
        }})},
        onSuccess:(data)=>{
            soundSsuccess?.play()
            console.log(data,"success")
            setVendor(
                { name: '', phone_no: null, vendor_name: '', gst: '', email: '', address: '' }
            )
        },
        onError:(error)=>{
            console.log('error',error)
            soundError?.play()
        }
    })


    const mutationVendor = useMutation<any,any,any,unknown>({
        mutationFn: async () => {
          return await axios.get(`${baseurl}mat/createvender/${vid}/`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data,'onsuccess')
               console.log(data)
               setVendor(prev=>{ 
                return {
                    ...prev,
                    name: data.data.name, 
                    phone_no: parseInt(data.data.phone_no), 
                    vendor_name:data.data.vendor_name, 
                    gst:data.data.gst, 
                    email: data.data.email,
                    address: data.data.address
                }
              })
            
              soundSsuccess?.play()
            

            }              
    })

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
            const vid = parseInt(value)
            e.preventDefault();
            mutationVendor.mutate(vid)
            soundClick?.play()
        }
    }

    const [enabled, setEnabled] = useState(false);
    const { data: newData, error: errors } = useQuery({ queryKey: ['listVendor',mutationUpdate.data], queryFn: fetchTodoList, enabled: enabled })
    console.log(newData)




    


    return {setEnabled,handleUPdate,change,mutation,handleSubmit,vendor,setVendor,newData,vid,setVid,handleChange,sfcreate,handleCreate,handleKeyDown,mutationUpdate}
}