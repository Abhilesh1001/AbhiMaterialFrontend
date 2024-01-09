import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {vendorType,datatype,podataType,mainType,updataData} from '@/type/type'

export interface CounterState {
  deliveryadress:vendorType,
  vendoradress :vendorType,
  data : datatype[]
  podata :podataType
  selectedValue : string, 
  mainData :mainType,
  newPoNo:null|number
}

const initialState: CounterState = {
    deliveryadress:{ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    vendoradress :{ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    data : [{
        line_no : null,
        pr_no: null,
        material_no: null,
        material_name: '',
        material_unit: '',
        material_price: null,
        material_tax: null,
        total_tax: null,
        material_qty: null,
        material_text: '',
        total_amount: null,
    }],
    podata : {po_no:null,time:'',item_pr:'',vendor_address:'',delivery_address:'',user:null,maindata:''},
    selectedValue : 'PR',
    mainData : { TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 },
    newPoNo : null,

}


export const poSlice = createSlice({
  name: 'poslicer',
  initialState,
  reducers: {
    getDEliveryAdress: (state, action: PayloadAction<vendorType>) => {
      state.deliveryadress = action.payload
    },
    getVendorAdress : (state, action: PayloadAction<vendorType>) => {
      state.vendoradress = action.payload
    },
    getData : (state:CounterState,action:PayloadAction<datatype[]>) =>{
        state.data = action.payload
    },
    getPoData : (state,action:PayloadAction<podataType>) =>{
        state.podata = action.payload
    },
    getSelectedValue :(state,action:PayloadAction<string>) =>{
        state.selectedValue = action.payload
    },
    getMainData : (state,action:PayloadAction<mainType>)=>{
        state.mainData = action.payload
    },
    getNewPO : (state,action:PayloadAction<null|number>) =>{
      state.newPoNo = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getDEliveryAdress,getVendorAdress,getData,getPoData,getSelectedValue,getMainData,getNewPO} = poSlice.actions

export default poSlice.reducer