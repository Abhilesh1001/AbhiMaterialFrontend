import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { StateProps } from '@/type/type'
import axios from 'axios'
import { dataTypeMatIssue, matType, matState } from '@/type/material/materia-type'
import { getMatData, getOrignalData, getTotalQuantity, getMiView } from '@/redux/material/matslicer'
import { useMutation } from '@tanstack/react-query'
import { matissueMain } from '@/components/dataAll/data'



export function useIsMaterial(val?: string) {

    const { baseurl, authToken, userId } = useSelector((state: StateProps) => state.counter)
    const { matData: data, orignalData, totalQuantity, miview } = useSelector((state: matState) => state.matSlice)
    const dispatch = useDispatch()
    const [qerror, setQerror] = useState<boolean[]>([])
    const hasTrueValue = qerror.some((value) => value === true);
    const [view,setView] =useState('change')
    const [change,setChange] = useState('change')

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const value = (e.target as HTMLInputElement).value
        if (e.key == 'Enter') {
            const newData = [...data]
            try {
                const data = await axios.get(`${baseurl}grn/materialstock/${value}`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                if (data.data[0] !== undefined) {
                    const onewData = newData?.map((item: matType, indexes: number) => {
                        if (indexes === index) {
                            return {
                                ...item,
                                material_no: parseInt(data.data[0].material_no),
                                material_name: data.data[0].material_name,
                                material_unit: data.data[0].material_unit,
                                material_qty: data.data[0].material_qty,
                            }
                        }
                        return item
                    })
                    dispatch(getMatData(onewData))
                    const newDataforRemove = [...onewData]
                    const orignal = removeDuplicates(newDataforRemove)
                    dispatch(getOrignalData(orignal))
                }
                else {

                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleChange = (value: Number | string, key: keyof matType, index: number) => {
        const updata = [...data]
        updata[index] = { ...updata[index], [key]: value }
        console.log(updata)
        const newData = [...updata]
        dispatch(getMatData(updata))
        const totalqty = TotalQuantity(newData)
        dispatch(getTotalQuantity(totalqty))
    }

    function handleClick() {
        const newFrom = [...data]
        const lastLine = newFrom.length > 0 ? newFrom[newFrom.length - 1].mi_line : 0;
        const newLine = lastLine === null ? 0 : lastLine + 1;
        const updateForm = [...newFrom, { mi_line: newLine, material_no: null, material_name: '', material_unit: '', material_qty: null, material_issue: null, material_remarks: '' }]
        dispatch(getMatData(updateForm))
        
    }



    const mutation = useMutation<any, any, any, unknown>(({
        mutationFn: async (payload) =>
            await axios.post(`${baseurl}grn/materialissuecreate`, payload, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            }),
        onSuccess: (data) => {
            dispatch(getMatData([{ mi_line: 1, material_no: null, material_name: '', material_unit: '', material_qty: null, material_issue: null, material_remarks: '' }]))
        },
        onError: (error) => {
            console.log(error)

        }
    }))


    const handleSubmit = () => {
        console.log('data', data)
        const result = {
            user: userId,
            item_issue: JSON.stringify(data)
        }

        mutation.mutate(result)
    }

    const handleDelete = (index: number) => {
        console.log(index)
        if (data.length > 1) {
            const update = [...data]
            const updateData = update?.filter((item: any, indexs: number) => {
                if (index !== indexs) {
                    return item
                }
            })
            dispatch(getMatData(updateData))
        }
    }



    function removeDuplicates(originalData: matType[]): matType[] {
        const uniqueItems: Record<string, matType> = {};
        const result: matType[] = [];

        originalData.forEach(item => {
            const key = `${item.material_no}`;

            if (!uniqueItems[key]) {
                uniqueItems[key] = { ...item };
                result.push(uniqueItems[key]);
            }
        });

        return result;
    }



    function TotalQuantity(originalData: matType[]): matType[] {
        const uniqueItems: Record<string, matType> = {};
        const result: matType[] = [];

        const orignalDa = [...originalData]

        orignalDa.forEach(item => {
            const key = `${item.material_no}`;

            if (!uniqueItems[key]) {
                uniqueItems[key] = { ...item };
                result.push(uniqueItems[key]);
            } else {
                const existingItem = uniqueItems[key];
                if (existingItem.material_issue !== null && item.material_issue !== null) {
                    existingItem.material_issue += item.material_issue;
                }
            }
        });

        return result;
    }



    useEffect(() => {
        const totalQuality = TotalQuantity(data);
        dispatch(getTotalQuantity(totalQuality));
        console.log()

        // new setting 
        const error: boolean[] = [];

        totalQuality.forEach((item) => {
            const orignalItem = orignalData.find(
                (orignalItem) => orignalItem.material_no === item.material_no
            );
            if (item?.material_issue !== null && orignalItem?.material_qty !== null && orignalItem !== undefined) {
                if (item?.material_issue > orignalItem?.material_qty) {
                    error.push(true);
                } else {
                    error.push(false);
                }
            }
        });

        setQerror([...error]);



    }, [data, orignalData]); // Include orignalData in the dependency array



    // insert MaterialIssue No. 

    const handleViewClick = () => {
        console.log(miview)
        console.log('ok')
        setView('')
        setChange('change')
        handleInsertMIssuse()

    }

    const handleInsertMIssuse = async () => {
        
        if(miview!==null){
            try {
                const res: any = await axios.get(`${baseurl}grn/materialissuecreate/${miview}`, {
                    headers: {
                        Authorization: `Bearer ${authToken?.access}`
                    }
                })
                const item_issue = JSON.parse(res?.data?.item_issue)
                console.log(item_issue)
                const newItem = [...item_issue]
                const itemUpdata = item_issue.map((item: matType) => {
                    const itemNew = {
                        mi_line: item.mi_line,
                        material_no: item.material_no,
                        material_name: item.material_name,
                        material_unit: item.material_unit,
                        material_qty: item.material_qty,
                        material_issue: item.material_issue,
                        material_remarks: item.material_remarks
                    }
                    return itemNew
                })
    
                dispatch(getMatData(itemUpdata))
                const newDataforRemove = [...itemUpdata]
                const orignal = removeDuplicates(newDataforRemove)
                dispatch(getOrignalData(orignal))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleIssuechange = () => {
        console.log('change')
        setChange('')
        setView('change')
        handleInsertMIssuse()

    }

    const handleReset = () => {
        dispatch(getMatData(matissueMain))
        setView('change')
        setChange('change')
    }

    const handleMateriIssueView = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getMiView(Number(e.target.value)))
    }



    const mutationUpdata = useMutation<any,any,any,unknown>({
        mutationFn: async (payload)=>{
            return await axios.patch(`${baseurl}grn/materialissuecreate/${miview}/`,payload, {
                headers: {
                    Authorization: `Bearer ${authToken?.access}`
                }
            })
        },
    })
 
    const handleUpdate= async ()=>{
        console.log(data)
        const newData = {
            user : userId,
            item_issue : JSON.stringify(data)
        }

        mutationUpdata.mutate(newData)
        handleReset()
    }





    return { handleKeyDown, handleChange, handleClick, handleSubmit, handleDelete, mutation, hasTrueValue, handleViewClick, handleIssuechange, handleReset, handleMateriIssueView,view,change,handleUpdate,mutationUpdata }
}