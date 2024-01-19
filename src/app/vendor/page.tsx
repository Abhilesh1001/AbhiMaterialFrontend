'use client'
import React, { useState } from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import {vendorType} from '@/type/type'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import DumyInput from '@/components/dummyinput/DumyInput'

const Vendor = () => {
    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)
    const [vendor,setVendor] = useState<vendorType>({name:'',phone_no:null, vendor_name:'',gst:'',email:'',address:''})
    const [vid,setVid]= useState<string>('')

    // create data 
    const mutation = useMutation({
        mutationFn: async (newTodo:vendorType) => {
          return await axios.post(`${baseurl}mat/createvender`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
        },
    })
    const {data,isError,isPending,error} = mutation
   

    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        mutation.mutate(vendor)
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}mat/createvender`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          return res.data
    }
    const [enabled, setEnabled] = useState(false);
    const {data:newData,error:errors} = useQuery({ queryKey: ['listVendor'], queryFn: fetchTodoList,enabled:enabled })
    console.log(newData)
    const newVendor = null

   

  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>

            
        <div className="row my-4">
            <div className="col-sm-6 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                   <PrBurron  label={'Change'}/>
                </div>
                <div className='w-full h-4 flex justify-center'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div></div>}</div>
                <label htmlFor="Vendor" className="form-label text-sm">Vendor Id</label>

                <TextInput value={vid} type={'number'} onChange = {(e)=>setVid(e.target.value)} />
                <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <TextInput value={vendor.name} onChange = {(e)=>setVendor({...vendor,name :e.target.value})} />
                <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                <TextInput value={vendor.phone_no ===0 ? null :vendor.phone_no} type={'number'} onChange = {(e)=>setVendor({...vendor,phone_no :Number(e.target.value)})} />
                <label htmlFor="Vendorname" className="form-label text-sm">Vendor Name</label>
                <TextInput value={vendor.vendor_name} onChange = {(e)=>setVendor({...vendor,vendor_name :e.target.value})} />
                <label htmlFor="GST" className="form-label text-sm">GST</label>
                <TextInput value={vendor.gst} onChange = {(e)=>setVendor({...vendor,gst :e.target.value})} />
                <label htmlFor="Email" className="form-label text-sm">Email</label>
                <TextInput type={'email'}  value={vendor.email} onChange = {(e)=>setVendor({...vendor,email :e.target.value})} />
                <label htmlFor="Address" className="form-label text-sm">Address</label>
                <TextInput  css={'mb-4'} value={vendor.address} onChange = {(e)=>setVendor({...vendor,address:e.target.value})} />
               <PrBurron label={'Submit'} buttomType={'submit'} />
               </form>
            </div>
            <div className="col-sm-6 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-96">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Vendor Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Vendor Name</th>
                                <th scope="col">GST</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {newData?.map((items:vendorType)=>{
                                return  <tr key={items.s_no}>
                                <th scope="row"><DumyInput indum={items.s_no !==undefined?items.s_no:null}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><DumyInput indum={items.phone_no}/>{}</td>
                                <td><DumyInput indum={items.vendor_name}/></td>
                                <td><DumyInput indum={items.gst}/></td>
                                <td><DumyInput indum={items.email}/></td>
                            </tr>
                            })}
                           
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor