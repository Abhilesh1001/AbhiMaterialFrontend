"use client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {grnmainall } from '@/components/dataAll/data'
import { CounterStateGRN,vendorType,datatype,grndataType,mainType,billDetails} from '@/type/grn/grntype'



const initialState: CounterStateGRN = {
    deliveryadress:{s_no : null, name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    vendoradress :{s_no:null, name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    data :grnmainall, 
    billData : {bill_date:null,bill_no : null,delivery_note:null,transporter_name:null,way_bill:null},
    grndata : {grn_no:null,time:'',item_po:'',vendor_address:'',delivery_address:'',user:null,maindata:''},
    selectedValue : 'PO',
    mainData : { TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 },
    newGrnNo : null,
    grnpoview : null,
    grnview : false,
    grnchange :false,
    upgrnno : null
}


export const grnSlice = createSlice({
  name: 'grnslicer',
  initialState,
  reducers: {
    getDEliveryAdress: (state, action: PayloadAction<vendorType>) => {
      state.deliveryadress = action.payload
    },
    getVendorAdress : (state, action: PayloadAction<vendorType>) => {
      state.vendoradress = action.payload
    },
    getData : (state:CounterStateGRN,action:PayloadAction<datatype[]>) =>{
        state.data = action.payload
    },
    getGrndata : (state,action:PayloadAction<grndataType>) =>{
        state.grndata = action.payload
    },
    getSelectedValue :(state,action:PayloadAction<string>) =>{
        state.selectedValue = action.payload
    },
    getMainData : (state,action:PayloadAction<mainType>)=>{
        state.mainData = action.payload
    },
    getNewGRN : (state,action:PayloadAction<null|number>) =>{
      state.newGrnNo = action.payload
    },
    getGrnPoView :(state,action:PayloadAction<null|number>) =>{
      state.grnpoview = action.payload
    },
    getGrnview : (state,action:PayloadAction<boolean>) =>{
      state.grnview = action.payload
    },
    deleteGrnLine : (state,action) =>{
      const  {index}  = action.payload
      console.log(index,'index')
      const newDataMain =  state.data.filter((item,indexes)=>indexes!==index)
      state.data = newDataMain

    },
    getGrnchange : (state,action:PayloadAction<boolean>) =>{
      state.grnchange = action.payload
    },
    getUpgrno: (state,action:PayloadAction<null|number>) =>{
      state.upgrnno=action.payload
    },
    getBillData :(state,action:PayloadAction<billDetails>) =>{
      state.billData=action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getDEliveryAdress,getVendorAdress,getData,getGrndata,getSelectedValue,getMainData,getNewGRN,getGrnPoView,getGrnview,deleteGrnLine,getGrnchange,getUpgrno,getBillData} = grnSlice.actions

export default grnSlice.reducer