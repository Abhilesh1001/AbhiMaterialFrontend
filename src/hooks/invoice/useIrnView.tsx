import { irndataType, irnsliiceState } from '@/type/irn/irn'
import { datatype } from "@/type/irn/irn";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { getSelectedValue, getIrnOrignalData, getVendorAdress, getDEliveryAdress, getMainData, getUpirno, getBillData, getIrnchange, getIrnview, deleteIrnLine, getNewIRN, getOrignalData, getIrndata,getOdataValue,getHasTrueValue,setHiddenALert,getNewChange } from '@/redux/irn/irnslicer'
import axios from "axios"
import { StateProps } from '@/type/type'
import { irnmainall } from '@/components/dataAll/data'
import { soundClick,soundError,soundSsuccess } from "@/sound/sound";
import { toast } from 'react-toastify';



export const useIrnView = () => {
    const { data, irnpoview, selectedValue, mainData, billData,odataValue ,hastruevalue} = useSelector((state: irnsliiceState) => state.irnSlice)

    console.log('odatavalue',odataValue)
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const dispatch = useDispatch()
    const [vendorView, setVendorView] = useState('view')
    const [deliveryView, setDeliveryView] = useState('dview')
    const [billingView, setBillingView] = useState('bview')
    const [indexno,setIndex] = useState<null|number>(null)

   

    const handleViewClick = () => {
        soundClick?.play()
        dispatch(getIrnview(true))
        handleViewChange()
        dispatch(getIrnchange(false))


    }


    const handleChange=(value:number|null)=>{
        soundClick?.play()
        if(value===mainData.TotalWithtax){
           dispatch(getHasTrueValue(true))
        }else{
           dispatch(getHasTrueValue(false))
        }

        dispatch(getOdataValue(value))
      }


      useEffect(()=>{
       
        if(odataValue===mainData.TotalWithtax){
            dispatch(getHasTrueValue(true))
        }else{
            dispatch(getHasTrueValue(false))
         }

      },[indexno])



    const handleDelete = (index: number) => {
        soundClick?.play()
        const orignalData = data?.filter((item:any,indexs:number)=>{
            if (index!==indexs){
                return item
            }
        })
        setIndex(index)
        newfun(orignalData)
        dispatch(deleteIrnLine({ index }))

    }

    


    const handleGrnchange = () => {
        soundClick?.play()
        dispatch(getIrnview(false))
        handleViewChange()
        dispatch(getNewChange(''))
        dispatch(getIrnchange(true))
    }

    const handleInsert = () => {
        soundClick?.play()
        console.log('ok', irnpoview)
        handleViewChange()
        dispatch(getIrnview(false))

    }

    const handleInsertPoInGRN = () => {
        PoInsert()
    }





    const handleUpdateGRN = async (irn_no: number) => {
        soundClick?.play()
        dispatch(setHiddenALert(''))
        if(billData.bill_date===null || billData.bill_date===''|| billData.bill_no===null||billData.bill_no===''|| billData.delivery_note===null || billData.delivery_note===''){
            soundError?.play()
            toast.error('Enter Billing Details',{position:'top-center'})
            return
          }



        const newData = {
            item_grn: JSON.stringify(data),
            user: userId,
            maindata: JSON.stringify(mainData),
            billing: JSON.stringify(billData)
        }

        try {
            const res = await axios.patch(`${baseurl}grn/mirocreated/${irn_no}/`, newData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            console.log(res.data.data.mir_no)
            dispatch(getUpirno(res.data.data.mir_no))
            ResetGRN()
            dispatch(getNewIRN(null))
            soundSsuccess?.play()

        } catch (error) {
            console.log(error)
            soundError?.play()
        }

    }

    const ResetGRN = () => {
        dispatch(getMainData({ TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 }))
        dispatch(getVendorAdress({ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' }))
        dispatch(getIrnOrignalData(irnmainall))
        dispatch(getOrignalData(irnmainall))
        dispatch(getBillData({ bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null }))
        dispatch(getSelectedValue('PO'))
    }



    const handleViewChange = async () => {
        soundClick?.play()
        // po operation 
        if (selectedValue === 'PO' && irnpoview !== null && !Object.is(irnpoview, NaN)) {
            PoInsert()
        }

        // IRN operation 
        if (selectedValue === 'IRN' && irnpoview !== null && !Object.is(irnpoview, NaN)) {
            
            try {
                const response = await axios.get(`${baseurl}grn/mirocreated/${irnpoview}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                dispatch(getIrndata(response.data))
                const newData = JSON.parse(response.data.item_grn)
                const resData = JSON.parse(response.data.vendor_address)
                const resDelivery = JSON.parse(response.data.delivery_address)
                dispatch(getBillData(JSON.parse(response.data.billing)))
                console.log(response.data.billing)

                dispatch(getVendorAdress(resData))
                dispatch(getDEliveryAdress(resDelivery))
                const mainPrice = JSON.parse(response.data.maindata)
                console.log('newdataview', newData)
                const orignalUpdataData = newData.map((item: any) => {
                    const element = {
                        line_no: item.line_no,
                        pr_no: item.pr_no,
                        po_line: item.po_line,
                        po_no: item.po_no,
                        grn_line : item.grn_line,
                        grn_no : item.grn_no,
                        irn_line : item.irn_line,
                        material_no: item.material_no,
                        material_name: item.material_name,
                        material_unit: item.material_unit,
                        material_price: item.material_price,
                        material_tax: item.material_tax,
                        total_tax: item.total_tax,
                        material_qty: item.material_qty,
                        material_text: item.material_text,
                        total_amount: item.total_amount,
                        billing : item.billing
                    }
                    return element
                })
                dispatch(getMainData(mainPrice))
                dispatch(getIrnOrignalData(orignalUpdataData))

            } catch (error) {
                console.log(error)
                soundError?.play()
                toast.error('Enter Correct IRN No.',{position:'top-center'})
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
                const billing = JSON.parse(item.billing)
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
                    billing : billing
                }
                return element
            })

            dispatch(getIrnOrignalData(newDataUpdata))
            newfun(newDataUpdata)

            if(odataValue===mainData.TotalWithtax){
                dispatch(getHasTrueValue(true))
            }else{
                dispatch(getHasTrueValue(false))
             }
  
        } catch (error) {
            soundError?.play()
            toast.error('Enter Correct PO No.',{position:'top-center'})
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


    return { handleViewClick, handleGrnchange, handleInsert, handleInsertPoInGRN, handleUpdateGRN, ResetGRN, handleDelete, handleDelivery, handleVdetails, vendorView, deliveryView, handleBilling, billingView,handleChange }
}