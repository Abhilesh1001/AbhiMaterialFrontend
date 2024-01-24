

export interface shareholderName {
    Sh_id?: null|number,
    name: string,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
}
export interface rdholderName {
    rdp_id?: null|number,
    name: string,
    phone_no: string,
    email: string,
    time?: string,
    pan_no: string,
}


export interface MyData {
    data:{
        msg : string,
        data:shareholderName
    },
    isPending :boolean,
    
}

export interface sharefund {
    sh_id : null | number,
    amount_credit :null|number,
    amount_debit : null|number,
    name: string,
    particulars:string
}
export interface collData {
    user:null|number,
    person : null|number,
    amount_collected : null|number,
    remarks: string
    name : '',
}

export interface Entry {
    date: string;
    amount:number;
  }
  
  export interface Data {
    [rdHolderId: string]: Entry[];
  }
  