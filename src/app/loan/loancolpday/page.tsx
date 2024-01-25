'use client'

import DataTable from '@/components/Rdcoll/DataTable';

import TextInput from '@/components/dummyinput/TextInput';
import PrBurron from '@/components/button/PrBurron';
import { useLoancolpday } from '@/hooks/loan/useLoancolpday';

const App: React.FC = () => {
  const {setDate,date,handleClick,data} = useLoancolpday()    


    return (
        <div className='dark:bg-gray-800 bg-sky-600 min-h-screen mt-6'>
            <div className='h-3'></div>
            <div className='flex ml-4'>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap text-gray-50 mr-2' >Start Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, startDate: e.target.value })} className="form-control text-sm " />
                </div>
                <div className='flex'>
                    <label htmlFor="" className='text-nowrap text-gray-50 mr-2 ml-2' >End Date</label>
                    <input type="date" onChange={(e) => setDate({ ...date, endDate: e.target.value })} className="form-control text-sm " />
                </div>
                <PrBurron label={'submit'} onClick={handleClick} />

            </div>

            {Object.keys(data).length > 0 ? (
                <DataTable startDate={date.startDate} endDate={date.endDate} data={data} />
            ) : (
                <div className=' text-gray-50'>No data available</div>
            )}

        </div>

    )
};

export default App;
