'use client'
import React from 'react'
import Loading from '@/components/loading/Loading'

const Vendor = () => {
    const handlekey =(e: React.KeyboardEvent<HTMLInputElement>) =>{
        if (e.key === 'Enter') {
            // Prevent the default behavior (e.g., form submission)
            e.preventDefault();
            // Perform your action here
            console.log('Enter key pressed!');
            // You can call a function or perform any action you need.
            // Example: callFunction();
        }
    }
    // newvwndoe creTION 
    const newVendor = null
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>
        <div className="row my-4">
            <div className="col-sm-6 mt-4">
                <div className='w-full h-10 flex justify-center'>{newVendor && <Loading />}</div>
                <label htmlFor="pname" className="form-label text-sm">Vendor Id</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950'  onKeyDown={handlekey} />
                <label htmlFor="name" className="form-label text-sm">Name</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950' />
                <label htmlFor="name" className="form-label text-sm ">Phone No</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950' />
                <label htmlFor="name" className="form-label text-sm">Vendor Name</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950' />
                <label htmlFor="name" className="form-label text-sm">GST</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950' />
                <label htmlFor="name" className="form-label text-sm">Email</label>
                <input type="text" className='form-control text-sm  dark:text-white dark:bg-slate-950' />
                <button className="btn btn-secondary my-3  bg-sky-500 dark:bg-gray-600  dark:text-gray-50 text-gray-50">Submit</button>
            </div>
            <div className="col-sm-6 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-96">
                    <table className="w-full text-sm mt-4 text-left rtl:text-right text-gray-500 bg-sky-600 dark:text-gray-400">
                        <thead className='text-xs text-gray-50 uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400'>
                            <tr>
                                <th scope="col" className='px-6 py-2'>Vendor Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone No</th>
                                <th scope="col">Vendor Name</th>
                                <th scope="col">GST</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='odd:bg-sky-600 text-gray-50 odd:dark:bg-gray-900 even:bg-sky-400  even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>fjkjfaljkldsfakjfds@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td >Larry the Bird</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor