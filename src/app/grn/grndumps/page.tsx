"use client"
import React, { useState, memo, useEffect } from 'react'
import axios from 'axios'
import PrBurron from '@/components/button/PrBurron'
import { useSelector } from 'react-redux'
import { StateProps } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'
import { format, parseISO } from 'date-fns'
import { grndataType, vendorType, datatype, billDetails } from '@/type/grn/grntype'
import { useQuery } from '@tanstack/react-query'
import Loading from '@/components/loading/Loading'
import { soundClick, soundSsuccess, soundError } from '@/sound/sound'
import { CSVLink, CSVDownload } from "react-csv";

interface MyError {
  response?: {
    data?: {
      errors?: {
        detail?: string;
      };
    };
  };
}

const Page = () => {
  const { baseurl, authToken } = useSelector((state: StateProps) => state.counter)
  const [enableData, setEnable] = useState(false)

  const mainData = []



  const fetchData = async () => {
    console.log('ok')
    const res = await axios.get(`${baseurl}grn/grncreated`, {
      headers: {
        Authorization: `Bearer ${authToken?.access}`
      }
    })
    setEnable(false)
    return res.data
  }


  const { data, error, isError, isLoading } = useQuery({ queryKey: ['allGRn'], queryFn: fetchData, enabled: enableData })
  console.log(data)

  

 

  useEffect(() => {
    if (isError) {
      setEnable(false);
    }
  }, [isError]);

  const handleClick = async () => {
    soundClick?.play()
    setEnable(true)
  }
  let serialNumber = 0;

  
  let csvData:any=[]
   if(data){
    const newData = data?.map((item: grndataType) => {
      const newItem = JSON.parse(item.item_po)
      const vendorDetails: vendorType = JSON.parse(item.vendor_address)
      const DeliveryDetails: vendorType = JSON.parse(item.delivery_address)
      const billingDetails: billDetails = JSON.parse(item.billing)
      return newItem.map((itemJson: datatype, indexs: number)=>{
               return [itemJson.grn_line,item.grn_no,itemJson.material_no,itemJson.material_name,itemJson.material_unit,itemJson.material_price,itemJson.material_qty,itemJson.total_amount,itemJson.material_tax,itemJson.total_tax,itemJson.material_text,item.user,item.time,itemJson.po_line,itemJson.po_no,itemJson.line_no,itemJson.pr_no,vendorDetails.s_no,vendorDetails.name,DeliveryDetails.s_no,DeliveryDetails.name,billingDetails.bill_no,billingDetails.bill_date,billingDetails.delivery_note,billingDetails.transporter_name,billingDetails.way_bill]
      })
    })

    csvData = [
      ["GRN Line", "GRN No", 'Material No', 'Material Name', 'Material Unit', 'Price', 'Qty', 'Total Price', 'Material Tax', 'Total Amount with Tax', 'Text', 'created by', 'Date', 'Po line', 'Po no', 'PR Line', 'PR no', 'Vendor Id', 'Vendor Name', 'Delivery Id', 'Delivery Name', 'Bill No', 'Bill Date', 'Bill Note', 'Transporter','Way Bill no'],
      ...newData?.flat()
    ];

   }


  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
      <div></div>
      <div className=' container'>
        <div className='h-3'></div>
        <div className='flex text-gray-50 text-center'>
          <div className='bg-gray-900 pt-1 pb-1 pl-2 pr-2 text-sm rounded hover:bg-slate-800 drop-shadow-sm border-white shadow-sm border-1'><CSVLink filename={'my-file.csv'}  data={csvData}>Export Excel</CSVLink></div>
          <div><PrBurron label='All GRN' onClick={handleClick} /></div>
          <div>{isLoading && <Loading />}</div>
          <div>{(error as MyError)?.response?.data?.errors?.detail}</div>
        </div>

      </div>

      <div className=' ml-2 mr-2 h-[85vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
          <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
            <tr >
              <th scope="col"></th>
              <th scope="col"><div className='ml-2 mr-2'>S.No</div></th>
              <th scope="col"><div className='ml-2 mr-2'>GRN Line</div></th>
              <th scope="col"><div className='ml-2 mr-2'>GRN No.</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Material No</div></th>
              <th scope="col" ><div className='ml-2 mr-2'>Material Name</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Material Unit</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Price</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Quantity</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Total Price</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Material Tax</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Total Amount with Tax</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Text</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Created By</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Date</div></th>
              <th scope="col"><div className='ml-2 mr-2'>PO Line</div></th>
              <th scope="col"><div className='ml-2 mr-2'>PO No</div></th>
              <th scope="col"><div className='ml-2 mr-2'>PR line</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Pr No</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Vendor Id</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Vendor Name</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Delivery Id</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Delivery Name</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Bill No.</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Bill Date</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Bill Note</div></th>
              <th scope="col"><div className='ml-2 mr-2'>Transporter</div></th>
            </tr>
          </thead>
          <tbody >
            {data?.map((item: grndataType, index: number) => {
              const newItem = JSON.parse(item.item_po)
              const vendorDetails: vendorType = JSON.parse(item.vendor_address)
              const DeliveryDetails: vendorType = JSON.parse(item.delivery_address)
              const billingDetails: billDetails = JSON.parse(item.billing)
              return newItem.map((itemJson: datatype, indexs: number) => {
                serialNumber += 1;

                return <tr key={indexs}>
                  <td></td>
                  <td><DumyInput indum={serialNumber} /></td>
                  <td><DumyInput indum={itemJson.grn_line} /></td>
                  <td><DumyInput indum={item.grn_no} /></td>
                  <td><DumyInput indum={itemJson.material_no} /></td>
                  <td><DumyInput indum={itemJson.material_name} /></td>
                  <td><DumyInput indum={itemJson.material_unit} /></td>
                  <td><DumyInput indum={itemJson.material_price} /></td>
                  <td><DumyInput indum={itemJson.material_qty} /></td>
                  <td><DumyInput indum={itemJson.total_amount} /></td>
                  <td><DumyInput indum={itemJson.material_tax} /></td>
                  <td><DumyInput indum={itemJson.total_tax} /></td>
                  <td><DumyInput indum={itemJson.material_text} /></td>
                  <td><DumyInput indum={item.user} /></td>
                  <td><DumyInput indum={format(parseISO(item.time), 'dd.MM.yy HH.mm.ss')} /></td>
                  <td><DumyInput indum={itemJson.po_line} /></td>
                  <td><DumyInput indum={itemJson.po_no} /></td>
                  <td><DumyInput indum={itemJson.pr_no} /></td>
                  <td><DumyInput indum={itemJson.line_no} /></td>
                  <td><DumyInput indum={vendorDetails.s_no !== undefined ? vendorDetails.s_no : ''} /></td>
                  <td><DumyInput indum={vendorDetails.vendor_name} /></td>
                  <td><DumyInput indum={DeliveryDetails.s_no !== undefined ? DeliveryDetails.s_no : ''} /></td>
                  <td><DumyInput indum={DeliveryDetails.vendor_name} /></td>
                  <td><DumyInput indum={billingDetails.bill_no} /></td>
                  <td><DumyInput indum={billingDetails.bill_date} /></td>
                  <td><DumyInput indum={billingDetails.delivery_note} /></td>
                  <td><DumyInput indum={billingDetails.transporter_name} /></td>
                </tr>
              })

            })}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default memo(Page)