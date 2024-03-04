import React, {memo } from 'react'
import ShareholderMenu from './ShareholderMenu'
import ProcumentMenu from './ProcumentMenu'

const Main = () => {
   
    


  return (
    <div className='container'>
        <div className="row">
            <div className="col-sm-6">
                <ProcumentMenu />
            </div>

            <div className="col-sm-6">
                 <ShareholderMenu />
            </div>
        </div>
      
        
    </div>
  )
}

export default memo(Main)