// typescript 
import { grnsliiceState,datatype } from "@/type/grn/grntype"
import { useState } from "react"
import { StateProps } from '@/type/type'
import { grnmainall } from '@/components/dataAll/data'

// redux 
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedValue, getGrnPoView, getData, getVendorAdress, getDEliveryAdress, getMainData, getUpgrno, getBillData, getGrnview, getGrnchange, getGrndata,deleteGrnLine, getNewGRN,getOrignalData,getTotalQuantity,setHiddenALert,getNewChange } from '@/redux/grn/grnslicer'

// dependencies  
import axios from "axios"
import { soundClick,soundError,soundSsuccess } from "@/sound/sound"
import { toast } from "react-toastify"


export const useGrnView = () => {
    const { data, grnpoview, selectedValue,mainData,billData,orignalData } = useSelector((state: grnsliiceState) => state.grnslice)
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()
    const [vendorView, setVendorView] = useState('view')
    const [deliveryView, setDeliveryView] = useState('dview')
    const [billingView, setBillingView] = useState('bview')

    const handleViewClick = () => {
        soundClick?.play()
        dispatch(getGrnview(true))
        handleViewChange()
        dispatch(getGrnchange(false))

    }
    const handleDelete = (index: number) => {
        soundClick?.play()

        const orignalData = data?.filter((item:any,indexs:number)=>{
            if (index!==indexs){
                return item
            }
        })
        newfun(orignalData)
        dispatch(deleteGrnLine({index})) 
        
    }



    function newfun(newDataUpdata:any) {
        const newData = [...newDataUpdata]
        console.log(newData, 'newData')
        const TotalAmount = newData.reduce((acc, item) => {
            if (item.total_amount !== null) {
                acc += item.total_amount
            }
            return acc
        }, 0)

        const TotalWithTax = newData.reduce((acc,item)=>{
            if (item.total_tax!==null){
                acc += item.total_tax
            }
            return acc
        },0)

        const TotalTax = newData.reduce((acc, item) => {
                      console.log(typeof item.material_tax)
                        if (item.total_amount !== null && item.material_tax !== null) {
                            acc += item.total_amount * (item.material_tax * 0.01)
                        }
                        return acc
                    }, 0)
   
     dispatch(getMainData({ TotalAmount: TotalAmount, TotalWithtax: TotalWithTax, TotalTax: TotalTax }))

    }

    const handleGrnchange = () => {
        soundClick?.play() 
        dispatch(getGrnview(false))
        handleViewChange()
        dispatch(getGrnchange(true))
        dispatch(getNewChange(''))
    }

    const handleInsert = () => {
        soundClick?.play()
        handleViewChange()
        dispatch(getGrnview(false))

    }

    const handleInsertPoInGRN = () => {

        PoInsert()
    }
    const handleUpdateGRN = async (grn_no: number) => {

        soundClick?.play()
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

        dispatch(setHiddenALert(''))
        const newData =  {
            item_po: JSON.stringify(data),
            user:userId,
            maindata : JSON.stringify(mainData),
            billing : JSON.stringify(billData)
        }
        try{
           if (!resSome){
            const res = await axios.patch(`${baseurl}grn/grncreated/${grn_no}/`,newData,{
                headers:{
                    Authorization :`Bearer ${authToken?.access}`
                }
            })
            dispatch(getUpgrno(res.data.data.grn_no))    
            ResetGRN()
            dispatch(getNewGRN(null))
           }else{
                soundError?.play()
                toast.error('Enter required Fields',{position:'top-center'})
           }
        }catch(error) {
            console.log(error)
        }

    }
    const ResetGRN = () => {
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getData(grnmainall))
        dispatch(getOrignalData(grnmainall))
        
        dispatch(getBillData({ bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null }))
        dispatch(getSelectedValue('PO'))
    }



    const handleViewChange = async () => {

        // po operation 
        if (selectedValue === 'PO' && grnpoview !== null && !Object.is(grnpoview, NaN)) {
            PoInsert()
        }

        // GRN operation 

        if (selectedValue === 'GRN' && grnpoview !== null && !Object.is(grnpoview, NaN)) {
            try {
                const response = await axios.get(`${baseurl}grn/grnview/${Number(grnpoview)}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                dispatch(getGrndata(response.data))
                // console.log(response.data.item_po)
                const newData = JSON.parse(response.data.item_po)
                const resData = JSON.parse(response.data.vendor_address)
                const resDelivery = JSON.parse(response.data.delivery_address)
                dispatch(getBillData(JSON.parse(response.data.billing)))
                dispatch(getVendorAdress(resData))
                dispatch(getDEliveryAdress(resDelivery))
                const mainPrice = JSON.parse(response.data.maindata)
                // console.log('newdataview',newData)
                const newDataUpdata = newData.map((item: any) => {
                    const element = {
                        line_no: item.line_no,
                        pr_no: item.pr_no,
                        po_line: item.po_line,
                        po_no: item.po_no,
                        grn_line : item.grn_line, 
                        mrn_no : item.mir_no===0? null:item.mir_no,
                        material_no: item.material_no,
                        material_name: item.material_name,
                        material_unit: item.material_unit,
                        material_price: item.material_price,
                        material_tax: item.material_tax,
                        total_tax: item.total_tax,
                        material_qty: item.material_qty,
                        material_text: item.material_text,
                        total_amount: item.total_amount,
                    }
                    return element
                })



                const orignalUpdataData = newData.map((item: any) => {
                    const element = {
                        line_no: item.line_no,
                        pr_no: item.pr_no,
                        po_line: item.po_line,
                        po_no: item.po_no,
                        material_no: item.material_no,
                        material_name: item.material_name,
                        material_unit: item.material_unit,
                        material_price: item.material_price,
                        material_tax: item.material_tax,
                        total_tax: item.total_tax,
                        material_qty: item.original_qty_po,
                        material_text: item.material_text,
                        total_amount: item.total_amount,
                    }
                    return element
                })
               
                dispatch(getMainData(mainPrice))
                dispatch(getData(newDataUpdata))
                // use for orignal po data 
                dispatch(getOrignalData(orignalUpdataData));

            } catch (error) {
                soundError?.play()
                console.log(error)
                toast.error('Enter Correct GRN No.',{position:'top-center'})
                
            }

        }

    }


    const PoInsert = async () => {
        try {
            const res = await axios.get(`${baseurl}mat/createpo/${grnpoview}/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            const newData = JSON.parse(res.data.item_pr)
            const resData = JSON.parse(res.data.vendor_address)
            const resDelivery = JSON.parse(res.data.delivery_address)
            const mainDataMain = JSON.parse(res.data.maindata)
            dispatch(getMainData(mainDataMain))
            dispatch(getVendorAdress(resData))
            dispatch(getDEliveryAdress(resDelivery))

            const newDataUpdata = newData.map((item: any, index: number) => {
            
                const element = {
                    line_no: item.line_no,
                    pr_no: item.pr_no,
                    po_line: item.po_line,
                    po_no:item.po_no,
                    grn_line: index+1,
                    material_no: item.material_no,
                    material_name: item.material_name,
                    material_unit: item.material_unit,
                    material_price: item.material_price,
                    material_tax: item.material_tax,
                    total_tax: item.total_tax,
                    material_qty: item.material_qty,
                    material_text: item.material_text,
                    total_amount: item.total_amount,
                }
                return element
            })
           
                dispatch(getData(newDataUpdata))
                // Used for Quantity check to the original Quantity
                const remmodeData:datatype[] = removeDuplicates(newDataUpdata)
                const totalQty= TotalQuantity(newDataUpdata)
                dispatch(getTotalQuantity(totalQty))
                dispatch(getOrignalData(remmodeData));
        } catch (error) {
            // console.log('error',error)
            soundError?.play()
            toast.error('Enter correct PO no',{position:'top-center'})
        }
    }

    function removeDuplicates(originalData: datatype[]): datatype[] {
        const uniqueItems: Record<string, datatype> = {};
        const result: datatype[] = [];
    
        originalData.forEach(item => {
            const key = `${item.po_line}-${item.po_no}`;
    
            if (!uniqueItems[key]) {
                uniqueItems[key] = { ...item };
                result.push(uniqueItems[key]);
            } 
        });
    
        return result;
    }
    
    function TotalQuantity(originalData: datatype[]): datatype[] {
        const uniqueItems: Record<string, datatype> = {};
        const result: datatype[] = [];

        const orignalDa= [...originalData]
        
        orignalDa.forEach(item => {
            const key = `${item.po_line}-${item.po_no}`;
    
            if (!uniqueItems[key]) {
                uniqueItems[key] = { ...item };
                result.push(uniqueItems[key]);
            } else {
                const existingItem = uniqueItems[key];
                if (existingItem.material_qty !==null && item.material_qty!== null) {
                    existingItem.material_qty +=item.material_qty;
                }
            }
        });
    
        return result;
    }





    const handleDelivery = () => {
        soundClick?.play()
        setDeliveryView(`${deliveryView === 'dview' ? null : 'dview'}`)
    }
    const handleVdetails = () => {
        soundClick?.play()
        setVendorView(`${vendorView === 'view' ? null : 'view'}`)

    }
    const handleBilling = () => {
        soundClick?.play()
        setBillingView(`${billingView === 'bview' ? null : 'bview'}`)

    } 


    return { handleViewClick, handleGrnchange, handleInsert, handleInsertPoInGRN, handleUpdateGRN, ResetGRN, handleDelete, handleDelivery, handleVdetails, vendorView, deliveryView, handleBilling, billingView,TotalQuantity}
}