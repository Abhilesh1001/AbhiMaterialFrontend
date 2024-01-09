'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {datatypePr} from '@/type/type'

export interface CounterState {
  datapr : datatypePr[]
}

const initialState: CounterState = {
    
    datapr : [{
        line_no: 1,
        material_name: '',
        material_unit: '',
        material_no: null,
        material_price: null,
        material_qty: null,
        material_text: '',
        total_price: null
    }],
   

}


export const prSlice = createSlice({
  name: 'prslicer',
  initialState,
  reducers: {
    getPrData : (state:CounterState,action:PayloadAction<datatypePr[]>) =>{
        state.datapr = action.payload
    }

}
   
})

// Action creators are generated for each case reducer function
export const { getPrData} = prSlice.actions

export default prSlice.reducer