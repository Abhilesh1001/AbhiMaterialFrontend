import React from 'react'
import axios from 'axios'


// interface dataProps {
//     data : {
//         material_no : number |null,
//         material_name : string,
//         material_unit : string,
//         material_qty: string,
//     }
// }


const Page = () => {
   


  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6' >
        <div className='h-3'></div>
    <div className=' ml-2 mr-2 h-[87vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
            <tr >
                <th scope="col"><div className='ml-2 mr-2'>S.No</div></th>
                <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                <th scope="col"><div className='ml-2 mr-2'>Material Name</div></th>
                <th scope="col"><div className='ml-2 mr-2'>Material Qty</div></th>
                <th scope="col" ><div className='ml-2 mr-2'>Materil Unit</div></th>
            </tr>
        </thead>
       
    </table>
</div>
</div>
  )
}


// export async function getServerSideProps() {
//     // Fetch data from external API
//     const res =  await axios.get('http://127.0.0.1:8000/grn/materialstock')
//     const data =  res.data
//     // Pass data to the page via props
//     return { props: { data } }
//   }

export default Page