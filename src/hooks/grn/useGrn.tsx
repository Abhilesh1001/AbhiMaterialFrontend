import { useState } from "react";
import {datatype,grnsliiceState} from '@/type/grn/grntype'
import {useSelector,useDispatch} from 'react-redux' 
import {getSelectedValue,getGrnPoView,getData,getMainData,getNewGRN} from '@/redux/grn/grnslicer'
import {useMutation} from '@tanstack/react-query'
import axios from "axios";
import {  StateProps } from '@/type/type'
import {useGrnView} from  './useGrnView'


export const useGrn =() =>{
    const dispatch = useDispatch() 
    const {ResetGRN}  = useGrnView()
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const [loadingNewPoCreation, setLoading] = useState(false);
    const {data,grnpoview,selectedValue,vendoradress,deliveryadress,mainData,billData} = useSelector((state:grnsliiceState)=>state.grnslice)
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(getSelectedValue(e.target.value))
        ResetGRN()

    }

    const mutation = useMutation<any,any,any,unknown>(({
        mutationFn:async (payload) =>
        await axios.post(`${baseurl}grn/grncreated`,payload,{
            headers: {
                Authorization :`Bearer ${authToken?.access}`
            }
        }),
        onSuccess:(data)=>{
            dispatch(getNewGRN(data.data.data.po_no))
            setLoading(false)
            ResetGRN()
        },
        onError:(error)=>{
            console.log(error)
            setLoading(false)
        }
    }))
   
    const handlePOGRNView = (e: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(getGrnPoView(Number(e.target.value)))
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        if (selectedValue === 'PO' && vendoradress.name!=='' && deliveryadress.name !== '' && data[0].material_name !== '') {
            setLoading(true)
            const redata = {
                user : userId,
                item_po : JSON.stringify(data),
                vendor_address : JSON.stringify(vendoradress),
                delivery_address :JSON.stringify(deliveryadress),
                maindata :JSON.stringify(mainData),
                billing : JSON.stringify(billData)
            }
            console.log(redata)
            
            mutation.mutate(redata)
        }

    }
    const handleChange =(value: any, key: keyof datatype, index: number) =>{
        console.log(value,key,index)
        // dispatch(getData(newDataUpdata))

        const newData = [...data]; // Create a copy of the state array

        if (value !== null) {
            if (key === 'total_amount' || key === 'total_tax' || key === 'material_price' || key === 'material_qty' || key === 'material_tax') {
                const qty = key === 'material_qty' ? value : newData[index].material_qty;
                const price = key === 'material_price' ? value : newData[index].material_price;
                const tax = key === 'material_tax' ? value : newData[index].material_tax;

                if (key === 'material_qty' || key === 'material_price' || key === 'material_tax') {
                    const totalAmount = qty * price;
                    const total_tax = totalAmount * (tax * 0.01) + totalAmount; // Calculate total_tax based on your logic
                    newData[index] = { ...newData[index], total_amount: totalAmount, total_tax: total_tax };
                }
            }

            newData[index] = { ...newData[index], [key]: value };

            const TotalAmount = newData.reduce((acc, item) => {
                if (item.total_amount !== null) {
                    acc += item.total_amount
                }
                return acc
            }, 0)

            const TotalWithtax = newData.reduce((acc, item) => {
                if (item.total_tax !== null) {
                    acc += item.total_tax
                }
                return acc
            }, 0)

            const TotalTax = newData.reduce((acc, item) => {
                if (item.total_amount !== null && item.material_tax !== null) {
                    acc += item.total_amount * (item.material_tax * 0.01)
                }
                return acc
            }, 0)
            dispatch(getMainData({ TotalAmount: TotalAmount, TotalWithtax: TotalWithtax, TotalTax: TotalTax }))
            dispatch(getData((newData)));
        }
    }

    return {handleRadioChange,handlePOGRNView,handleSubmit,loadingNewPoCreation,handleChange}
}