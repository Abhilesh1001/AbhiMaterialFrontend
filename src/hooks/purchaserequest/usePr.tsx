import {datatypePr,StateProps,prsliiceState} from '@/type/type'

// dependenciees
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// hooks 
import {useMutation} from '@tanstack/react-query'
import {getPrData,setPrMainData} from '@/redux/pr/prslicer'
import { praldata } from '@/components/dataAll/data'

export const usePr =()=>{
    const { baseurl, authToken, user, userId } = useSelector((state: StateProps) => state.counter)
    const [loadingNewPrCreation, setLoading] = useState(false);
    const { datapr:data} = useSelector((state: prsliiceState) => state.prslicer)
    const [newPrNo,setNewPrNo] = useState<null|number>(null)
    const dispatch = useDispatch()

    const mutation = useMutation<any,any,any,unknown>({
        mutationFn : async (dataRes:any)=>
            await axios.post(`${baseurl}mat/createpurchase`, dataRes, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            }),
            onError:(e) =>{
                console.log(e)
                setLoading(false)
            },
            onSuccess:(data, variables, context)=>{
                  setNewPrNo(data.data.data.pr_no)
                  setLoading(false)
                // setNewMatNo(data.data.data.s_no) 
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
        const newLineNo = data.length + 1
        dispatch(getPrData([...data, {
            line_no: newLineNo,
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
        e.preventDefault()
        setLoading(true)
        const result = {
            user: userId,
            item_json: JSON.stringify(data)
        }

        mutation.mutate(result)
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, indexval: number) => {
        const value = (e.target as HTMLInputElement).value;
        console.log('ok')
        if (e.key === 'Enter') {
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
                console.log(error)

            }



        }
    }

   

    return {handleChange,handleKeyDown,handleSubmit,handleForm,newPrNo,loadingNewPrCreation}
}