

import {useDispatch,useSelector} from 'react-redux'
import {praldata,prmainall} from '@/components/dataAll/data'


// dependencies 
import axios from 'axios'
import { soundClick,soundError,soundSsuccess } from '@/sound/sound'

// typeScript 
import {datatypePr,StateProps,prsliiceState} from '@/type/type'

// reducer 
import {resetPr,deleteLine,getPrData,setPrMainData,setHiddenALert,getNewChange} from '@/redux/pr/prslicer'


import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'




export const usePrPreview =() =>{
    const { datapr:data} = useSelector((state: prsliiceState) => state.prslicer)
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const [prno,setPrno] = useState<number|null>(null)
    const [view,setView] =useState(false)
    const [change,setChange] = useState('change')

    const dispatch =useDispatch()
    const handleView = async ()=>{
        soundClick?.play()
        setView(true)
        if(prno !== null){
            try{
                const data = await axios.get(`${baseurl}mat/prview/${prno}`,{
                    headers :{
                        Authorization : `Bearer ${authToken?.access}`
                    }
                })
                console.log(data.data)
                dispatch(setPrMainData(data.data))
                const newData =  JSON.parse(data.data.item_json)
                console.log('newDataPo',newData)
                const mapDataUpdata =  newData.map((item:any)=>{
                    const element = {
                        pr_no:prno,
                        po_no : item.po_no===0?null:item.po_no,
                        line_no:item.line_no,
                        material_name: item.material_name,
                        material_no: item.material_no,
                        material_price: item.material_price,
                        material_qty: item.material_qty,
                        material_unit: item.material_unit,
                        material_text: item.material_text,
                        total_price: item.total_price,
                    }
                    return element
                })
                dispatch(getPrData(mapDataUpdata))
                soundSsuccess?.play()
            }catch(error){
                soundError?.play()
            }
        }
        

    }

    const handlePRView = (e: ChangeEvent<HTMLInputElement>) =>{
        soundClick?.play()
        setPrno(Number(e.target.value))
    }
    const FormReset =() =>{
        soundClick?.play()
       dispatch(resetPr(praldata))
       dispatch(setPrMainData(prmainall))
       setView(false)
       setChange('change')
      
    }
    const handleDelete = (index:number)=>{
        soundClick?.play()
        if( data.length > 1){
            dispatch(deleteLine({index}))
        }
    }

    const handleChangePr = () =>{
        soundClick?.play()
        handleView()
        setView(false)
        setChange('')
        dispatch(getNewChange(''))
    }



    const mutationUpdate =  useMutation<any,any,any,unknown>({
        mutationFn : async (newData)=>{
                return await axios.patch(`${baseurl}mat/createpurchase/${prno}/`,newData,{
                    headers :{
                        Authorization : `Bearer ${authToken?.access}`
                    }
                })
        },
        onSuccess:(data)=>{
            FormReset()
        }

    })


    const handleUpdate = async () =>{
        soundClick?.play()
        dispatch(setHiddenALert(''))
        const nweData = {
            item_json : JSON.stringify(data)
        }
        mutationUpdate.mutate(nweData)
    }
   
    return {FormReset,handleDelete,handleView,handlePRView,view,handleChangePr,change,handleUpdate,mutationUpdate}   
} 