'use client'
import { usePoview } from '@/hooks/purchseorder/usePoview'
import {posliiceState,datatype} from '@/type/type'
import {useSelector} from 'react-redux'



const Home = () => {

  const {data,poview,podata} = useSelector((state:posliiceState)=>state.poslicer)
  const {handleViewClick}  = usePoview()
  console.log(data)


  return (
    <div className='container mt-14' style={{ width: '210mm', height: '297mm' }}>
      <div className="row">
        <div className="col-sm-8">
          <div className="font-bold text-2xl text-blue-600">Mayroor Studio Limited.</div>
          <div>Thana Road Maharajganj Siwan Bihar</div>
        </div>
        <div className="col-sm-4">
          <div className=" text-blue-400 text-2xl">Purchase Order</div>
          <div>Date :</div>
          <div>PO NO:  </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="bg-blue-500">Vendor</div>
          Address
        </div>
        <div className="col-sm-6">
          <div className="bg-blue-500">Ship To</div>
          Address
        </div>

      </div>

      <div className="row">
        <div className="col-sm-6">
          <div className="bg-blue-500 border border-blue-500">Description</div>


        </div>
        <div className="col-sm-2">
          <div className="bg-blue-500 border border-blue-500">Qty</div>
        </div>
        <div className="col-sm-2">
          <div className="bg-blue-500 border border-blue-500">Unit Price</div>
        </div>
        <div className="col-sm-2">
          <div className="bg-blue-500 border border-blue-500">Total</div>
        </div>
      </div>





    </div>
  )
}

export default Home