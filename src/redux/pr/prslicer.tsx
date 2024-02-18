'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {datatypePr,CounterState,prmainData} from '@/type/type'

import {praldata,prmainall} from '@/components/dataAll/data'


const initialState: CounterState = {
    datapr :praldata,
    prmaindata : prmainall,
    hiddenalert :'hidden',
    newchang :'change'
}


export const prSlice = createSlice({
  name: 'prslicer',
  initialState,
  reducers: {
    getPrData : (state:CounterState,action:PayloadAction<datatypePr[]>) =>{
        state.datapr = action.payload
    },
    resetPr : (state:CounterState,action:PayloadAction<datatypePr[]>)=>{
      state.datapr = praldata
    },
    deleteLine : (state,action) =>{
     const  {index} = action.payload

     const newData = state.datapr.filter((item, indexData) => indexData !== index);
     state.datapr = newData
    },
    setPrMainData : (state,action:PayloadAction<prmainData>) =>{
      state.prmaindata = action.payload
    },
    setHiddenALert : (state,action:PayloadAction<string>)=>{
      state.hiddenalert = action.payload
    },
    getNewChange :(state,action:PayloadAction<string>)=>{
      state.newchang = action.payload
    }

}
   
})

// Action creators are generated for each case reducer function
export const { getPrData,resetPr,deleteLine,setPrMainData,setHiddenALert,getNewChange} = prSlice.actions

export default prSlice.reducer