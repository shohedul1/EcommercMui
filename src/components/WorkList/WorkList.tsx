import { Box, Grid } from '@mui/material'
import React from 'react'
import WorkCard from '../WorkCard/WorkCard'

const WorkList = () => {
    return (
        <>
            <Box sx={{ paddingX: 5, paddingTop: { md: 12, xs: 15 } }}>

                <Grid lg={12} item container spacing={3} >
                    <WorkCard />
                    <WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard /><WorkCard />
                </Grid>


            </Box>
        </>
    )
}

export default WorkList