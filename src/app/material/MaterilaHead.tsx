'use client'
import React from 'react'
import { useMaterial } from '@/hooks/material/useMaterial'
import Loading from '@/components/loading/Loading'


const MaterilaHead = () => {

    const { loadingNewCreation } = useMaterial()
  return (
    <div className='mt-4 w-full flex justify-center h-9'>{loadingNewCreation && <Loading />}</div>  
  )
}

export default MaterilaHead