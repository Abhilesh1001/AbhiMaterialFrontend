'use client'

import PrBurron from '@/components/button/PrBurron'
import MaterialIssueTable from '@/components/Materialssue/MaterialIssueTable'
import { useIsMaterial } from '@/hooks/material/useIssueMatrial'



const Vendor = () => {

    const {handleClick} = useIsMaterial()
    


  return (
    <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
        <div className='container'>  
        <div className="row my-4">
            <div className="col-sm-8 mt-4">
                <div>
                   <PrBurron  label={'Create'}/>
                   <PrBurron label={'View'} />
                   <PrBurron  label={'Change'}/>
                   <PrBurron onClick={handleClick} label={'Add Form'}/>
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