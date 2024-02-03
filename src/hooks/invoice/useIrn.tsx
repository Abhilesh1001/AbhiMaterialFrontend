import { useState,useEffect } from "react";
import { datatype } from "@/type/irn/irn";
import {useSelector,useDispatch} from 'react-redux'
import {irnsliiceState} from '@/type/irn/irn'

import {getSelectedValue,getIrnPoView,getIrnOrignalData,getMainData,getNewIRN,getTotalQuantity,getVendorAdress,getOrignalData,getUpirno,getBillData} from '@/redux/irn/irnslicer'

import {irnmainall} from '@/components/dataAll/data'
import {useMutation} from '@tanstack/react-query'
import axios from "axios";
import {  StateProps } from '@/type/type'
import {useIrnView} from  './useIrnView'


export const useIrn =() =>{
    const dispatch = useDispatch() 
    const {ResetGRN}  = useIrnView()
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    
    const {data,selectedValue,vendoradress,deliveryadress,mainData,billData} = useSelector((state:irnsliiceState)=>state.irnSlice)


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{

        console.log(e.target.value)
        dispatch(getSelectedValue(e.target.value))
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getIrnOrignalData(irnmainall))
        dispatch(getOrignalData(irnmainall))
        dispatch(getUpirno(null))
        dispatch(getBillData({ bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null }))
    }

    const mutation = useMutation<any,any,any,unknown>(({
        mutationFn:async (payload) =>
        await axios.post(`${baseurl}grn/mirocreate`,payload,{
            headers: {
                Authorization :`Bearer ${authToken?.access}`
            }
        }),
        onSuccess:(data)=>{
            dispatch(getNewIRN(data.data.data.po_no))
            ResetGRN()
        },
    }))
   
    console.log(mutation.error)
    
    const handlePOGRNView = (e: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(getIrnPoView(Number(e.target.value)))
    }
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{

        if (selectedValue === 'PO' && vendoradress.name!=='' && deliveryadress.name !== '' && data[0].material_name !== '') {
            const redata = {
                user : userId,
                item_grn : JSON.stringify(data),
                vendor_address : JSON.stringify(vendoradress),
                delivery_address :JSON.stringify(deliveryadress),
                maindata :JSON.stringify(mainData),
                billing : JSON.stringify(billData)
            }
            console.log('data',redata)
            
            mutation.mutate(redata)
        }

    }



    return {handleRadioChange,handlePOGRNView,handleSubmit,mutation}
}