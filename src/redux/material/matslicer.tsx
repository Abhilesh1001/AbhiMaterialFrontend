'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {dataTypeMatIssue,matType} from '@/type/material/materia-type'




const initialState: dataTypeMatIssue = {
    matData :[{mi_line:1,material_no:null,material_name:'',material_unit:'',material_qty:null,material_issue :null}],
}

export const matSlice = createSlice({
  name: 'matslicer',
  initialState,
  reducers: {
    getMatData : (state,action:PayloadAction<matType[]>) =>{
        state.matData = action.payload
    },

}
   
})

// Action creators are generated for each case reducer function
export const { getMatData} = matSlice.actions

export default matSlice.reducer