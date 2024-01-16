import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { posliiceState, StateProps,datatype } from '@/type/type'
import { getData, getPoData, getPoview, getSelectedValue, deletePoLine, getPochange, getUppono, getMainData, getNewPO, getOrignalData,getTotalQuantity } from '@/redux/po/poslicer';
import { pomainall } from '@/components/dataAll/data'


export const usePoview = () => {
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const { data, selectedValue, poprview, mainData, orignalData } = useSelector((state: posliiceState) => state.poslicer)

    const dispatch = useDispatch()

    const [poview, setPoview] = useState(false)
    const handlePoview = () => {
        setPoview(true)
    }

    const handleInsert = () => {
        dispatch(getPoview(false))
        handleViewChange()
    }
    const handlePochange = () => {
        dispatch(getPoview(false))
        handleViewChange()
        dispatch(getPochange(true))
    }

    const handleViewClick = () => {
        dispatch(getPoview(true))
        handleViewChange()
        dispatch(getPochange(false))
    }


    const PrInsert = async () => {
        try {
            const res = await axios.get(`${baseurl}mat/createpurchase/${poprview}/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            const lastPoLine = data.length > 0 ? data[data.length - 1].po_line || 0 : 0;

            const newData = JSON.parse(res.data.item_json)
            const newDataUpdata = newData.map((item: any, index: number) => {
                const element = {
                    line_no: item.line_no,
                    pr_no: item.pr_no,
                    po_line: lastPoLine + 1 + index,
                    material_no: item.material_no,
                    material_name: item.material_name,
                    material_unit: item.material_unit,
                    material_price: item.material_price,
                    material_tax: null,
                    total_tax: null,
                    material_qty: item.material_qty,
                    material_text: item.material_text,
                    total_amount: item.total_price,
                }
                return element
            })

               
            if (data[0].pr_no !== null) {
                const oldData = [...data]
                const newElem = [...oldData, ...newDataUpdata]
                const totalQty= TotalQuantity(newElem)
                dispatch(getTotalQuantity(totalQty))
                dispatch(getData((newElem)))
                // used for Quantity chaeck to the orignal Quantity 
                const oldOrignalData = [...orignalData, ...newDataUpdata];
                const remmodeData:datatype[] = removeDuplicates(oldOrignalData)
                dispatch(getOrignalData(remmodeData));

            } else {
                dispatch(getData(newDataUpdata))
                // Used for Quantity check to the original Quantity
                const remmodeData:datatype[] = removeDuplicates(newDataUpdata)
                const totalQty= TotalQuantity(newDataUpdata)
                dispatch(getTotalQuantity(totalQty))
                dispatch(getOrignalData(remmodeData));
            }




        } catch (error) {
            console.log(error)
        }
    }

    const handleInsertPrInpo = () => {
        PrInsert()
    }

    const handleViewChange = async () => {

        // pr operation 
        if (selectedValue === 'PR' && poprview !== null && !Object.is(poprview, NaN)) {
            PrInsert()
        }

        // po operation 
        if (selectedValue === 'PO' && poprview !== null && !Object.is(poprview, NaN)) {
            try {
                const response = await axios.get(`${baseurl}mat/poview/${poprview}/`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                console.log('responsedata',response.data)
                dispatch(getPoData(response.data))
                console.log('newDAta',JSON.parse(response.data.item_pr))
                const newData = JSON.parse(response.data.item_pr)
                const mainPrice = JSON.parse(response.data.maindata)
                const newDataUpdata = newData.map((item: any) => {
                    const element = {
                        line_no: item.line_no,
                        pr_no: item.pr_no,
                        po_line: item.po_line,
                        grn_no: item.grn_no === 0 ? null : item.grn_no,
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

                dispatch(getMainData(mainPrice))
                dispatch(getData(newDataUpdata))

                // for orignal Data 
                const orignalUpdataData = newData.map((item: any) => {
                    const element = {
                        line_no: item.line_no,
                        pr_no: item.pr_no,
                        po_line: item.po_line,
                        grn_no: item.grn_no === 0 ? null : item.grn_no,
                        material_no: item.material_no,
                        material_name: item.material_name,
                        material_unit: item.material_unit,
                        material_price: item.material_price,
                        material_tax: item.material_tax,
                        total_tax: item.total_tax,
                        material_qty: item.orignaQtyPr,
                        material_text: item.material_text,
                        total_amount: item.total_amount,

                    }
                    return element
                })

                dispatch(getOrignalData(orignalUpdataData));

            } catch (error) {
                console.log(error)
            }

        }

    }

    const handleDelete = (index: number) => {
        dispatch(deletePoLine({ index }))
    }
    const handleUpdatePo = async (po_no: number) => {
        console.log('poview',po_no)
        const newData = {
            item_pr: JSON.stringify(data),
            user: userId,
            maindata: JSON.stringify(mainData)
        }
        try {
            const res = await axios.patch(`${baseurl}mat/createpo/${po_no}/`, newData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            dispatch(getUppono(res.data.data.po_no))
            ResetPo()
            dispatch(getNewPO(null))

        } catch (error) {
            console.log(error)
        }
    }

    const ResetPo = () => {
        dispatch(getData(pomainall))
        dispatch(getSelectedValue('PR'))
        dispatch(getMainData({ TotalAmount: null, TotalWithtax: null, TotalTax: null }))
        dispatch(getOrignalData(pomainall))

    }


    // removeDublicates 
    function removeDuplicates(originalData: datatype[]): datatype[] {
        const uniqueItems: Record<string, datatype> = {};
        const result: datatype[] = [];
    
        originalData.forEach(item => {
            const key = `${item.line_no}-${item.pr_no}`;
    
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
            const key = `${item.line_no}-${item.pr_no}`;
    
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

   
    
    return { handlePoview, handlePochange, handleViewClick, handleInsert, handleDelete, handleInsertPrInpo, handleUpdatePo, ResetPo,TotalQuantity }
}