'use client'
// tyscript 
import { statePropsMaterial,StateProps } from '@/type/type'
import { QueryResponse } from '@/type/material/materia-type'

// dependencies 
import { useQuery, useMutation } from '@tanstack/react-query'
import Aleart from '@/components/alert/Aleart'
import Loading from '@/components/loading/Loading'

// hooks 
import { useMaterial } from '@/hooks/material/useMaterial'
import { useSelector } from 'react-redux'

// components 
import TextInput from '@/components/dummyinput/TextInput'


const page = () => {

    const {authToken} = useSelector((state:StateProps)=>state.counter)
    const { fetchData, handleSubmit, setDate, data,loadingNewCreation,newMatNo } = useMaterial()

    const { data: matdata } = useQuery<QueryResponse>({ queryKey: ['matData',newMatNo,authToken], queryFn: fetchData })
    return (
        <div className=' dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className='container'>
                <div className="row my-4">
                    <div className="col-sm-6">
                        <div className='mt-4 w-full flex justify-center h-9'>{loadingNewCreation && <Loading />}</div>
                      
                        <label htmlFor="Material No" className="form-label mb-2 dark:text-gray-50 text-sm">Material No</label>
                        <input type="number" className="form-control mb-2  text-sm dark:text-white dark:bg-slate-950" />
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="material name" className='dark:text-gray-50 form-label text-sm'>Material Name</label>

                            <TextInput onChange={(e) => setDate({ ...data, material_name: e.target.value })} value={data.material_name} />

                            <select onChange={(e) => setDate({ ...data, material_group: e.target.value })} value={data.material_group} required className="form-select form-select-lg mb-3 my-4  text-xs dark:text-white dark:bg-slate-950" aria-label="Large select example">
                                {/* <option value='material_group' selected>Material Group</option> */}
                                <option value="electrical">Electrical</option>
                                <option value="instrumentation">Instrumentation</option>
                                <option value="mechanical">Mechanical</option>
                                <option value="civil">Civil</option>
                            </select>
                            <select onChange={(e) => setDate({ ...data, unit: e.target.value })}  value={data.unit} required className="form-select form-select-lg mb-3 my-4 text-xs dark:text-white dark:bg-slate-950" aria-label="Large select example">
                                <option value="KG">KG</option>
                                <option value="number">NOS</option>
                                <option value="packet">Packet</option>
                                <option value="box">BOX</option>
                                <option value="gram">GRAM</option>
                            </select>
                            <button type='submit' className="btn btn-secondary bg-sky-500 dark:bg-gray-600  dark:text-gray-50 text-gray-50">Submit</button>
                        </form>
                    </div>
                    <div className="col-sm-6 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-600 sm:rounded-lg max-h-screen h-full">
                        <table className="w-full text-sm mt-4 text-left rtl:text-right text-gray-500 bg-sky-600 dark:text-gray-400">
                            <thead className='text-xs text-gray-50 uppercase bg-sky-700 dark:bg-gray-700 dark:text-gray-400'>
                                <tr>
                                    <th className='px-6 py-1' scope="col">Material Code</th>
                                    <th className='px-6 py-1' scope="col">Material Name</th>
                                    <th className='px-6 py-1' scope="col">Material Group</th>
                                    <th className='px-6 py-1' scope="col">Unit</th>
                                    <th className='px-6 py-1' scope="col">User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    matdata?.length != undefined && matdata?.length > 0 && matdata?.map(({ s_no, material_name, material_group, unit, user }) => {
                                        return <tr className='odd:bg-sky-600 text-gray-50 odd:dark:bg-gray-900 even:bg-sky-400  even:dark:bg-gray-800 border-b dark:border-gray-700' key={s_no}>
                                            <th className='px-6 py-1' scope="row">{s_no}</th>
                                            <td className='px-6 py-1'>{material_name}</td>
                                            <td className='px-6 py-1'>{material_group}</td>
                                            <td className='px-6 py-1'>{unit}</td>
                                            <td className='px-6 py-1'>{user}</td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


            {/* dismissable Alert  */}

            <Aleart newMat = {newMatNo} alertname={'Material'} />

        </div>
    )
}

export default page