import React from 'react'


interface propsType {
    newMat: null | number,
    alertname: string
    label? : string, 
}

const Aleart = (props: propsType) => {
    const handlClick = () => {
        console.log('ok')
    }
    return (
        <div className="flex items-center p-2 ml-10 mr-10 mb-4 w-[90%] bg-sky-500 h-8 text-sm  rounded-lg dark:bg-gray-700 dark:text-gray-50 text-gray-50 ">
            <div className='flex w-full justify-between'>
                <div className='flex'>
                    <div>{props.alertname} {props.label} {props.alertname} no. </div>
                    <div className='text-green-400' > {props.newMat}</div>
                </div>

                <div className=''>
                    <button onClick={handlClick} >Close</button>
                </div>

            </div>

        </div>
    )
}

export default Aleart