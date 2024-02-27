
import { useState,useEffect } from "react";
import {datatype,grnsliiceState} from '@/type/grn/grntype'

// redux 
import {getSelectedValue,getGrnPoView,getData,getMainData,getNewGRN,getTotalQuantity,getVendorAdress,getOrignalData,getUpgrno,getBillData,setHiddenALert,getNewChange} from '@/redux/grn/grnslicer'
import {useSelector,useDispatch} from 'react-redux' 


import {grnmainall} from '@/components/dataAll/data'
import {useMutation} from '@tanstack/react-query'
import axios from "axios";
import {  StateProps } from '@/type/type'
import {useGrnView} from  './useGrnView'
import { toast } from "react-toastify";
import { soundError, soundSsuccess } from "@/sound/sound";


export const useGrn =() =>{
    const dispatch = useDispatch() 
    const {ResetGRN,TotalQuantity}  = useGrnView()
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const [loadingNewPoCreation, setLoading] = useState(false);
    const {data,grnpoview,selectedValue,vendoradress,deliveryadress,mainData,billData,orignalData,totalQuantity} = useSelector((state:grnsliiceState)=>state.grnslice)
    const [qerror,setQerror] = useState<boolean[]>([])
    const hasTrueValue = qerror.some((value) => value === true);

    
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        dispatch(getSelectedValue(e.target.value))
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getData(grnmainall))
        dispatch(getOrignalData(grnmainall))
        dispatch(getUpgrno(null))
        dispatch(getBillData({ bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null }))
    }

    const mutation = useMutation<any,any,any,unknown>(({
        mutationFn:async (payload) =>
        await axios.post(`${baseurl}grn/grncreated`,payload,{
            headers: {
                Authorization :`Bearer ${authToken?.access}`
            }
        }),
        onSuccess:(data)=>{
            soundSsuccess?.play()
            dispatch(getNewGRN(data.data.data.grn_no))
            setLoading(false)
            ResetGRN()
            dispatch(setHiddenALert('')) 
            dispatch(getNewChange('change'))

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


        if(billData.bill_date===null || billData.bill_date=='' || billData.bill_no===null || billData.bill_no==='' || billData.delivery_note===null || billData.delivery_note===''|| billData.transporter_name===null || billData.transporter_name ==='' ||billData.way_bill ===null || billData.way_bill==='' ){
            toast.error('Enter Billing address details',{position:'top-center'})
            soundError?.play()
            return
        }


        const resData = data.map((item)=>{
            if(item.material_qty===null || item.material_qty===0){
                return false
            }else{
                return true
            }
        }) 

        const resSome = resData.some((item)=>{
            return item===false
        }) 

        if (selectedValue === 'PO' && vendoradress.name!=='' && deliveryadress.name !== '' && data[0].material_name !== '') {
            
            const redata = {
                user : userId,
                item_po : JSON.stringify(data),
                vendor_address : JSON.stringify(vendoradress),
                delivery_address :JSON.stringify(deliveryadress),
                maindata :JSON.stringify(mainData),
                billing : JSON.stringify(billData)
            }
            
            if(!resSome){
                setLoading(true)
                mutation.mutate(redata)
            }else{
                soundError?.play()
                toast.error('Enter all required Fields',{position:'top-center'})
            }
        }

    }
    const handleChange =(value: any, key: keyof datatype, index: number) =>{
        // dispatch(getData(newDataUpdata))

        const newData = [...data]; 

        if (value !== null) {
            if (key === 'total_amount' || key === 'total_tax' || key === 'material_price' || key === 'material_qty' || key === 'material_tax') {
                const qty = key === 'material_qty' ? value : newData[index].material_qty;
                const price = key === 'material_price' ? value : newData[index].material_price;
                const tax = key === 'material_tax' ? value : newData[index].material_tax;

                if (key === 'material_qty' || key === 'material_price' || key === 'material_tax') {
                    const totalAmount = qty * price;
                    const total_tax = totalAmount * (tax * 0.01) + totalAmount; 
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
            const totalQuality = TotalQuantity(data)
            dispatch(getTotalQuantity(totalQuality))
        }
    }

    useEffect(() => {
        const totalQuality = TotalQuantity(data);
        dispatch(getTotalQuantity(totalQuality));
    
        // new setting 
        const error: boolean[] = [];
        
        totalQuality.forEach((item) => {
            
            const orignalItem = orignalData.find(
                (orignalItem) => orignalItem.po_line === item.po_line && orignalItem.po_no === item.po_no
            );
            // console.log(item?.material_qty,orignalItem?.material_qty)
            if (item?.material_qty !== null && orignalItem?.material_qty !== null && orignalItem !== undefined) {
                // console.log('error',)
                if (item?.material_qty > orignalItem?.material_qty) {
                    error.push(true);
                } else {
                    error.push(false);
                }
            }
        });
      
        setQerror([...error]);


    }, [data, orignalData]); 


    const handleCloseAlert =()=>{
        dispatch(setHiddenALert('hidden'))   
        dispatch(getUpgrno(null))
    }
    
    return {handleRadioChange,handlePOGRNView,handleSubmit,loadingNewPoCreation,handleChange,hasTrueValue,handleCloseAlert}
}