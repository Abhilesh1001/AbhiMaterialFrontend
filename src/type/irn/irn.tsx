
export interface vendorType {
    s_no?: null|number,
    name: string,
    phone_no: number|null,
    vendor_name: string,
    address: string,
    gst: '',
    email: ''
}

export interface datatype {
    line_no : null|number,
    pr_no: null|number,
    po_line :null | number,
    po_no : null|number,
    grn_line: null|number,
    grn_no:null|number,
    irn_line:null|number,
    material_name: string,
    material_no: null|number,
    material_unit: string,
    material_price: null|number,
    material_tax: null|number,
    total_tax :null |number,
    material_qty: null|number,
    material_text: string,
    total_amount: null|number,
    billing: {
      bill_date: string, 
      bill_no: string,
      delivery_note: string,
      transporter_name: string,
      way_bill: string,
    }
}

export interface irndataType {
    mir_no:null|number,
    time:string,
    item_grn:string,
    vendor_address:string,
    delivery_address:string,
    user:null|number,
    maindata:string, 
    billing:string,
}

export type mainType = { TotalAmount: null|number, TotalWithtax: null|number, TotalTax:null|number }

export interface CounterStateIRN {
    deliveryadress:vendorType,
    vendoradress :vendorType,
    data : datatype[]
    irndata :irndataType
    selectedValue : string, 
    mainData :mainType,
    newIrnNo:null|number
    irnpoview : null | number
    irnview : boolean
    irnchange :boolean,
    upirnno:null|number,
    billData : billDetails,
    orignalData:datatype[],
    totalQuantity : datatype[]
    odataValue:number | null,
    hastruevalue:boolean,
    hiddenalert :string,
    newchang : string
  }

export interface irnsliiceState {
    irnSlice:CounterStateIRN
  }

export interface billDetails {bill_date:string|null,bill_no : null|string,delivery_note:null|string,transporter_name:null|string,way_bill:null|string|number}