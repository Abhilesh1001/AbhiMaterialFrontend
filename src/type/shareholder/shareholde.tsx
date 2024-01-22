

export interface shareholderName {
    Sh_id?: null|number,
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
