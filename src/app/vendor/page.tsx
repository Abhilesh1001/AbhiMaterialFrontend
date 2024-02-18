'use client'

import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import { vendorType } from '@/type/type'

import DumyInput from '@/components/dummyinput/DumyInput'
import { useVendor } from '@/hooks/vendor/useVendor'


const Vendor = () => {
    
    const {setEnabled,handleUPdate,change,mutation,handleSubmit,vendor,setVendor,newData,vid,setVid,handleChange,handleCreate,handleKeyDown,mutationUpdate,sfcreate} = useVendor()
    console.log(mutation.data,'inside')


    return (
        <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="col-sm-6 mt-4">
                        <div className=''>
                            <PrBurron onClick={handleCreate}  label={'Create'} />
                            <PrBurron onClick={() => setEnabled(true)} label={'View'} />
                            <PrBurron  onClick={handleChange}  label={'Change'} />

                            {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}

                            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg}Material No. {mutation.data !== undefined && mutation.data.data.data.s_no}</div></div>}</div>}

                            {/* updata  */}

                            {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate?.data !== undefined && mutationUpdate.data.data.msg} Material No. {mutationUpdate !== undefined && mutationUpdate.data.data.data.s_no}</div></div>}</div>}

                        </div>

                        {change === 'create' && <><label htmlFor="Material No" className="form-label mb-2 dark:text-gray-50 text-sm">Vendor Id</label>
                            <input type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="form-control mb-2  text-sm dark:text-white dark:bg-slate-950" /></>}

                        {sfcreate == 'create'  && <form onSubmit={handleSubmit}>
                            <label htmlFor="Name" className="form-label text-sm">Name</label>
                            <TextInput value={vendor.name} onChange={(e) => setVendor({ ...vendor, name: e.target.value })} />
                            <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                            <TextInput value={vendor.phone_no === 0 ? null : vendor.phone_no} type={'number'} onChange={(e) => setVendor({ ...vendor, phone_no: Number(e.target.value) })} />
                            <label htmlFor="Vendorname" className="form-label text-sm">Vendor Name</label>
                            <TextInput value={vendor.vendor_name} onChange={(e) => setVendor({ ...vendor, vendor_name: e.target.value })} />
                            <label htmlFor="GST" className="form-label text-sm">GST</label>
                            <TextInput value={vendor.gst} onChange={(e) => setVendor({ ...vendor, gst: e.target.value })} />
                            <label htmlFor="Email" className="form-label text-sm">Email</label>
                            <TextInput type={'email'} value={vendor.email} onChange={(e) => setVendor({ ...vendor, email: e.target.value })} />
                            <label htmlFor="Address" className="form-label text-sm">Address</label>
                            <TextInput css={'mb-4'} value={vendor.address} onChange={(e) => setVendor({ ...vendor, address: e.target.value })} />
                            {change !== 'create' && <PrBurron label={'Submit'} buttomType={'submit'} />}
                        </form>}

                    </div>

                    <div className="col-sm-6 relative text-nowrap overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg  h-96">
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-950 text-gray-50 h-10'>
                                <tr>
                                    <th scope="col" className='px-6 py-2'>Vendor Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone No</th>
                                    <th scope="col">Vendor Name</th>
                                    <th scope="col">GST</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody className=' text-gray-50 text-center'>
                                {newData?.map((items: vendorType) => {
                                    return <tr key={items.s_no}>
                                        <th scope="row"><DumyInput indum={items.s_no !== undefined ? items.s_no : null} /></th>
                                        <td><DumyInput indum={items.name} /></td>
                                        <td><DumyInput indum={items.phone_no} />{ }</td>
                                        <td><DumyInput indum={items.vendor_name} /></td>
                                        <td><DumyInput indum={items.gst} /></td>
                                        <td><DumyInput indum={items.email} /></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Vendor