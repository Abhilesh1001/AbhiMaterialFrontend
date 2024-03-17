// typescript 
import { datatype, posliiceState, StateProps } from '@/type/type'
import {pomainall} from '@/components/dataAll/data'

// dependencies 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import {useMutation} from '@tanstack/react-query'
import { usePoview } from './usePoview'
import { soundClick,soundError,soundSsuccess } from "@/sound/sound";

// redux 
import { getData,getPoData,getSelectedValue,getMainData,getNewPO,getVendorAdress,getPoPrView,getPoview, getPochange,getUppono, getOrignalData,getTotalQuantity,setHiddenALert,getNewChange } from '@/redux/po/poslicer';
import { toast } from 'react-toastify';


export const usePo = () => {
    const dispatch = useDispatch()
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const { vendoradress, deliveryadress ,data,selectedValue,mainData,orignalData,totalQuantity} = useSelector((state: posliiceState) => state.poslicer)
    const {TotalQuantity} = usePoview()
    const [qerror,setQerror] = useState<boolean[]>([])
    const hasTrueValue = qerror.some((value) => value === true);
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
            getUppono(null)
            dispatch(setHiddenALert(''))  
            dispatch(getNewChange('change'))
            soundSsuccess?.play()
        },
        onError:(error)=>{
            // console.log(error)
            setLoading(false)
            soundError?.play()
        }
    }))
   

    const handleChange = async (value: any, key: keyof datatype, index: number) => { 
        const newData:datatype[] = [...data]; 
        
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
    };

    // create new PO 
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        mutation.reset()
        soundClick?.play()
        // console.log(vendoradress)
        if(vendoradress.name==='' || vendoradress.s_no===null){
            // console.log('errro')
            toast.error('Enter vendor Details',{position:'top-center'})
            soundError?.play()
            return
        }
        
        const dataRes  = data.map((item)=>{
            // console.log(item)
            if(item.material_price===0 || item.material_qty===0 || item.material_tax===0 || item.material_text==='' || item.material_tax===null){
                return false
            }else{
                return true
            }
        })
        
        const resSome =  dataRes.some((res)=>{
                return res ===false
        })

        if (selectedValue === 'PR' && vendoradress.name!=='' && deliveryadress.name !== '' && data[0].material_name !== '') {
           
            const redata = {
                user : userId,
                item_pr : JSON.stringify(data),
                vendor_address : JSON.stringify(vendoradress),
                delivery_address :JSON.stringify(deliveryadress),
                maindata :JSON.stringify(mainData)
            }
            if(!resSome){
                setLoading(true)
                mutation.mutate(redata)
            }else{
                soundError?.play()
                toast.error('Enter all required Fileds',{position:'top-center'})
            }


        }

    }

    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        soundClick?.play()
        dispatch(getSelectedValue(e.target.value));
        dispatch(getData(pomainall))
        dispatch(getPoData( {po_no:null,time:'',item_pr:'',vendor_address:'',delivery_address:'',user:null,maindata:''}))
        dispatch(getPoview(false))
        dispatch(getPochange(false))
        dispatch(getOrignalData(pomainall))
    };

    const handlePRPOView = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getPoPrView((parseInt(e.target.value))))
    }

    useEffect(() => {
        const totalQuality = TotalQuantity(data);
        dispatch(getTotalQuantity(totalQuality));
    
        // new setting 
        const error: boolean[] = [];
    
        totalQuality.forEach((item) => {
            const orignalItem = orignalData.find(
                (orignalItem) => orignalItem.line_no === item.line_no && orignalItem.pr_no === item.pr_no
            );
            if (item?.material_qty !== null && orignalItem?.material_qty !== null && orignalItem !== undefined) {
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
    }
    


    return { handleSubmit, handleChange,handlePRPOView, handleRadioChange,loadingNewPoCreation,hasTrueValue,mutation,handleCloseAlert }
}