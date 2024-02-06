import {useSelector,useDispatch} from 'react-redux'
import React, { useEffect, useState } from 'react'
import {StateProps} from '@/type/type'
import axios from 'axios'
import {dataTypeMatIssue,matType,matState} from '@/type/material/materia-type'
import {getMatData} from '@/redux/material/matslicer'





export function useIsMaterial(){
    
    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)
    const {matData:data} =  useSelector((state:matState)=>state.matSlice)
    const dispatch = useDispatch()
   
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>,index:number)=>{
        const value = (e.target as HTMLInputElement).value 
        if (e.key == 'Enter'){
            const newData = [...data]
            try{
                const data =await axios.get(`${baseurl}grn/materialstock/${value}`,{headers:{
                    Authorization :`Bearer ${authToken?.access}`
                }})
                console.log(data.data)
                if(data.data[0]!==undefined){
                    const onewData = newData?.map((item:matType,indexes:number)=>{
                        if( indexes===index){
                             return {
                                 ...item,
                                 material_no: parseInt(data.data[0].material_no),
                                 material_name: data.data[0].material_name,
                                 material_unit: data.data[0].material_unit,
                                 material_qty: data.data[0].material_qty,
                             }
                        }
                        return item
                 })
                 dispatch(getMatData(onewData))
                }
                else{

                }

            }catch(error){
                console.log(error)
            }
        }
    }
    
    const handleChange =(value:Number,key :keyof matType,index:number)=>{
        const updata = [...data]
        updata[index] = {...updata[index],[key]:value}
        console.log(updata)
        dispatch(getMatData(updata))
    }

    function handleClick(){
           const newFrom = [...data]
           const lastLine = newFrom.length > 0 ? newFrom[newFrom.length - 1].mi_line : 0;
           const newLine =lastLine === null ? 0 : lastLine + 1;
           const updateForm = [...newFrom,{mi_line: newLine,material_no:null,material_name:'',material_unit:'',material_qty:null,material_issue :null}]
           dispatch(getMatData(updateForm))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const result = {
            // user: userId,
            // item_json: JSON.stringify(data)
        }

        // mutation.mutate(result)
    }

    const handleDelete = (index:number)=>{
        console.log(index)
        if( data.length > 1){
            const update = [...data]
            const updateData = update?.filter((item:any,indexs:number)=>{
                if (index!==indexs){
                    return item
                }
            })
            console.log(updateData)
            dispatch(getMatData(updateData))
        }
    }

    return {handleKeyDown,handleChange,handleClick,handleSubmit,handleDelete}
}