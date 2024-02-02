import { irndataType, irnsliiceState } from '@/type/irn/irn'
import { datatype } from "@/type/irn/irn";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedValue, getIrnOrignalData, getVendorAdress, getDEliveryAdress, getMainData, getUpirno, getBillData, getIrnchange, getIrnview, deleteIrnLine, getNewIRN, getOrignalData, getTotalQuantity, getIrndata } from '@/redux/irn/irnslicer'
import axios from "axios"
import { StateProps } from '@/type/type'
import { irnmainall } from '@/components/dataAll/data'


export const useIrnView = () => {
    const { data, irnpoview, selectedValue, mainData, billData } = useSelector((state: irnsliiceState) => state.irnSlice)
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()
    const [vendorView, setVendorView] = useState('view')
    const [deliveryView, setDeliveryView] = useState('dview')
    const [billingView, setBillingView] = useState('bview')
    const handleViewClick = () => {
        dispatch(getIrnview(true))
        handleViewChange()
        dispatch(getIrnchange(false))

    }
    const handleDelete = (index: number) => {
        const orignalData = data?.filter((item:any,indexs:number)=>{
            if (index!==indexs){
                return item
            }
        })
        newfun(orignalData)
        dispatch(deleteIrnLine({ index }))
    }



    const handleGrnchange = () => {
        dispatch(getIrnview(false))
        handleViewChange()
        dispatch(getIrnchange(true))
    }

    const handleInsert = () => {
        console.log('ok', irnpoview)
        handleViewChange()
        dispatch(getIrnview(false))

    }

    const handleInsertPoInGRN = () => {
        PoInsert()
    }
    const handleUpdateGRN = async (grn_no: number) => {
        const newData = {
            item_pr: JSON.stringify(data),
            user: userId,
            maindata: JSON.stringify(mainData),
            billing: JSON.stringify(billData)
        }
        try {
            const res = await axios.patch(`${baseurl}grn/grncreated/${grn_no}/`, newData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            dispatch(getUpirno(res.data.data.grn_no))
            ResetGRN()
            dispatch(getNewIRN(null))

        } catch (error) {
            console.log(error)
        }

    }
    const ResetGRN = () => {
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getIrnOrignalData(irnmainall))
        dispatch(getOrignalData(irnmainall))
        dispatch(getUpirno(null))
        dispatch(getBillData({ bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null }))
        dispatch(getSelectedValue('PO'))
    }



    const handleViewChange = async () => {

        // po operation 
        if (selectedValue === 'PO' && irnpoview !== null && !Object.is(irnpoview, NaN)) {
            PoInsert()
        }

        // GRN operation 
        if (selectedValue === 'IRN' && irnpoview !== null && !Object.is(irnpoview, NaN)) {
            try {
                const response = await axios.get(`${baseurl}grn/grnview/${irnpoview}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                dispatch(getIrndata(response.data))
                const newData = JSON.parse(response.data.item_po)
                const resData = JSON.parse(response.data.vendor_address)
                const resDelivery = JSON.parse(response.data.delivery_address)
                dispatch(getBillData(JSON.parse(response.data.billing)))
                dispatch(getVendorAdress(resData))
                dispatch(getDEliveryAdress(resDelivery))
                const mainPrice = JSON.parse(response.data.maindata)
                console.log('newdataview', newData)
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
                dispatch(getIrnOrignalData(newDataUpdata))

                // use for orignal po data 
                dispatch(getOrignalData(orignalUpdataData));

            } catch (error) {
                console.log(error)
            }

        }

    }


    const PoInsert = async () => {
        try {
            const res = await axios.get(`${baseurl}grn/irnpoinsert/${irnpoview}/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })

            const lastIrnLine = data.length > 0 ? data[data.length - 1].irn_line || 0 : 0;
            const newData = JSON.parse(res.data.item_pr)
            const resData = JSON.parse(res.data.vendor_address)
            const resDelivery = JSON.parse(res.data.delivery_address)
            dispatch(getVendorAdress(resData))
            dispatch(getDEliveryAdress(resDelivery))

            const newDataUpdata = newData.map((item: any, index: number) => {

                const element = {
                    line_no: item.line_no,
                    pr_no: item.pr_no,
                    po_line: item.po_line,
                    po_no: item.po_no,
                    grn_line:item.grn_line,
                    grn_no:item.grn_no,
                    irn_line: lastIrnLine + 1 + index,
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




            dispatch(getIrnOrignalData(newDataUpdata))
            newfun(newDataUpdata)


        } catch (error) {
            console.log('error', error)
        }
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

  


    const handleDelivery = () => {
        setDeliveryView(`${deliveryView === 'dview' ? null : 'dview'}`)
    }
    const handleVdetails = () => {
        setVendorView(`${vendorView === 'view' ? null : 'view'}`)

    }
    const handleBilling = () => {
        setBillingView(`${billingView === 'bview' ? null : 'bview'}`)

    }


    return { handleViewClick, handleGrnchange, handleInsert, handleInsertPoInGRN, handleUpdateGRN, ResetGRN, handleDelete, handleDelivery, handleVdetails, vendorView, deliveryView, handleBilling, billingView }
}