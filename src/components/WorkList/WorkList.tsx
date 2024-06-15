// import { Box, Grid } from '@mui/material';
// import React from 'react';
// import WorkCard from '../WorkCard/WorkCard';

// interface Work {
//     creator: string;
//     category: string;
//     title: string;
//     description: string;
//     price: string;
//     photos: string[]; // Assuming photos are URLs for display purposes
// }

// interface WorkListProps {
//     workList: Work[];
// }

// const WorkList: React.FC<WorkListProps> = ({ workList }) => {
//     return (

//         <Box sx={{ paddingX: 5, paddingTop: { md: 12, xs: 15 } }}>

//             <Grid lg={12} item container spacing={3} >
//                 {workList.map((work) => (

//                     <WorkCard
//                         key={work._id}
//                         work={work}
//                     />

//                 ))}
//             </Grid>


//         </Box>

//     );
// };

// export default WorkList;

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
    <Box sx={{ paddingX: 5, paddingTop: { md: 12, xs: 15 } }}>
         <Grid lg={12} item container spacing={3} >
                 {workList.map((work:any) => (
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

