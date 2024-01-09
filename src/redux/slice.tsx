'use client'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  baseurl:string
  logindata :{}
  authToken: { refresh: string; access: string }| null,
  user : string
  userId : number|null
}


const initialState: CounterState = {
  baseurl : 'http://127.0.0.1:8000/',
  logindata : {},
  authToken : null,
  user : "",
  userId:null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getLogindata: (state, action: PayloadAction<{}>) => {
      state.logindata = action.payload
    },
    getAuthToken : (state,action:PayloadAction<{ refresh: string; access: string }| null>)=>{3
        state.authToken = action.payload
    },
    getUser : (state,action:PayloadAction<string>) =>{
        state.user = action.payload
    },
    clearAuthToken : (state,action:PayloadAction<string>)=>{
        state.authToken=null 
    },
    clearUser :(state,action:PayloadAction<string>) =>{
        state.user =  action.payload
    },
    getUserId :(state,action:PayloadAction<number|null>) =>{
      state.userId = action.payload
    },
    clearUserId : (state,action:PayloadAction<number|null>) =>{
      state.userId = null 
    }
  },
})

// Action creators are generated for each case reducer function
export const { getLogindata,getAuthToken,getUser,clearAuthToken,clearUser,getUserId,clearUserId} = counterSlice.actions

export default counterSlice.reducer