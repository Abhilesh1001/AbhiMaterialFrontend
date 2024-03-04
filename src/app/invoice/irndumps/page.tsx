'use client'
import React,{useState} from 'react'
import PrBurron from '@/components/button/PrBurron'
import Loading from '@/components/loading/Loading'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import {useSelector} from 'react-redux'
import {StateProps} from '@/type/type'
import { soundClick } from '@/sound/sound'
import { irndataType,billDetails,datatype } from '@/type/irn/irn'
import DumyInput from '@/components/dummyinput/DumyInput'
import { vendorType } from '@/type/type'
import {format, parseISO} from 'date-fns'




const IrnDumps = () => {
    const [enable, setEnable] = useState<boolean>(false)
    const {baseurl,authToken} = useSelector((state:StateProps)=>state.counter)

    async function fetchData(){
        const res = await axios.get(`${baseurl}grn/mirocreate`,{
            headers:{
                Authorization:`Bearer ${authToken?.access}`
            }
        })

        setEnable(false)
        return res.data
    }

    const {data,error} =  useQuery({ queryKey: ['irndata'], queryFn: fetchData, enabled: enable,staleTime:1000*4 })
    console.log('data',data)

    const handleClick=()=>{
        soundClick?.play()
        setEnable(true)
    }

     let serialNumber=0
    const tableHead = ['S No','Line No','MRN No','Material No','Material Name','Material Unit','Price','Quantity','Total Price','Material Tax','Total Amount with Tax','Text','Created By','Date','Po No','PR No','GRN NO','Vendor Id','Vendor Name','Deliver Id','Delivery Name','Bill No','Bill Data','Delivery Note']

  return (
    <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
        
         <div className=''>
        <div className='h-3'></div>
            <div className='flex text-gray-50 text-center'>
            <div><PrBurron label='All IRN' onClick={handleClick}/></div>
            {/* <div>{isLoading && <Loading />}</div> */}
           
            </div>

            <div className=' ml-2 mr-2 h-[85vh] overflow-auto text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900 mt-2 bg-sky-500 sm:rounded-lg'>
                        <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                            <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                                <tr >
                                    <th scope="col"></th>
                                    {
                                        tableHead.map((item)=>{
                                            return <th scope="col" key={item}><div className='ml-2 mr-2'>{item}</div></th>
                                        })
                                    }
                                    
                                </tr>
                            </thead>
                            <tbody >
                             {data?.map((item:irndataType,index:number)=>{
                                const newItem  = JSON.parse(item.item_grn)
                                const vendorDetails:vendorType = JSON.parse(item.vendor_address)
                                const DeliveryDetails:vendorType = JSON.parse(item.delivery_address)
                                const billingDetails:billDetails = JSON.parse(item.billing)
                                return newItem.map((itemJson:datatype,indexs:number)=>{    
                                    serialNumber += 1;
                                    
                                    return <tr key={indexs}>
                                        <td></td>
                                        <td><DumyInput indum={serialNumber}/></td>
                                        <td><DumyInput indum={itemJson.irn_line} /></td>
                                        <td><DumyInput indum={item.mir_no} /></td>
                                        <td><DumyInput indum={itemJson.material_no} /></td>
                                        <td><DumyInput indum={itemJson.material_name} /></td>
                                        <td><DumyInput indum={itemJson.material_unit} /></td>
                                        <td><DumyInput indum={itemJson.material_price} /></td>
                                        <td><DumyInput indum={itemJson.material_qty} /></td>
                                        <td><DumyInput indum={itemJson.total_amount} /></td>
                                        <td><DumyInput indum={itemJson.material_tax}/></td>
                                        <td><DumyInput indum={itemJson.total_tax} /></td>
                                        <td><DumyInput indum={itemJson.material_text} /></td>
                                        <td><DumyInput indum={item.user} /></td>
                                        <td><DumyInput indum={format(parseISO(item.time),'dd.MM.yy')} /></td>
                                        <td><DumyInput indum={itemJson.po_no} /></td>
                                        <td><DumyInput indum={itemJson.pr_no} /></td>
                                        <td><DumyInput indum={itemJson.grn_no} /></td>
                                        <td><DumyInput indum={vendorDetails.s_no !==undefined ? vendorDetails.s_no:''  } /></td>
                                        <td><DumyInput indum={vendorDetails.vendor_name} /></td>
                                        <td><DumyInput indum={DeliveryDetails.s_no!==undefined ? DeliveryDetails.s_no:''} /></td>
                                        <td><DumyInput indum={DeliveryDetails.vendor_name} /></td>
                                        <td><DumyInput indum={billingDetails.bill_no} /></td>
                                        <td><DumyInput indum={billingDetails.bill_date} /></td>
                                        <td><DumyInput indum={billingDetails.delivery_note} /></td>
                                    </tr>
                                })

                             })}
                            </tbody>
                        </table>
        </div>
           
        </div>
        </div>
  )
}

export default IrnDumps