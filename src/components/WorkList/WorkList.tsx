
import { Box, Grid } from '@mui/material';
import React from 'react';
import WorkCard from '../WorkCard/WorkCard';

interface WorkPhotoPath {
    id: string;
    url: string;
}

interface Creator {
    email: string;
    profileImagePath: string;
    username: string;
}

interface Work {
    creator: Creator;
    category: string;
    title: string;
    description: string;
    price: number;
    workPhotoPaths: WorkPhotoPath[];
}

interface WorkListProps {
    workList: Work[];
}

const WorkList: React.FC<WorkListProps> = ({ workList }) => {
    return (
        <Box sx={{ paddingX: {sx:2,md:5}, paddingTop: { md: 5, xs: 5}, mb:2 }}>
            <Grid lg={12} container >
                {workList.map((work: any) => (
                    <WorkCard
                        key={work._id}
                        work={work}
                    />
                ))}
            </Grid>

        </Box>
    );
};

export default WorkList;

