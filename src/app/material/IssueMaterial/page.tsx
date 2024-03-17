'use client'
import {useSelector,useDispatch} from 'react-redux'
import PrBurron from '@/components/button/PrBurron'
import MaterialIssueTable from '@/components/Materialssue/MaterialIssueTable'
import { useIsMaterial } from '@/hooks/material/useIssueMatrial'
import Loading from '@/components/loading/Loading'
import {matState} from '@/type/material/materia-type'

const Vendor = () => {

  const {miview} =  useSelector((state:matState)=>state.matSlice)  
 
  const {handleClick,handleSubmit,mutation,hasTrueValue,handleViewClick,handleIssuechange,handleReset,handleMateriIssueView,view,handleUpdate,change,mutationUpdata} = useIsMaterial()
  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-10 mt-4">
                <div>
                  <input className='rounded p-1 dark:text-gray-950 text-gray-900 ml-2' value={miview===null || miview===0 ?'':miview}  type="number" onChange={handleMateriIssueView} />

                   <PrBurron onClick={handleViewClick}  label={'View'} />

                   <PrBurron  onClick={handleIssuechange} label={'Change'}/>

                   {view!=='change' ? '': <PrBurron onClick={handleClick} label={'Add Form'}/>}

                   { change!=='change' ? <> {!hasTrueValue ? <button className="btn btn-success mx-2 dark:bg-green-400 text-gray-800 bg-green-400 btn-sm  dark:text-gray-50 h-8 text-sm" type='button' onClick={handleUpdate} >Update</button>: <PrBurron  buttomType={'button'} label={'Update'} />}</>  :'' }

                   {change==='change'?<>{!hasTrueValue ?<>{view==='change' && <button className="btn btn-success mx-2 dark:bg-green-400 text-gray-800 bg-green-400  dark:text-gray-50 h-8 text-sm btn-sm" type='button' onClick={handleSubmit} >Save</button>}</>:<PrBurron label='Save'/>}</>:''}
                   
                   <PrBurron  onClick={handleReset} label={'Reset'}/> 
                    {mutation.isPending && <Loading />}
                    {mutationUpdata.isPending && <Loading />}
                    {mutation.isSuccess && <>{mutation.data.data.msg} Issue No. {mutation.data.data.data.issue_no}</>}
                    {mutation.isError && mutation.error.response.data.errors.detail}
                    {mutationUpdata.isSuccess && <>{mutationUpdata.data.data.msg} Issue No. {mutationUpdata.data.data.data.issue_no}</>}
                    {mutation.isError && mutation.error.response.data.errors.detail}
                </div>
                <div className='w-full h-4 flex justify-center'></div>
                <MaterialIssueTable viewdata={view} changeData={change}  />
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor