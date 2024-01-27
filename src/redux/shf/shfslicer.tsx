'use_client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface counterType{
    hide :string
} 

const initialState: counterType = {
    hide :'hidden',
}


export const shfSlice = createSlice({
  name: 'prslicer',
  initialState,
  reducers: {
    getHideData : (state,action:PayloadAction<string>) =>{
        state.hide = action.payload
    },

}
   
})

// Action creators are generated for each case reducer function
export const { getHideData} = shfSlice.actions

export default shfSlice.reducer