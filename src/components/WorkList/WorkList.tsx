
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
        <Box sx={{ paddingX: 5, paddingTop: { md: 12, xs: 15}, mb:2 }}>
            <Grid lg={12} item container spacing={3} >
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

