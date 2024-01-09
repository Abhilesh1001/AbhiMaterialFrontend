import {datatypePr,StateProps} from '@/type/type'

// dependenciees
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// hooks 
import {useMutation} from '@tanstack/react-query'





export const usePr =()=>{
    const { baseurl, authToken, user, userId } = useSelector((state: StateProps) => state.counter)
    const [loadingNewPrCreation, setLoading] = useState(false);
    const [newPrNo,setNewPrNo] = useState<null|number>(null)
    const [data, setData] = useState<datatypePr[]>([{
        line_no: 1,
        material_name: '',
        material_unit: '',
        material_no: null,
        material_price: null,
        material_qty: null,
        material_text: '',
        total_price: null
    }])

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
                setData([{
                    line_no: 1,
                    material_name: '',
                    material_unit: '',
                    material_no: null,
                    material_price: null,
                    material_qty: null,
                    material_text: '',
                    total_price: null
                }])               
            }
            ,
    })

    

    const handleChange = (value: any, key: keyof datatypePr, index: number) => {

        const updatedData: any = [...data];
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;

        if (key === 'material_qty' || key === 'material_price') {
            const qty = key === 'material_qty' ? numericValue : updatedData[index].material_qty;
            const price = key === 'material_price' ? numericValue : updatedData[index].material_price;

            updatedData[index][key] = numericValue;
            updatedData[index].total_price = qty * price;
        } else {
            updatedData[index][key] = value;
        }

        setData(updatedData);

    }


    
    const handleForm = () => {
        const newLineNo = data.length + 1
        setData([...data, {
            line_no: newLineNo,
            material_name: '',
            material_unit: '',
            material_no: null,
            material_price: null,
            material_qty: null,
            material_text: '',
            total_price: null
        }])


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
                console.log(res.data)
                setData(prevData => prevData.map((item, index) => {
                    if (index === indexval) {
                        return {
                            ...item,
                            material_no: res.data.s_no,
                            material_name: res.data.material_name,
                            material_unit: res.data.unit
                        };
                    }
                    return item;
                }))


            } catch (error) {
                console.log(error)

            }



        }
    }

    const handlePRView = () => { }

    return {handleChange,handlePRView,data,handleKeyDown,handleSubmit,handleForm,newPrNo,loadingNewPrCreation}
}