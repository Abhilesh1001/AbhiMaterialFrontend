import React from 'react'
import PrBurron from '../button/PrBurron';
import { useLoan } from '@/hooks/loan/useLoan'
import Loading from '../loading/Loading';
import TextInput from '../dummyinput/TextInput';


const LoanPersonCreate = () => {

    const { setEnabled, mutation, data, vid, setVid, loanholder, handleSubmit, setLoanholder, handleKeyDown, handleCreate, handleChange, handleUPdate, change, sfcreate, mutationUpdate, updateData } = useLoan()
  return (
         <>
                        <div>
                            <PrBurron onClick={handleCreate} label={'Create'} />
                            <PrBurron onClick={handleChange} label={'Change'} />
                            {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}
                        </div>
                        <div>
                        </div>
                        {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{data !== undefined && data.data.msg}Loan Holder Id{data !== undefined && data.data.data.loan_id}</div></div>}</div>}


                        {/* updata  */}

                        {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData !== undefined && updateData.data.msg} RD Holder Id {updateData !== undefined && updateData.data.data.loan_id}</div></div>}</div>}



                        {change === 'create' && <><label htmlFor="Vendor" className="form-label text-sm">Loan Holder Id</label>

                            <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="form-control  text-sm  w-full" /></>}


                        {sfcreate === 'create' && <form onSubmit={handleSubmit}>
                            <label htmlFor="Name" className="form-label text-sm">Name</label>
                            <TextInput value={loanholder.name} onChange={(e) => setLoanholder({ ...loanholder, name: e.target.value })} />
                            <label htmlFor="Phone" className="form-label text-sm ">Phone No</label>
                            <TextInput value={loanholder.phone_no} onChange={(e) => setLoanholder({ ...loanholder, phone_no: e.target.value })} />

                            <label htmlFor="Email" className="form-label text-sm">Email</label>
                            <TextInput type={'email'} value={loanholder.email} onChange={(e) => setLoanholder({ ...loanholder, email: e.target.value })} />
                            <label htmlFor="pan" className="form-label text-sm">Pan</label>
                            <TextInput css={'mb-4'} value={loanholder.pan_no} onChange={(e) => setLoanholder({ ...loanholder, pan_no: e.target.value })} />
                            {change !== 'create' && <PrBurron label={'Submit'} buttomType={'submit'} />}
                        </form>}
                        </>
  )
}

export default LoanPersonCreate