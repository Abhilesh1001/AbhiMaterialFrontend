import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {vendorType,datatype,podataType,mainType,updataData,CounterStatePo} from '@/type/type'
import {pomainall } from '@/components/dataAll/data'



const initialState: CounterStatePo = {
    deliveryadress:{ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    vendoradress :{ name: '', phone_no: null, vendor_name: '', address: '', gst: '', email: '' },
    data :pomainall, 
    podata : {po_no:null,time:'',item_pr:'',vendor_address:'',delivery_address:'',user:null,maindata:''},
    selectedValue : 'PR',
    mainData : { TotalAmount: 0, TotalWithtax: 0, TotalTax: 0 },
    newPoNo : null,
    poprview : null,
    poview : false,
    pochange :false
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
    getData : (state:CounterStatePo,action:PayloadAction<datatype[]>) =>{
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
    },
    getPoPrView :(state,action:PayloadAction<null|number>) =>{
      state.poprview = action.payload
    },
    getPoview : (state,action:PayloadAction<boolean>) =>{
      state.poview = action.payload
    },
    deletePoLine : (state,action) =>{
      const  {index}  = action.payload
      console.log(index,'index')
      const newDataMain =  state.data.filter((item,indexes)=>indexes!==index)
      state.data = newDataMain

    },
    getPochange : (state,action:PayloadAction<boolean>) =>{
      state.pochange = action.payload
    }

  },
})

// Action creators are generated for each case reducer function
export const { getDEliveryAdress,getVendorAdress,getData,getPoData,getSelectedValue,getMainData,getNewPO,getPoPrView,getPoview,deletePoLine,getPochange} = poSlice.actions

export default poSlice.reducer