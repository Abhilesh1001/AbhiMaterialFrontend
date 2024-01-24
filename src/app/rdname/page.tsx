'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import {vendorType} from '@/type/type'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import {StateProps} from '@/type/type'
import {useMutation,useQuery} from '@tanstack/react-query'
import DumyInput from '@/components/dummyinput/DumyInput'
import {rdholderName} from '@/type/shareholder/shareholde'
import { format,parseISO } from 'date-fns';

interface MyData {
    data:{
        msg : string,
        data:rdholderName
    },
    isPending :boolean,
    
}



const Vendor = () => {
    const {baseurl,authToken,userId} = useSelector((state:StateProps)=>state.counter)
    const [rdholder,setrdholder] = useState<rdholderName>({name:'',email:'', pan_no:'',phone_no:''})
    const [vid,setVid]= useState<string>('')

    // create data 
    const mutation = useMutation<MyData,any,any,unknown>({
        mutationFn: async (newTodo:rdholderName) => {
          return await axios.post(`${baseurl}shar/rdname`, newTodo,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: () => {
            setrdholder({name:'',email:'', pan_no:'',phone_no:''})
          },  
    })
    const {data}:{data?:MyData} = mutation
    
    const handleSubmit = async( e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
       
        const newDatata = {
            "user":userId,
            "name": rdholder.name,
            "email": rdholder.email,
            "pan_no": rdholder.pan_no, 
            "phone_no": rdholder.phone_no
            }
            console.log(newDatata,'newDAta')

        mutation.mutate(newDatata)
    }

    // receive Data 
    const fetchTodoList = async () =>{
        const res = await axios.get(`${baseurl}shar/rdname`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})
          return res.data
    }
    const [enabled, setEnabled] = useState(false);
 
    const {data:newData,error:errors} = useQuery({ queryKey: ['rdname',data], queryFn: fetchTodoList,enabled:enabled })
    console.log(newData)


  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-4 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron onClick={()=>setEnabled(true)} label={'View'} />
                   <PrBurron  label={'Change'}/>
                </div>
                <div>
                </div>
                <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{data!==undefined && data.data.msg } RD Holder Id {data!==undefined && data.data.data.rdp_id}</div></div>}</div>
                <label htmlFor="Vendor" className="form-label text-sm">RD Holder Id</label>

                <TextInput value={vid} type={'number'} onChange = {(e)=>setVid(e.target.value)} />

                <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <TextInput value={rdholder.name} onChange = {(e)=>setrdholder({...rdholder,name :e.target.value})} />
                <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                <TextInput value={rdholder.phone_no}onChange = {(e)=>setrdholder({...rdholder,phone_no :e.target.value})} />

                <label htmlFor="Email" className="form-label text-sm">Email</label>
                <TextInput type={'email'}  value={rdholder.email} onChange = {(e)=>setrdholder({...rdholder,email :e.target.value})} />
                <label htmlFor="pan" className="form-label text-sm">Pan</label>
                <TextInput  css={'mb-4'} value={rdholder.pan_no} onChange = {(e)=>setrdholder({...rdholder,pan_no:e.target.value})} />
               <PrBurron label={'Submit'} buttomType={'submit'} />
               </form>
            </div>
            <div className="col-sm-8 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-[80vh]">
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Holder Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Email</th>
                                <th scope="col">Pan</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody className=' text-gray-50 text-center'> 
                            {newData?.map((items:rdholderName)=>{
                                return  <tr key={items.rdp_id}>
                                <th scope="row"><DumyInput indum={items.rdp_id !==undefined?items.rdp_id:null}/></th>
                                <td><DumyInput indum={items.name}/></td>
                                <td><DumyInput indum={items.phone_no}/>{}</td>
                                <td><DumyInput indum={items.email}/></td>
                                <td><DumyInput indum={items.pan_no}/></td>
                                <td><DumyInput indum={items.time !==undefined?format(parseISO(items.time),'dd.MM.yy') :''}/></td>
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