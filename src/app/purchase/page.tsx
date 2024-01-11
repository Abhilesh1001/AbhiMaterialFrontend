'use client'

// components 
import DumyInput from '@/components/dummyinput/DumyInput'
import { usePr } from '@/hooks/purchaserequest/usePr'
import Aleart from '@/components/alert/Aleart'
import Loading from '@/components/loading/Loading'

import { prsliiceState } from '@/type/type'
import { useSelector, useDispatch } from 'react-redux'
import PrBurron from '@/components/button/PrBurron'
import { usePrPreview } from '@/hooks/purchaserequest/usePrPreview'
import { format } from 'date-fns';


const PurchasePR = () => {
    const { handleChange, handleKeyDown, handleSubmit, handleForm, newPrNo, loadingNewPrCreation } = usePr()
    const { datapr: data,prmaindata } = useSelector((state: prsliiceState) => state.prslicer)
    const {handleUpdate, FormReset,handleDelete,handleView,handlePRView,view,handleChangePr,change,upprno,loadingNewPrUpdate } = usePrPreview()
    console.log(prmaindata)
    let formattedDateString = ''
    if (prmaindata.time) {
        const time = prmaindata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }

    return (
        <div className=' dark:bg-gray-800 bg-sky-600  min-h-screen'>
            <div className='container mt-4 overflow-auto text-nowrap'>
                <form onSubmit={handleSubmit}>
                    <div >
                        <div className='h-2'></div>
                        <label className="form-label font-bold dark:text-gray-50">PR No</label>
                        <div className='' style={{ display: 'flex' }}>
                            <input type="number" onChange={handlePRView} className='form-control h-8 text-sm w-60' />
                            <PrBurron onClick={handleView} label={'View'} />
                            {view ? '':<PrBurron onClick={handleForm} label={'Add Form'} />}
                            {view ? '':change ?<PrBurron onClick={handleUpdate} buttomType={'button'} label={'Update'} />:<PrBurron buttomType={'submit'} label={'Save'} />}
                            <PrBurron onClick={handleChangePr} label={'Change'} />
                            <PrBurron label={'Print'} />
                            <PrBurron onClick={FormReset} label={'Reset'} />
                            {loadingNewPrCreation || loadingNewPrUpdate && <Loading />}
                        </div>
                    </div>
                    <div className='h-[360px] overflow-auto my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-slate-500 text-gray-50 h-10'>
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
                                            <td>
                                                {view ?<DumyInput indum={item.material_no} /> :<input required value={item.material_no !== null ? item.material_no : ''} type="number" onKeyDown={(e) => handleKeyDown(e, index)} onChange={(e) => handleChange(e.target.value, 'material_no', index)} className="form-control  text-sm  w-24" />}
                                            </td>
                                            <td><DumyInput indum={item.material_name} /></td>
                                            <td><DumyInput indum={item.material_unit} /></td>

                                            <td>
                                                {view ?<DumyInput indum={item.material_price} /> :<input required type="number" value={item.material_price !== null ? item.material_price : ''} onChange={(e) => handleChange(e.target.value, 'material_price', index)} className="form-control  text-sm  w-24" />}
                                            </td>
                                            <td>
                                                {view ?<DumyInput indum={item.material_qty} /> : <input required type="number" value={item.material_qty !== null ? item.material_qty : ''} onChange={(e) => handleChange(e.target.value, 'material_qty', index)} className="form-control text-sm w-24" />}
                                            </td>
                                            <td><DumyInput indum={item.total_price} /> </td>
                                            <td>
                                                {view ? <DumyInput indum={item.material_text} />: <div className='flex'><input type="text" value={item.material_text !== null ? item.material_text : ''} onChange={(e) => handleChange(e.target.value, 'material_text', index)} className="form-control  text-sm w-80" /></div>}
                                            </td>
                                            
                                            <td>{view ? '':<PrBurron label={'Delete'} onClick={()=>handleDelete(index)} />} </td>
                                            <td >{prmaindata.user !==null ?<DumyInput indum={prmaindata.user} />: "user"}</td>
                                            <td >{prmaindata.user !==null ?<DumyInput indum={formattedDateString} />: "02-01-2021"}</td>
                                        </tr>
                                    })
                                }


                            </tbody>
                        </table>
                    </div>
                </form>
                {newPrNo!== null && <Aleart label = {'Created'} alertname={'Purchase Request'} newMat={newPrNo} />}
                {upprno!== null && <Aleart label = {'Updated'}  alertname={'Purchase Request'} newMat={upprno} />}
            </div>
        </div>

    )
}

export default PurchasePR