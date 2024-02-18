"use client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { irnmainall } from '@/components/dataAll/data'
import { CounterStateIRN, vendorType, datatype, irndataType, mainType, billDetails } from '@/type/irn/irn'

const initialState: CounterStateIRN = {
  deliveryadress: { s_no: null, name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
  vendoradress: { s_no: null, name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
  data: irnmainall,
  billData: { bill_date: null, bill_no: null, delivery_note: null, transporter_name: null, way_bill: null },
  irndata: { mir_no: null, time: '', item_grn: '', vendor_address: '', delivery_address: '', user: null, maindata: '', billing: '' },
  selectedValue: 'PO',
  mainData: { TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 },
  newIrnNo: null,
  irnpoview: null,
  irnview: false,
  irnchange: false,
  upirnno: null,
  orignalData: irnmainall,
  totalQuantity: irnmainall,
  odataValue: null,
  hastruevalue: false,
  hiddenalert :'hidden',
  newchang : "change"
}


export const irnSlice = createSlice({
  name: 'grnslicer',
  initialState,
  reducers: {
    getDEliveryAdress: (state, action: PayloadAction<vendorType>) => {
      state.deliveryadress = action.payload
    },
    getVendorAdress: (state, action: PayloadAction<vendorType>) => {
      state.vendoradress = action.payload
    },
    getIrnOrignalData: (state: CounterStateIRN, action: PayloadAction<datatype[]>) => {
      state.data = action.payload
    },
    getIrndata: (state, action: PayloadAction<irndataType>) => {
      state.irndata = action.payload
    },
    getSelectedValue: (state, action: PayloadAction<string>) => {
      state.selectedValue = action.payload
    },
    getMainData: (state, action: PayloadAction<mainType>) => {
      state.mainData = action.payload
    },
    getNewIRN: (state, action: PayloadAction<null | number>) => {
      state.newIrnNo = action.payload
    },
    getIrnPoView: (state, action: PayloadAction<null | number>) => {
      state.irnpoview = action.payload
    },
    getIrnview: (state, action: PayloadAction<boolean>) => {
      state.irnview = action.payload
    },
    deleteIrnLine: (state, action) => {
      const { index } = action.payload
      const newDataMain = state.data.filter((item, indexes) => indexes !== index)
      state.data = newDataMain

    },
    getIrnchange: (state, action: PayloadAction<boolean>) => {
      state.irnchange = action.payload
    },
    getUpirno: (state, action: PayloadAction<null | number>) => {
      state.upirnno = action.payload
    },
    getBillData: (state, action: PayloadAction<billDetails>) => {
      state.billData = action.payload
    },
    getOrignalData: (state, action: PayloadAction<datatype[]>) => {
      state.orignalData = action.payload
    },
    getTotalQuantity: (state, action: PayloadAction<datatype[]>) => {
      state.totalQuantity = action.payload
    },

    getOdataValue: (state, action: PayloadAction<null | number>) => {
      state.odataValue = action.payload
    },
    getHasTrueValue: (state, action: PayloadAction<boolean>) => {
      state.hastruevalue = action.payload
    },
    setHiddenALert : (state,action:PayloadAction<string>)=>{
      state.hiddenalert = action.payload
    },
    getNewChange :(state,action:PayloadAction<string>)=>{
      state.newchang = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getDEliveryAdress, getVendorAdress, getIrnOrignalData, getIrndata, getSelectedValue, getMainData, getNewIRN, getIrnPoView, getIrnview, deleteIrnLine, getIrnchange, getUpirno, getBillData, getOrignalData, getTotalQuantity, getOdataValue, getHasTrueValue,setHiddenALert,getNewChange } = irnSlice.actions

export default irnSlice.reducer