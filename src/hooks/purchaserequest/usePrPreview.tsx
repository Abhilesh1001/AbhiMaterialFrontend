import {useDispatch,useSelector} from 'react-redux'
import {praldata,prmainall} from '@/components/dataAll/data'


// dependencies
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

// typeScript 
import {datatypePr,StateProps,prsliiceState} from '@/type/type'

// reducer 
import {resetPr,deleteLine,getPrData,setPrMainData} from '@/redux/pr/prslicer'
import { ChangeEvent, useState } from 'react'




export const usePrPreview =() =>{
    const { datapr:data} = useSelector((state: prsliiceState) => state.prslicer)
    const { baseurl, authToken,userId } = useSelector((state: StateProps) => state.counter)
    const [prno,setPrno] = useState<number|null>(null)
    const [view,setView] =useState(false)
    const [change,setChange] = useState(false)
    const [upprno,setUpprno] = useState<number|null>(null)
    const [loadingNewPrUpdate,setloadingPrUpdata] = useState(false)

    const dispatch =useDispatch()
    const handleView = async ()=>{
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
            }catch(error){
            }
        }
        

    }

    const handlePRView = (e: ChangeEvent<HTMLInputElement>) =>{
        setPrno(Number(e.target.value))
    }
    const FormReset =() =>{
       dispatch(resetPr(praldata))
       dispatch(setPrMainData(prmainall))
       setView(false)
       setChange(false)
    }
    const handleDelete = (index:number)=>{
        if( data.length > 1){
            dispatch(deleteLine({index}))
            
        }
    }

    const handleChangePr = () =>{
        handleView()
        setView(false)
        setChange(true)
    }
    const handleUpdate = async () =>{
        setloadingPrUpdata(true)
        const nweData = {
            item_json : JSON.stringify(data)
        }
        console.log(nweData)
        try {
            const res = await axios.patch(`${baseurl}mat/createpurchase/${prno}/`,nweData,{
                headers :{
                    Authorization : `Bearer ${authToken?.access}`
                }
            })
            setUpprno(res.data.data.pr_no)
            FormReset()
            setloadingPrUpdata(false)
        }catch(error) {
            console.log(error)
            setloadingPrUpdata(false)
        }
        console.log(data)
    }
   
    return {FormReset,handleDelete,handleView,handlePRView,view,handleChangePr,change,handleUpdate,upprno,loadingNewPrUpdate}   
} 