
import React from 'react'
import Loading from '@/components/loading/Loading'
import PrBurron from '@/components/button/PrBurron'
import TextInput from '@/components/dummyinput/TextInput'
import { useRdintrest } from '@/hooks/rd/useRdintrest';
import DumyInput from '../dummyinput/DumyInput';


const Rdintrest = () => {

    const {mutation, setVid, vid, handleSubmit, rdintrest, setrdintrest, handleUPdate, change, handleCreate, handleChange, sfcreate, handleKeyDown, updateData, mutationUpdate,handleKeyDownIntrest } = useRdintrest()

    return (
        <>
            <div className='flex'>
                <PrBurron onClick={handleCreate} label={'Create'} />
                <PrBurron onClick={handleChange} label={'Change'} />
                {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}
            </div>
            <div>
            </div>
            {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />} {mutation.isSuccess && <div><div>{mutation.data !== undefined && mutation.data.data.msg} RD Holder Id {mutation.data !== undefined && mutation.data.data.data.rd_intrest_id}</div></div>}</div>}

          {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{updateData !== undefined && updateData.data.msg} RD Holder Id {mutationUpdate !== undefined && mutationUpdate.data.data.data.rd_intrest_id}</div></div>}</div>}

            {change !== 'create' && <><label htmlFor="Vendor" className="form-label text-sm">RD Holder Id</label>

                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="form-control  text-sm  w-full" /></>}

            {change === 'create' && <><label htmlFor="Vendor" className="form-label text-sm">RD Holder Plan</label>

                <input required value={vid} type="number" onKeyDown={(e) => handleKeyDownIntrest(e)} onChange={(e) => setVid(e.target.value)} className="form-control  text-sm  w-full" /></>}


            {sfcreate === 'create' && <form onSubmit={handleSubmit}>
                <label htmlFor="Name" className="form-label text-sm">Name</label>
                <DumyInput indum={rdintrest.name} />
                <label htmlFor="duration" className="form-label text-sm ">Duration Day</label>
                <TextInput value={rdintrest.duration} type={'number'} onChange={(e) => setrdintrest({ ...rdintrest, duration: Number(e.target.value) })} />

                <label htmlFor="intrestrate" className="form-label text-sm">Intrest Rate</label>
                <TextInput type={'number'} value={rdintrest.intrestrate} onChange={(e) => setrdintrest({ ...rdintrest, intrestrate: Number(e.target.value) })} />
                           
                    <div className='flex'>
                    <input type="checkbox" checked={rdintrest.isactive} defaultChecked onChange={(e)=>setrdintrest({...rdintrest,isactive:e.target.checked})} className="checkbox checkbox-info my-2"  />
                        <label htmlFor="pan" className="form-label text-sm flex justify-center items-center mx-2 my-2">{rdintrest.isactive?"Open" : "Close"}</label>
                    </div>
                        
                <label htmlFor="pan" className="form-label text-sm">Open Date</label>
                <TextInput  type={'date'} value={rdintrest.start_date} onChange={(e) => setrdintrest({ ...rdintrest, start_date: e.target.value })} />

                <label htmlFor="pan" className="form-label text-sm">Close Date</label>
                <TextInput css={'mb-4'}   type={'date'} value={rdintrest.closing_date} onChange={(e) => setrdintrest({ ...rdintrest, closing_date: e.target.value })} />
                {change !== 'create' && <PrBurron label={'Submit'} buttomType={'submit'} />}
            </form>}
        </>
    )
}

export default Rdintrest