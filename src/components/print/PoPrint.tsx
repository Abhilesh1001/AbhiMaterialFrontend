'use client'
import React from 'react';
import './printcss.css'
import { useSelector } from 'react-redux';
import { posliiceState, mainType, vendorType } from '@/type/type'
import { format } from 'date-fns';



const PoPrint = React.forwardRef<HTMLDivElement>((props, ref) => {
    const { data, podata, mainData } = useSelector((state: posliiceState) => state.poslicer);

    const deliveryAdress: vendorType = podata.po_no !== null && JSON.parse(podata.delivery_address)
    const vendorAdress: vendorType = podata.po_no !== null && JSON.parse(podata.vendor_address)

    console.log('data.........', deliveryAdress, vendorAdress)

    const marginTop = '30px'
    const marginRight = '30px'
    const marginBottom = '30px'
    const marginLeft = '30px'
    
  
    const getPageMargins = () => {
        return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important;}  `;
      };


    return (
        <div ref={ref} className='' style={{ width: '210mm', height: '297mm' }}>
          
            <style>{getPageMargins()}</style>
            
            <div className="row">
                <div className="col-sm-8">
                    <div className="font-bold text-2xl text-blue-600">Mayroor Studio Limited.</div>
                    <div>Thana Road Maharajganj Siwan Bihar</div>
                </div>
                <div className="col-sm-4">
                    <div className="text-blue-400 text-2xl">Purchase Order</div>
                    <div>PO NO : {podata.po_no}</div>
                    <div>Date : {podata?.po_no !== null && format(podata?.time, 'dd-MM-yyyy')}</div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-6">
                    <div className="bg-blue-500">Vendor Address</div>
                    {/* Render actual vendor address data here */}
                    <div>{vendorAdress.vendor_name}</div>
                    <div>{vendorAdress.name}</div>
                    <div>{vendorAdress.address}</div>
                    <div>{vendorAdress.phone_no}</div>
                    <div>{vendorAdress.gst}</div>
                    <div>{vendorAdress.email}</div>
                </div>
                <div className="col-sm-6">
                    <div className="bg-blue-500">Ship To Address</div>
                    {/* Render actual ship-to address data here */}
                    <div>{deliveryAdress.vendor_name}</div>
                    <div>{deliveryAdress.name}</div>
                    <div>{deliveryAdress.address}</div>
                    <div>{deliveryAdress.phone_no}</div>
                    <div>{deliveryAdress.gst}</div>
                    <div>{deliveryAdress.email}</div>
                </div>
            </div>

            <table className="table table-bordered mt-2">
                <thead className="bg-blue-500">
                    <tr>
                        <th className="text-nowrap">S No</th>
                        <th className="text-nowrap">Description</th>
                        <th className="text-nowrap">Qty</th>
                        <th className="text-nowrap">Unit</th>
                        <th className="text-nowrap">Unit Price</th>
                        <th className="text-nowrap">Tax</th>
                        <th className="text-nowrap">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.po_line}</td>
                            <td>
                                <div className=''>
                                <span className='mr-2'>{item.material_no}</span>
                                <span className='mr-2'>{item.material_name}</span>
                                <span>{item.material_text}</span>
                                </div>
                            </td>
                            <td>{item.material_qty}</td>
                            <td>{item.material_unit}</td>
                            <td>{item.material_price}</td>
                            <td>{item.material_tax}</td>
                            <td>{item.total_amount}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className='relative'>
                <div className='absolute right-0'>
                <div >Total Amount :{mainData.TotalAmount} </div>
                <div >Total Tax : {mainData.TotalTax}</div>
                <div>Total Amount with Tax : {mainData.TotalWithtax}</div>
                <div></div>
                </div>
                
            </div>
        </div>
    );
});

export default PoPrint;
