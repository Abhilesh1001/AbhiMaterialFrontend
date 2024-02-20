export interface matType{
    mi_line: null|number
    material_no:null|number,
    material_name:string,
    material_unit:string,
    material_qty:number|null,
    material_issue :null|number 
    material_remarks:string,
}
export interface dataTypeMatIssue {
    matData : matType[],
    orignalData : matType[],
    totalQuantity :matType[],
    miview:null|number 
}

export interface matState {
    matSlice : dataTypeMatIssue
}
