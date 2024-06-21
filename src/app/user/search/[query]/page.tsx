"use client"

import WorkList from '@/components/WorkList/WorkList'
import { Box } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const SearchPage = () => {
    const { query } = useParams()

    const [workList, setWorkList] = useState([]);

    const getWorkList = async () => {
        try {
            const response = await fetch(`/api/work/search/${query}`, {
                method: 'GET',
            })

            const data = await response.json()
            setWorkList(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getWorkList()
    }, [query])

    console.log(query, workList);

    return (
        <>

            <h1 className='title-list'>{query} result(s)</h1>
            <WorkList workList={workList} />


        </>
    )
}

export default SearchPage