'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {dataTypeMatIssue,matType} from '@/type/material/materia-type'
import { matissueMain } from '@/components/dataAll/data'


const initialState: dataTypeMatIssue = {
    matData :matissueMain,
    orignalData : matissueMain,
    totalQuantity : matissueMain
}

export const matSlice = createSlice({
  name: 'matslicer',
  initialState,
  reducers: {
    getMatData : (state,action:PayloadAction<matType[]>) =>{
        state.matData = action.payload
    },
    getOrignalData :(state,action:PayloadAction<matType[]>)=>{
        state.orignalData=action.payload
    },
    getTotalQuantity : (state,action:PayloadAction<matType[]>)=>{
        state.totalQuantity = action.payload
    }

}
   
})

// Action creators are generated for each case reducer function
export const { getMatData,getOrignalData,getTotalQuantity} = matSlice.actions

export default matSlice.reducer