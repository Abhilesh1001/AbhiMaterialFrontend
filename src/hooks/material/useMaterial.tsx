import axios from "axios";
import {useSelector} from 'react-redux'
import {statePropsMaterial} from '@/type/type'
import { useEffect, useState } from "react";
import { soundClick,soundError,soundSsuccess } from "@/sound/sound";
import { useQuery,useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify';


export const useMaterial = () =>{
    const {baseurl,authToken,userId} = useSelector((state:statePropsMaterial)=>state.counter)
    const [loadingNewCreation, setLoading] = useState(false);
    const [newMatNo,setNewMatNo] = useState<null|number>(null)

    const [enabled, setEnabled] = useState(false);
    const [change, setChange] = useState('change')
    const [vid,setVid] = useState<string>()
    const [sfcreate, setSfcreate] = useState('create')
    const [data,setDate] = useState({
        material_name : '',
        material_group:'',
        unit : '',
    })

    const mutation = useMutation<any,any,any,unknown>({
         mutationFn : async (dataRes:any)=>await axios.post(`${baseurl}mat/creatematerial`,dataRes,{headers:{
                Authorization : `Bearer ${authToken?.access}`
            }}),
            onError:(e) =>{
                console.log(e)
                setLoading(false)
            },
            onSuccess:(data, variables, context)=>{
                setLoading(false)
                setNewMatNo(data.data.data.s_no)   
                soundSsuccess?.play()             
            }
            ,
    })
   
  
    const fetchData = async () => {
        const res = await axios.get(`${baseurl}mat/creatematerial`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`,
            },
        });
        return res.data;
    };  

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
        soundClick?.play()
        console.log('ok')
        setLoading(true)
        e.preventDefault()

        if (!data.material_name || !data.material_group || !data.unit) {
            // You can show an error message to the user here
            soundError?.play()
            toast.error(`Fill all the required Fileds ${data.material_group} ${data.unit} ${data.material_name}`,{position:'top-center'})
            return;
        }
        if(data.material_name.length <4){
            soundError?.play()
            toast.error('Enter Material Name Greater than 4 charactor',{position:'top-center'})
            return
        }

        const dataRes = {
            material_name : data.material_name,
            material_group:data.material_group,
            unit : data.unit,
            user : userId
        }
        
        mutation.mutate(dataRes)

    }



    const mutationMaterial = useMutation<any,any,any,unknown>({
        mutationFn: async () => {
          return await axios.get(`${baseurl}mat/creatematerial/${vid}`,{headers:{
            Authorization:`Bearer ${authToken?.access}`
          }})} ,
          onSuccess: (data) => {
               console.log(data,'onsuccess')
               setDate(prev=>{ 
                return {
                    ...prev,
                    material_name:data.data.material_name,
                    material_group: data.data.material_group,
                    unit:data.data.unit,
                }
              })
            
              soundSsuccess?.play()
            

            }              
    })
 
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (e.key === 'Enter') {
            const vid = parseInt(value)
            e.preventDefault();
            mutationMaterial.mutate(vid)
            soundClick?.play()
        }
    }


    // setEnabled,
    const handleUPdate =() =>{
        soundClick?.play()

        if (!vid){
            soundError?.play()
            toast.error('Enter Material No. for Update',{position:'top-center'})
            return
        }

        if(!data.material_name || !data.material_group || !data.unit ){
            soundError?.play()
            toast.error('Enter all required fileds',{position:'top-center'})
        }

        const newData = {
            material_name : data.material_name,
            material_group:data.material_group,
            unit : data.unit,
            user : userId
        }
        mutationUpdate.mutate(newData)

    }
    const handleCreate=()=>{
        soundClick?.play()
        setDate({
            material_name : '',
            material_group:'',
            unit : '',
        })
       
        setChange('')

    }
    const handleChange=()=>{
        soundClick?.play()
        setChange(`${change!=='create'?'create':null}`)

    }
    // change

    const mutationUpdate =useMutation<any,any,any,unknown>({
        mutationFn : async (data)  => {
        return await axios.patch(`${baseurl}mat/creatematerial/${vid}/`,data,{headers:{
          Authorization:`Bearer ${authToken?.access}`
        }})},
        onSuccess:(data)=>{
            soundSsuccess?.play()
            
        },
        onError:(error)=>{
            console.log('error',error)
            soundError?.play()
        }
    })
   
    const { data: matdata } = useQuery({ queryKey: ['matData',mutation.data,authToken], queryFn: fetchData })


    return {handleSubmit,setDate,data,loadingNewCreation,newMatNo,setEnabled,handleUPdate,handleCreate,handleChange,change,mutation,handleKeyDown,setVid,mutationUpdate,sfcreate,matdata}
}