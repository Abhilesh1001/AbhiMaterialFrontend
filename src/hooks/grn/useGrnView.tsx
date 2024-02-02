import { grnsliiceState,datatype } from "@/type/grn/grntype"
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedValue, getGrnPoView, getData, getVendorAdress, getDEliveryAdress, getMainData, getUpgrno, getBillData, getGrnview, getGrnchange, getGrndata,deleteGrnLine, getNewGRN,getOrignalData,getTotalQuantity } from '@/redux/grn/grnslicer'
import axios from "axios"
import { StateProps } from '@/type/type'
import { grnmainall } from '@/components/dataAll/data'


export const useGrnView = () => {
    const { data, grnpoview, selectedValue,mainData,billData,orignalData } = useSelector((state: grnsliiceState) => state.grnslice)
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()
    const [vendorView, setVendorView] = useState('view')
    const [deliveryView, setDeliveryView] = useState('dview')
    const [billingView, setBillingView] = useState('bview')

    const handleViewClick = () => {
        dispatch(getGrnview(true))
        handleViewChange()
        dispatch(getGrnchange(false))

    }
    const handleDelete = (index: number) => {
        console.log(index)
        dispatch(deleteGrnLine({index}))
    }

    const handleGrnchange = () => {
        dispatch(getGrnview(false))
        handleViewChange()
        dispatch(getGrnchange(true))
    }

    const handleInsert = () => {
        console.log('ok', grnpoview)
        handleViewChange()
        dispatch(getGrnview(false))

    }

    const handleInsertPoInGRN = () => {
        PoInsert()
    }
    const handleUpdateGRN = async (grn_no: number) => {
        const newData =  {
            item_pr: JSON.stringify(data),
            user:userId,
            maindata : JSON.stringify(mainData),
            billing : JSON.stringify(billData)
        }
        try{
            const res = await axios.patch(`${baseurl}grn/grncreated/${grn_no}/`,newData,{
                headers:{
                    Authorization :`Bearer ${authToken?.access}`
                }
            })
            dispatch(getUpgrno(res.data.data.grn_no))    
            ResetGRN()
            dispatch(getNewGRN(null))

        }catch(error) {
            console.log(error)
        }

    }
    const ResetGRN = () => {
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getData(grnmainall))
        dispatch(getOrignalData(grnmainall))
        dispatch(getUpgrno(null))
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
                const response = await axios.get(`${baseurl}grn/grnview/${grnpoview}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                dispatch(getGrndata(response.data))
                console.log(response.data.item_po)
                const newData = JSON.parse(response.data.item_po)
                const resData = JSON.parse(response.data.vendor_address)
                const resDelivery = JSON.parse(response.data.delivery_address)
                dispatch(getBillData(JSON.parse(response.data.billing)))
                dispatch(getVendorAdress(resData))
                dispatch(getDEliveryAdress(resDelivery))
                const mainPrice = JSON.parse(response.data.maindata)
                console.log('newdataview',newData)
                const newDataUpdata = newData.map((item: any) => {
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
                console.log(error)
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
            const lastGrnLine = data.length > 0 ? data[data.length - 1].grn_line || 0 : 0;
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
                    grn_line: lastGrnLine + 1 + index,
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
            console.log('error',error)
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
        setDeliveryView(`${deliveryView === 'dview' ? null : 'dview'}`)
    }
    const handleVdetails = () => {
        setVendorView(`${vendorView === 'view' ? null : 'view'}`)

    }
    const handleBilling = () => {
        setBillingView(`${billingView === 'bview' ? null : 'bview'}`)

    } 


    return { handleViewClick, handleGrnchange, handleInsert, handleInsertPoInGRN, handleUpdateGRN, ResetGRN, handleDelete, handleDelivery, handleVdetails, vendorView, deliveryView, handleBilling, billingView,TotalQuantity}
}