'use client'
// tyscript 


// dependencies 
import PrBurron from '@/components/button/PrBurron'
import Loading from '@/components/loading/Loading'

// hooks 
import { useMaterial } from '@/hooks/material/useMaterial'
// components 
import MaterialDisplaytable from './MaterialDisplaytable'
import TextInput from '@/components/dummyinput/TextInput'
interface matType {
    s_no: number | null,
    material_name: string,
    material_group: string,
    unit: string,
    user: string,
}

const page = () => {

    const { handleSubmit, setDate, data, handleUPdate, handleCreate, handleChange, change, mutation, handleKeyDown, setVid, mutationUpdate, sfcreate } = useMaterial()
    console.log(mutation.error,'mutationeror')
    return (
        <div className=' dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className='container'>

                <div className="row my-4">
                    <div className="col-sm-6 my-4">
                        <PrBurron onClick={handleCreate} label={'Create'} />
                        <PrBurron onClick={handleChange} label={'Change'} />
                        {change === 'create' && <PrBurron onClick={handleUPdate} label={'Update'} />}

                        {change !== 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutation.isPending && <Loading />}{mutation.isSuccess && <div><div>{mutation?.data !== undefined && mutation.data.data.msg}Material No. {mutation.data !== undefined && mutation.data.data.data.s_no}</div></div>}</div>}

                        {/* updata  */}

                        {change === 'create' && <div className='w-full h-4 flex justify-center my-4'>{mutationUpdate.isPending && <Loading />} {mutationUpdate.isSuccess && <div><div>{mutationUpdate?.data !== undefined && mutationUpdate.data.data.msg} Material No. {mutationUpdate !== undefined && mutationUpdate.data.data.data.s_no}</div></div>}</div>}


                        {change === 'create' && <><label htmlFor="Material No" className="form-label mb-2 dark:text-gray-50 text-sm">Material No</label>
                            <input type="number" onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setVid(e.target.value)} className="form-control mb-2  text-sm dark:text-white dark:bg-slate-950" /></>}

                        {sfcreate == 'create' && <form onSubmit={handleSubmit}>
                            <label htmlFor="material name" className='dark:text-gray-50 form-label text-sm'>Material Name</label>

                            <TextInput onChange={(e) => setDate({ ...data, material_name: e.target.value })} value={data.material_name} />

                            <label htmlFor="Material No" className="form-label dark:text-gray-50 text-sm">Material Group</label>
                            <select onChange={(e) => setDate({ ...data, material_group: e.target.value })} value={data.material_group} required className="form-select form-select-lg text-xs dark:text-white dark:bg-slate-950" aria-label="Large select example">
                                {/* <option value='material_group' selected>Material Group</option> */}
                                <option value="electrical">Electrical</option>
                                <option value="instrumentation">Instrumentation</option>
                                <option value="mechanical">Mechanical</option>
                                <option value="civil">Civil</option>
                            </select>
                            <label htmlFor="Material No" className="form-label dark:text-gray-50 text-sm">Material Unit</label>
                            <select onChange={(e) => setDate({ ...data, unit: e.target.value })} value={data.unit} required className="form-select form-select-lg mb-3 text-xs dark:text-white dark:bg-slate-950" aria-label="Large select example">
                                <option value="KG">KG</option>
                                <option value="number">NOS</option>
                                <option value="packet">Packet</option>
                                <option value="box">BOX</option>
                                <option value="gram">GRAM</option>
                            </select>
                            {change !== 'create' && <button type='submit' className="btn btn-info mx-2 btn-sm dark:btn-neutral">Submit</button>}
                        </form>}
                    </div>

                    <MaterialDisplaytable />
                </div>
            </div>

        </div>
    )
}

export default page