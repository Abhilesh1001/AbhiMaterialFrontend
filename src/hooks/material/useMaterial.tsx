import axios from "axios";
import {useSelector,useDispatch} from 'react-redux'
import {statePropsMaterial} from '@/type/type'
import { useEffect, useState } from "react";
import { useQuery,useMutation } from '@tanstack/react-query'



export const useMaterial = () =>{
    const {baseurl,authToken,userId} = useSelector((state:statePropsMaterial)=>state.counter)
    const [loadingNewCreation, setLoading] = useState(false);
    const [newMatNo,setNewMatNo] = useState<null|number>(null)


    const mutation = useMutation<any,any,any,unknown>({
        mutationFn : async (dataRes:any)=>
            await axios.post(`${baseurl}mat/creatematerial`,dataRes,{headers:{
                Authorization : `Bearer ${authToken?.access}`
            }}),
            onError:(e) =>{
                setLoading(false)
            },
            onSuccess:(data, variables, context)=>{
                setLoading(false)
                setNewMatNo(data.data.data.s_no)                
            }
            ,
    })
    const [data,setDate] = useState({
        material_name : '',
        material_group:'',
        unit : '',
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
        setLoading(true)
        e.preventDefault()
        const dataRes = {
            material_name : data.material_name,
            material_group:data.material_group,
            unit : data.unit,
            user : userId
        }
        mutation.mutate(dataRes)

    }



    return {fetchData,handleSubmit,setDate,data,loadingNewCreation,newMatNo}
}