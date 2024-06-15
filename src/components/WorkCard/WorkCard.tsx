import { Box, CardMedia, Grid } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';

interface WorkPhotoPath {
    id: string;
    url: string;
}

interface Creator {
    email: string;
    profileImagePath: string | { url: string };
    username: string;
}

interface Work {
    category: string;
    creator: Creator;
    description: string;
    price: number;
    title: string;
    workPhotoPaths: WorkPhotoPath[];
}

interface WorkProps {
    work: Work;
}


const WorkCard: React.FC<WorkProps> = ({ work }) => {
    console.log(work)
    const { title, description, price, workPhotoPaths, creator,category} = work;
    const imageUrl = workPhotoPaths.length > 0 ? workPhotoPaths[0].url : 'default-image-url';

    return (
        <Grid item lg={3} md={4} sm={6} xs={12} mb={2}>
            <Card sx={{ maxWidth: 455 }} className='hidden'>
                <div style={{ position: 'relative' }}>
                    <Link href="/">
                        <Image
                            src={imageUrl}
                            width={500}
                            height={500}
                            priority
                            alt='image'
                            style={{ height: 200, width: '100%' }}
                        />
                    </Link>

                    <FavoriteIcon
                        sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            color: 'yellow',
                            '&:hover': {
                                color: 'black', // optional, change text color on hover
                            },
                            "&:active": { color: 'red' }
                        }}
                    />
                </div>
                <CardContent>
                    <Typography variant="h5" className='title' sx={{ marginBottom: '5px' }}>
                        {title}
                    </Typography>
                    <Grid display={'flex'} justifyContent={"space-between"} marginY={1}>
                        <Grid display={'flex'} flexDirection={'column'} gap={1}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                ${price}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description.substring(0, 40)}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems:'center',
                                    gap:1
                                    
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={typeof creator.profileImagePath === 'string'
                                        ? creator.profileImagePath
                                        : creator.profileImagePath.url
                                    }
                                    alt="Creator's Profile Image"
                                    sx={{
                                        height: 40 ,        
                                         width: 40,
                                        objectFit: 'fill',  
                                        borderRadius:"50%"
                                    }}
                                />
                                <Typography
                                sx={{
                                    fontWeight:700,
                                    color:"green"
                                }}
                                >{creator.username}</Typography>
                                <Typography>in</Typography>
                                <Typography>{category}</Typography>

                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default WorkCard;
