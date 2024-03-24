'use client'
import React, { useState } from 'react'
import { Query, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { StateProps } from '@/type/type'
import DumyInput from '@/components/dummyinput/DumyInput'

const Page = () => {
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [enable, setenable] = useState(false)

    const fetchData = async () => {
        const res = await axios.get(`${baseurl}loan/cashflow`, {
            headers: {
                Authorization: `Bearer ${authToken?.access}`
            }
        })
        return res.data
    }

    
    const { data } = useQuery({ queryKey: ['cashflow'], queryFn: fetchData})


    let adddata: any = []
    const newData = data?.map((item: any) => {
        for (let key in item) {
            // console.log(key.split('_')[1])
            if (key.split('_')[1] === 'share') {
                let newadddata = {
                    [key]: {
                        'journal': `Capital introduce by ${item[key].name}`,
                        'amount_debit': item[key].amount_Debit,
                        'amount_credit': item[key].amount_credit,
                    }
                }
                adddata.push(newadddata)
            }
            if (key.split('_')[1] === 'loan') {
                let newadddata = {
                    [key]: {
                        'journal': `Loan Taken by ${item[key].name}`,
                        'amount_debit': item[key].loan_amount,
                        'amount_credit': null,
                    }
                }
                adddata.push(newadddata)
            }

            if (key.split('_')[1] === 'loancoll') {
                let newadddata = {
                    [key]: {
                        'journal': `Loan Collection`,
                        'amount_debit': null,
                        'amount_credit': item[key],
                    }
                }
                adddata.push(newadddata)
            }

            if (key.split('_')[1] === 'rdcoll') {
                let newadddata = {
                    [key]: {
                        'journal': `RD Collection`,
                        'amount_debit': null,
                        'amount_credit': item[key],
                    }
                }
                adddata.push(newadddata)
            }

        }

        const res = {

        }
    })

    console.log(adddata)

    const handleClick = async () => {
        setenable(true)
    }

    function requiredDataMain() {
        let prevBalance: number = 0;
        const rows: any[] = [];
    
         adddata.forEach((item: any) => {
            const date = Object.keys(item)[0].split('_')[0];
            const amountDebit = item[Object.keys(item)[0]].amount_debit || 0;
            const amountCredit = item[Object.keys(item)[0]].amount_credit || 0;
    
            const balance = prevBalance + Number(amountCredit) - Number(amountDebit);
            prevBalance = balance;
    
            const data = {
                'date': date,
                'journal': item[Object.keys(item)[0]].journal,
                'amount_debit': amountDebit,
                'amount_credit': amountCredit,
                'balance': balance
            };
    
            rows.push(data);
            return data;
        });
    
        return rows;
    }
    
    const cashflowData = requiredDataMain()
    
    return (
        <div className='dark:bg-gray-800 bg-sky-600 h-auto text-gray-50  min-h-screen'>
            <div className="container">
                <div className='h-6'></div>

                <button onClick={handleClick}>ViewData</button>
                <div className=' ml-2 mr-2 mt-4 h-[85vh] overflow-auto  text-nowrap my-2 relative overflow-y-auto shadow-md dark:bg-gray-900  bg-sky-500 sm:rounded-lg'>
                    <table className="w-full text-sm text-left rtl:text-right dark:bg-slate-700 text-gray-500 bg-sky-500 dark:text-gray-400 ">
                        <thead className='sticky top-0 z-1 bg-sky-800 dark:bg-gray-950 text-gray-50 h-10'>
                            <tr >
                                <th>Date</th>
                                <th>Journal</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody >

                            {
                                cashflowData.length > 0 && cashflowData.map((item: any, index: number) => {

                                    return <tr key={index}>
                                        <td><DumyInput indum={item.date} /></td>
                                        <td><DumyInput indum={item.journal} /></td>
                                        <td><DumyInput indum={item.amount_debit} /></td>
                                        <td><DumyInput indum={item.amount_credit} /></td>
                                        <td><DumyInput indum={item.balance} /></td>
                                        
                                        {/* You need to calculate the balance */}
                                    </tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page