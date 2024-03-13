'use client'

// components 
import DumyInput from '@/components/dummyinput/DumyInput'
import Aleart from '@/components/alert/Aleart'
import Loading from '@/components/loading/Loading'
// customhooks 
import { usePr } from '@/hooks/purchaserequest/usePr'
import { usePrPreview } from '@/hooks/purchaserequest/usePrPreview'
// redux /dependencies 
import { useSelector } from 'react-redux'
import { prsliiceState } from '@/type/type'
import PrBurron from '@/components/button/PrBurron'
import { format } from 'date-fns';
import { MdDelete } from "react-icons/md";


const PurchasePR = () => {
    const { handleChange, handleKeyDown, handleSubmit, handleForm, loadingNewPrCreation, handleCloseAlert, mutation } = usePr()
    const { datapr: data, prmaindata, hiddenalert,newchang } = useSelector((state: prsliiceState) => state.prslicer)
    const { handleUpdate, FormReset, handleDelete, handleView, handlePRView, view, handleChangePr, change, mutationUpdate } = usePrPreview()

    let formattedDateString = ''
    if (prmaindata.time) {
        const time = prmaindata.time
        const dateObject = new Date(time);
        formattedDateString = format<Date>(dateObject, 'dd-MM-yyyy')
    }

    const renderTableHeader = () => {
        const tableHead = ['', 'S.No', 'Line No', 'Material No', 'Material Name', 'Material Unit', 'Price', 'Quantity', 'Total Price', 'Text', 'Delete', 'Created By', 'Date', 'Po No', 'PR Line']
        return (
            <tr>
                {tableHead.map((item, index) => (
                    <th key={index}>
                        <div className='ml-2 mr-2 flex'>{item}</div>
                    </th>
                ))}
            </tr>
        );
    };

    return (
        <div className=' dark:bg-gray-800 bg-sky-600  min-h-screen'>
            <div className='container mt-6 overflow-auto text-nowrap'>
                <div className='h-6 p-4 flex flex-col'>
                    {hiddenalert !== "hidden" && <div>
                        {newchang=='change' && <div> {mutation.isSuccess && <><Aleart label={'Created'} alertname={'Purchase Request'} onClose={handleCloseAlert} newMat={mutation.data?.data?.data?.pr_no} /></>}</div>}
                        {newchang!=='change' && <div>{mutationUpdate.isSuccess && <><Aleart label={'Updated'} alertname={'Purchase Request'} onClose={handleCloseAlert} newMat={mutationUpdate.data?.data?.data?.pr_no} /></>}</div>}
                </div>}

                </div>

                <form onSubmit={handleSubmit}>
                    <div className='overflow-auto' >
                        <div className='h-2'></div>
                        <label className="form-label font-bold dark:text-gray-50">PR No</label>
                        <div className='' style={{ display: 'flex' }}>
                            <input type="number" onChange={handlePRView} className='form-control h-8 text-sm w-60' />
                            <PrBurron onClick={handleView} label={'View'} />
                            {view ? '' : <PrBurron onClick={handleForm} label={'Add Form'} />}
                            {view ? '' : change!=='change' ? <PrBurron onClick={handleUpdate} buttomType={'button'} label={'Update'} /> : <PrBurron buttomType={'submit'} label={'Save'} />}
                            <PrBurron onClick={handleChangePr} label={'Change'} />
                            <PrBurron label={'Print'} />
                            <PrBurron onClick={FormReset} label={'Reset'} />
                            {mutation.isPending || mutationUpdate.isPending && <Loading />}
                            {data[0].pr_no !== null && <div className='flex justify-end w-full text-gray-50'>Purchase Request :<div className='text-green-400'>{data[0].pr_no}</div> </div>}
                        </div>
                    </div>
                    <div className='h-[360px] overflow-auto my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                                {renderTableHeader()}
                            </thead>
                            <tbody >
                                {
                                    data?.map((item, index) => {
                                        return <tr key={index}>
                                            <th><input type="checkbox" /></th>
                                            <th><DumyInput indum={index + 1} /> </th>
                                            <th><DumyInput indum={item.line_no} /> </th>
                                            <td>
                                                {view ? <DumyInput indum={item.material_no} /> : <>{item.po_no !== null ? <DumyInput indum={item.material_no} /> : <input required value={item.material_no !== null ? item.material_no : ''} type="number" onKeyDown={(e) => handleKeyDown(e, index)} onChange={(e) => handleChange(e.target.value, 'material_no', index)} className="form-control   text-sm  w-24" />}</>}
                                            </td>
                                            <td><DumyInput indum={item.material_name} /></td>
                                            <td><DumyInput indum={item.material_unit} /></td>

                                            <td>
                                                {view ? <DumyInput indum={item.material_price} /> : <>{item.po_no !== null ? <DumyInput indum={item.material_price} /> : <input required type="number" value={item.material_price !== null ? item.material_price : ''} onChange={(e) => handleChange(e.target.value, 'material_price', index)} className="form-control  text-sm  w-24" />}</>}
                                            </td>
                                            <td>
                                                {view ? <DumyInput indum={item.material_qty} /> : <>{item.po_no !== null ? <DumyInput indum={item.material_qty} /> : <input required type="number" value={item.material_qty !== null ? item.material_qty : ''} onChange={(e) => handleChange(e.target.value, 'material_qty', index)} className="form-control text-sm w-24" />}</>}
                                            </td>
                                            <td><DumyInput indum={item.total_price} /> </td>
                                            <td>
                                                {view ? <DumyInput indum={item.material_text} /> : <>{item.po_no !== null ? <DumyInput indum={item.material_text} /> : <input type="text" value={item.material_text !== null ? item.material_text : ''} onChange={(e) => handleChange(e.target.value, 'material_text', index)} className="form-control  text-sm w-80" />}</>}
                                            </td>

                                            <td>{view ? '' : <>{item.po_no !== null ? '' : <MdDelete className='text-2xl w-full text-red-500 cursor-pointer' onClick={() => handleDelete(index)} />}</>} </td>
                                            <td >{prmaindata.user !== null ? <DumyInput indum={prmaindata.user} /> : "user"}</td>
                                            <td >{prmaindata.user !== null ? <DumyInput indum={formattedDateString} /> : ""}</td>
                                            <td >{<DumyInput indum={item.po_no} />}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </form>

            </div>
        </div>

    )
}

export default PurchasePR