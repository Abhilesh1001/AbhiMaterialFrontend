
import React from 'react'

interface DumInProps {
    indum : string | null | number |boolean
}


const DumyInput = (props:DumInProps) => {
    return (
        <div className="border border-gray-300 rounded-md w-26 overflow-auto px-2 py-1 text-sm h-8 dark:bg-gray-800 bg-sky-800  dark:border-gray-700">
            <div className="flex justify-center items-center">
                <div
                    className="outline-none w-full text-sm text-gray-50"
                > 
                {props.indum}
                </div>
            </div>
        </div>
    )
}

export default DumyInput