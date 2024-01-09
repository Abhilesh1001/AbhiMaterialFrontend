'use client'

// components 
import DumyInput from '@/components/dummyinput/DumyInput'
import Aleart from '@/components/alert/Aleart'
import Loading from '@/components/loading/Loading'

// hooks 
import { usePr } from '@/hooks/purchaserequest/usePr'

const PurchasePR = () => {
    const { handleChange, handlePRView, data, handleKeyDown, handleSubmit, handleForm,newPrNo,loadingNewPrCreation } = usePr()
    return (
        <div className=' dark:bg-gray-800 bg-sky-600 min-h-[500px]'>
            <div className='container mt-4 overflow-auto text-nowrap'>
                <form onSubmit={handleSubmit}>
                    <div >
                        <div className='h-2'></div>
                        <label className="form-label font-bold dark:text-gray-50">PR No</label>
                        <div className='' style={{ display: 'flex' }}>
                            <input type="text" onChange={handlePRView} className='form-control h-8 text-sm w-60' />
                            <button className="btn btn-secondary mx-2 dark:bg-slate-400  text-gray-800 bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>View</button>
                            <button className="btn btn-secondary mx-2 dark:bg-slate-400 text-gray-800   bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button' onClick={handleForm}>Add Form</button>
                            <button className="btn btn-success mx-2 dark:bg-slate-400 text-gray-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='submit' >Save</button>
                            <button className="btn btn-primary mx-2 dark:bg-slate-400 text-gray-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Change</button>
                            <button className="btn btn-warning mx-2 dark:bg-slate-400 text-gray-800  bg-sky-300 dark:text-gray-50 h-8 text-sm" type='button'>Print</button>
                            {loadingNewPrCreation && <Loading />}
                        </div>
                    </div>
                    <div className='h-[350px] overflow-auto my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-20 bg-sky-800 dark:bg-slate-500 text-gray-50 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    <th scope="col">S.No</th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
                                    <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
                                    <th scope="col"><div className='ml-2 mr-2'>Material Unit</div></th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Text</th>
                                    <th scope="col">Delete</th>
                                    <th scope="col">Created By</th>
                                    <th scope="col">Date</th>

                                </tr>
                            </thead>
                            <tbody >
                                {
                                    data?.map((item, index) => {
                                        return <tr key={index}>
                                            <th><input type="checkbox" /></th>
                                            <th><DumyInput indum={index + 1} /> </th>
                                            <td><input required value={item.material_no!==null?item.material_no:''} type="number" onKeyDown={(e) => handleKeyDown(e, index)} onChange={(e) => handleChange(e.target.value, 'material_no', index)} className="form-control  text-sm  w-24" /></td>
                                            <td>
                                                <DumyInput indum={item.material_name} />
                                            </td>
                                            <td>
                                                <DumyInput indum={item.material_unit} />
                                            </td>
                                            <td><input required type="number" value={item.material_price!==null?item.material_price:''} onChange={(e) => handleChange(e.target.value, 'material_price', index)} className="form-control  text-sm  w-24" /></td>
                                            <td><input required type="number" value={item.material_qty!==null?item.material_qty:''}  onChange={(e) => handleChange(e.target.value, 'material_qty', index)} className="form-control text-sm w-24" /></td>
                                            <td>
                                                <DumyInput indum={item.total_price} />
                                            </td>
                                            <td><div className='flex'><input required type="text" value={item.material_text!==null?item.material_text:''}  onChange={(e) => handleChange(e.target.value, 'material_text', index)} className="form-control  text-sm w-80" /></div></td>
                                            <td><button className="btn btn-danger text-black  text-sm" type='button'>Delete</button></td>
                                            <td >User Name</td>
                                            <td >02-01-2021</td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </form>
                {newPrNo !== null && <Aleart alertname={'Purchase Order'} newMat={newPrNo} />}
            </div>
        </div>

    )
}

export default PurchasePR