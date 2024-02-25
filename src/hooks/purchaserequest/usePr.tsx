import {datatypePr,StateProps,prsliiceState} from '@/type/type'

// dependenciees
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// hooks 
import {useMutation} from '@tanstack/react-query'
import {getPrData,setPrMainData,setHiddenALert,getNewChange} from '@/redux/pr/prslicer'
import { praldata } from '@/components/dataAll/data'
import { soundClick,soundError,soundSsuccess } from '@/sound/sound'
import { toast } from 'react-toastify'

export const usePr =()=>{
    const { baseurl, authToken, user, userId } = useSelector((state: StateProps) => state.counter)
    const [loadingNewPrCreation, setLoading] = useState(false);
    const { datapr:data} = useSelector((state: prsliiceState) => state.prslicer)
    const [hidden,setHidden] = useState('hidden')
    const dispatch = useDispatch()


    const mutation = useMutation<any,any,any,unknown>({
        mutationFn : async (dataRes:any)=>
            await axios.post(`${baseurl}mat/createpurchase`, dataRes, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            }),
            onError:(e) =>{
                soundError?.play()
                console.log(e)
                setLoading(false)
            },
            onSuccess:(data, variables, context)=>{
                soundSsuccess?.play()          
                  setLoading(false)
                // setNewMatNo(data.data.data.s_no) 
                dispatch(getNewChange('change'))
                dispatch(getPrData(praldata))  
            }
            ,
    })

    

    const handleChange = (value: any, key: keyof datatypePr, index: number) => {
        const updatedData: any = [...data];
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
        if (key === 'material_qty' || key === 'material_price') {
            const qty = key === 'material_qty' ? numericValue : updatedData[index].material_qty;
            const price = key === 'material_price' ? numericValue : updatedData[index].material_price;
            
            updatedData[index] = {...updatedData[index], [key]: numericValue,total_price: qty * price,};
        } else {
            updatedData[index] = {...updatedData[index],[key]: value,};
        }
        dispatch(getPrData(updatedData));
    }

    const handleForm = () => {
        soundClick?.play()
        const newFrom = [...data]
        const lastLine = newFrom.length > 0 ? newFrom[newFrom.length - 1].line_no : 0;
        const newLine =lastLine === null ? 0 : lastLine + 1;
        dispatch(getPrData([...data, {
            line_no: newLine,
            pr_no:null,
            po_no :null,
            material_name: '',
            material_unit: '',
            material_no: null,
            material_price: null,
            material_qty: null,
            material_text: '',
            total_price: null
        }]))
       

    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        soundClick?.play()
        e.preventDefault()
        setLoading(true)
       console.log(data)

        const resData =data.map((item)=>{
            if(!item.line_no || !item.material_name || !item.material_no || !item.material_price || !item.material_qty || !item.material_text || !item.material_unit){
                soundError?.play()
                toast.error('Enter all required input fileds',{position:'top-center'})
                mutation.reset()
                return true 
            }else{
                return false
            }
        })

        const result = {
            user: userId,
            item_json: JSON.stringify(data)
        }
        dispatch(setHiddenALert('')) 
        console.log(resData)
        const resSome = resData.some((res)=>{
            if (res===false){
                return false 
            }else{
                return true
            }
        })



        if(!resSome){
            // console.log('ok............')
            mutation.mutate(result)
        }
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, indexval: number) => {
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
            soundClick?.play()
            const id = parseInt(value)
            e.preventDefault();
            console.log('Enter key pressed!');
            try {
                const res = await axios.get(`${baseurl}mat/creatematerial/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                console.log(res.data)
                const result = {
                    [indexval]: res.data
                }

                const newData = data.map((item: any, index: number) => {
                    if (index === indexval) {
                      return {
                        ...item,
                        material_no: res.data.s_no,
                        material_name: res.data.material_name,
                        material_unit: res.data.unit,
                      };
                    }
                    return item;
                  });
                console.log(newData)
                dispatch(getPrData(newData))


            } catch (error) {
                soundError?.play()
                console.log(error)

            }



        }
    }

    
    const handleCloseAlert =()=>{
        dispatch(setHiddenALert('hidden'))   
    }

   

    return {handleChange,handleKeyDown,handleSubmit,handleForm,loadingNewPrCreation,handleCloseAlert,hidden,mutation}
}