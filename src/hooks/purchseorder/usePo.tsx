// typescript 
import { datatype, vendorType, posliiceState, StateProps,updataData } from '@/type/type'
import {pomainall} from '@/components/dataAll/data'

// dependencies 
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import {useMutation,useQueries} from '@tanstack/react-query'

// redux 
import { getData,getPoData,getSelectedValue,getMainData,getNewPO,getVendorAdress,getPoPrView,getPoview, getPochange } from '@/redux/po/poslicer';





export const usePo = () => {
    const dispatch = useDispatch()
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const { vendoradress, deliveryadress ,data,selectedValue,mainData} = useSelector((state: posliiceState) => state.poslicer)
    const [loadingNewPoCreation, setLoading] = useState(false);
    const mutation = useMutation<any,any,any,unknown>(({
        mutationFn:async (payload) =>
        await axios.post(`${baseurl}mat/createpo`,payload,{
            headers: {
                Authorization :`Bearer ${authToken?.access}`
            }
        }),
        onSuccess:(data)=>{
            dispatch(getNewPO(data.data.data.po_no))
            setLoading(false)
            dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0}))
            dispatch(getVendorAdress({name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: ''}))
            dispatch(getData(pomainall))
        },
        onError:(error)=>{
            console.log(error)
            setLoading(false)
        }
    }))
   
    const handleForm = () => {
        const newDataItem = {
            line_no:null,
            pr_no: null,
            material_no: null,
            material_name: '',
            material_unit: '',
            material_price: null,
            material_tax: null,
            total_tax: null,
            material_qty: null,
            material_text: '',
            total_amount: null,
        };
        dispatch(getData([...data, newDataItem]))
    }

    const handleChange = (value: any, key: keyof datatype, index: number) => {
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
            console.log('new data',newData)
            dispatch(getData((newData)));
        }
    };

    // create new PO 
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('submit', data,vendoradress,deliveryadress,userId)
        console.log(data,selectedValue,vendoradress.name)
        if (selectedValue === 'PR' && vendoradress.name!=='' && deliveryadress.name !== '' && data[0].material_name !== '') {
            setLoading(true)
            const redata = {
                user : userId,
                item_pr : JSON.stringify(data),
                vendor_address : JSON.stringify(vendoradress),
                delivery_address :JSON.stringify(deliveryadress),
                maindata :JSON.stringify(mainData)
            }
            mutation.mutate(redata)
        }

    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSelectedValue(e.target.value));
        dispatch(getData(pomainall))
        dispatch(getPoData( {po_no:null,time:'',item_pr:'',vendor_address:'',delivery_address:'',user:null,maindata:''}))
        dispatch(getPoview(false))
        dispatch(getPochange(false))
    };

    const handlePRPOView = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getPoPrView((parseInt(e.target.value))))
    }



    return { handleForm, handleSubmit, handleChange,handlePRPOView, handleRadioChange,loadingNewPoCreation }
}