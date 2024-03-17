

import { praldata, prmainall } from '@/components/dataAll/data'


// dependencies 
import axios from 'axios'
import { soundClick, soundError, soundSsuccess } from '@/sound/sound'

// typeScript 
import { datatypePr, StateProps, prsliiceState } from '@/type/type'

// reducer 
import { useDispatch, useSelector } from 'react-redux'
import { resetPr, deleteLine, getPrData, setPrMainData, setHiddenALert, getNewChange } from '@/redux/pr/prslicer'



import { ChangeEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'




export const usePrPreview = () => {
    const { datapr: data } = useSelector((state: prsliiceState) => state.prslicer)
    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const [prno, setPrno] = useState<number | null>(null)
    const [view, setView] = useState(false)
    const [change, setChange] = useState('change')

    const dispatch = useDispatch()
    const handleView = async () => {
        soundClick?.play()
        setView(true)
        console.log('prno', prno)

        if (prno === null || prno === 0) {
            soundError?.play()
            toast.error('Enter PR no for view or change', { position: 'top-center' })
            return
        }

        if (prno !== null || prno === 0) {
            try {
                const data = await axios.get(`${baseurl}mat/prview/${prno}`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                console.log(data.data)
                dispatch(setPrMainData(data.data))
                const newData = JSON.parse(data.data.item_json)
                console.log('newDataPo', newData)
                const mapDataUpdata = newData.map((item: any) => {
                    const element = {
                        pr_no: prno,
                        po_no: item.po_no === 0 ? null : item.po_no,
                        line_no: item.line_no,
                        material_name: item.material_name,
                        material_no: item.material_no,
                        material_price: item.material_price,
                        material_qty: item.material_qty,
                        material_unit: item.material_unit,
                        material_text: item.material_text,
                        total_price: item.total_price,
                    }
                    return element
                })
                dispatch(getPrData(mapDataUpdata))
                soundSsuccess?.play()
            } catch (error: any) {
                console.log(error)
                if (error.response.status)
                    soundError?.play()
                toast.error('Enter Correct Pr No fot View of Change', { position: 'top-center' })
            }
        }


    }

    const handlePRView = (e: ChangeEvent<HTMLInputElement>) => {
        soundClick?.play()
        setPrno(Number(e.target.value))
    }
    const FormReset = () => {
        soundClick?.play()
        dispatch(resetPr(praldata))
        dispatch(setPrMainData(prmainall))
        setView(false)
        setChange('change')

    }
    const handleDelete = (index: number) => {
        soundClick?.play()
        if (data.length > 1) {
            dispatch(deleteLine({ index }))
        }
    }

    const handleChangePr = () => {
        soundClick?.play()
        handleView()
        setView(false)
        setChange('')
        dispatch(getNewChange(''))
    }



    const mutationUpdate = useMutation<any, any, any, unknown>({
        mutationFn: async (newData) => {
            return await axios.patch(`${baseurl}mat/createpurchase/${prno}/`, newData, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
        onSuccess: (data) => {
            FormReset()
            soundSsuccess?.play()
        }

    })


    const handleUpdate = async () => {
        soundClick?.play()
        mutationUpdate.reset()
        dispatch(setHiddenALert(''))
        const resData = data.map((item) => {
            if (!item.line_no || !item.material_name || !item.material_no || !item.material_price || !item.material_qty || !item.material_text || !item.material_unit) {
                soundError?.play()
                toast.error('Enter all required input fileds', { position: 'top-center' })
                mutationUpdate.reset()
                return true
            } else {
                return false
            }
        })

        const resSome = resData.some((res)=>{
            if (res===false){
                return false 
            }else{
                return true
            }
        })

        const nweData = {
            item_json: JSON.stringify(data)
        }

        console.log('resDa', resData)
        if (!resSome) {
            mutationUpdate.mutate(nweData)
        }

    }

    return { FormReset, handleDelete, handleView, handlePRView, view, handleChangePr, change, handleUpdate, mutationUpdate }
} 