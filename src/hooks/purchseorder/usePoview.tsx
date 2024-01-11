import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { posliiceState, StateProps } from '@/type/type'
import { getData,getPoData,getPoview,getSelectedValue,deletePoLine,getPochange} from '@/redux/po/poslicer';
import {pomainall} from '@/components/dataAll/data'


export const usePoview = () =>{
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const { data,selectedValue,poprview} = useSelector((state: posliiceState) => state.poslicer)
    const dispatch = useDispatch()
    console.log('datay',data)
    const [poview,setPoview] = useState(false)
    console.log('insidepoview',poview)
    const [change,setChange] = useState(false)
    const handlePoview = ()=>{
        setPoview(true)
    }

    const handleInsert = () =>{
        dispatch(getPoview(false))
        handleViewChange()
    }
    const handlePochange = () =>{
        dispatch(getPoview(false))
        handleViewChange()
        dispatch(getPochange(true))
    }
    
    const handleViewClick =() =>{
        dispatch(getPoview(true))
        handleViewChange()
        dispatch(getPochange(false))
    }


    const PrInsert = async () =>{
        try {
            const res = await axios.get(`${baseurl}mat/createpurchase/${poprview}/`, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
            const newData = JSON.parse(res.data.item_json)
            console.log('itempenewData',newData)
            
            const newDataUpdata = newData.map((item: any) => {
                const element = {
                    line_no:item.line_no,
                    pr_no: item.pr_no,
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
            console.log('new DelayUpdatew',newDataUpdata)
            if (data[0].pr_no !== null) {
                console.log('oldData',data,newDataUpdata,'newdata' )
                const oldData = [...data]
                const newElem = [...oldData, ...newDataUpdata]
                dispatch(getData((newElem)))
            } else {
                dispatch(getData(newDataUpdata))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInsertPrInpo = () =>{
        console.log(poprview,'pr no')
        
        PrInsert()
    }

    const handleViewChange = async () => {
        
        // pr operation 
        if (selectedValue === 'PR' && poprview !==null && !Object.is(poprview,NaN)) {
            PrInsert()
        }

        // po operation 
        if(selectedValue === 'PO' && poprview !==null && !Object.is(poprview,NaN)){
            try{
                const response =  await axios.get(`${baseurl}mat/createpo/${poprview}/`,{headers:{
                    Authorization:`Bearer ${authToken?.access}`
                }})
                dispatch(getPoData(response.data))
                const newData = JSON.parse(response.data.item_pr)
                console.log('newdta',newData)
                const newDataUpdata = newData.map((item: any) => {
                    const element = {
                        line_no : item.line_no,
                        pr_no: item.pr_no,
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
            }catch(error){
                console.log(error)
            }

        }

    }

    const handleDelete = (index:number) =>{
        console.log(index)
        dispatch(deletePoLine({index}))
    }
    const handleUpdatePo = async (po_no:number) =>{

        const newData =  {
            item_pr: JSON.stringify(data),
            user:userId 
        }
        console.log(newData)
        try{
            const res = await axios.patch(`${baseurl}mat/createpo/${po_no}/`,newData,{
                headers:{
                    Authorization :`Bearer ${authToken?.access}`
                }
            })
            console.log(res)
            ResetPo()

        }catch(error) {
            console.log(error)
        }


    }

    const ResetPo = () =>{
        dispatch(getData(pomainall))
        dispatch(getSelectedValue('PR'))
    }

    return {handlePoview,handlePochange,handleViewClick,handleInsert,handleDelete,handleInsertPrInpo,handleUpdatePo}
}