export interface matType{
    mi_line: null|number
    material_no:null|number,
    material_name:string,
    material_unit:string,
    material_qty:number|null,
    material_issue :null
}
export interface dataTypeMatIssue {
    matData : matType[]
}

export interface matState {
    matSlice : dataTypeMatIssue
}