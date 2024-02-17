'use client'

import PrBurron from '@/components/button/PrBurron'
import MaterialIssueTable from '@/components/Materialssue/MaterialIssueTable'
import { useIsMaterial } from '@/hooks/material/useIssueMatrial'
import Loading from '@/components/loading/Loading'

const Vendor = () => {

    const {handleClick,handleSubmit,mutation,hasTrueValue} = useIsMaterial()
    

  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-10 mt-4">
                <div>
                   <PrBurron onClick={handleClick} label={'Add Form'}/>
                   <PrBurron  label={'Create'}/>
                   <PrBurron label={'View'} />
                   <PrBurron  label={'Change'}/>
                   {!hasTrueValue ? <button className="btn btn-success mx-2 dark:bg-green-400 text-gray-800 bg-green-400  dark:text-gray-50 h-8 text-sm" type='button' onClick={handleSubmit} >Save</button>:<PrBurron label='Save'/>}
                   <PrBurron  label={'Reset'}/>
                    {mutation.isPending && <Loading />}
                    {mutation.isSuccess && <>{mutation.data.data.msg} Issue No. {mutation.data.data.data.issue_no}</>}
                    {mutation.isError && mutation.error.response.data.errors.detail}
                </div>
                <div className='w-full h-4 flex justify-center'></div>
                <MaterialIssueTable  />
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Vendor