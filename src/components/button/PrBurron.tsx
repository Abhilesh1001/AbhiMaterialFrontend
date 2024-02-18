import React from 'react'


interface ButtonProps {
    label : string,
    onClick? : () => void,
    clsaatype? :string
    disable?:string
    buttomType? : string 
    css?:string
}

const PrBurron = (props:ButtonProps) => {
  return (
    <button className={`btn btn-secondary mx-2 dark:bg-slate-800 text-gray-800 bg-sky-300 dark:text-gray-50 h-8 text-sm ${props.css}`} type={`${props.buttomType==='submit' ?'submit' :'button' }`} onClick={props.onClick}  >{props.label}</button>
  )
}

export default PrBurron