'use client';
import React, { useState } from 'react';
import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSession } from 'next-auth/react';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, deleteFavorite } from '@/lib/redux/shoppingSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface WorkPhotoPath {
    id: string;
    url: string;
}

interface Creator {
    email: string;
    profileImagePath: string | { url: string };
    username: string;
    _id: string;
}

interface Work {
    category: string;
    creator: Creator;
    description: string;
    price: number;
    title: string;
    workPhotoPaths: WorkPhotoPath[];
    _id: string;
}

interface WorkProps {
    work: Work;
}

const WorkCard: React.FC<WorkProps> = ({ work }) => {
    const { title, description, price, workPhotoPaths, creator, category } = work;
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    const goToNextSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % workPhotoPaths.length);
    };

    const goToPrevSlide = () => {
        setCurrentIndex(prevIndex => (prevIndex - 1 + workPhotoPaths.length) % workPhotoPaths.length);
    };

    const handlePrevSlideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        goToPrevSlide();
    };

    const handleNextSlideClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        goToNextSlide();
    };

    /* DELETE WORK */
    const handleDelete = async () => {
        const hasConfirmed = confirm("Are you sure you want to delete this work?");

        if (hasConfirmed) {
            try {
                await fetch(`/api/work/${work._id}`, {
                    method: "DELETE",
                });
                window.location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    };

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const dispatch = useDispatch();
    const favoriteData = useSelector((state: { shopping: { favoriteData: Work[] } }) => state.shopping.favoriteData);

    const isFavorite = favoriteData?.some((item: Work) => item._id === work._id);


    const handleFavoriteClick = () => {
        if (session) {
            if (isFavorite) {
                dispatch(deleteFavorite(work._id));
                toast.error(`${work.title} removed from favorites!`, { position: 'top-center' });
            } else {
                dispatch(addToFavorite(work));
                toast.success(`${work.title} added to favorites!`, { position: 'top-center' });
            }
        } else {
            router.push('/login')
        }
    };

    const commonList = {
        position: 'absolute',
        right: 40,
        top: 50,
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 50,
        p: 1,
        bgcolor: 'white',
        color: 'black',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
            bgcolor: 'black',
            color: 'red'
        }
    };

    const commonFavorite = {
        position: 'absolute',
        right: 40,
        top: 50,
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 50,
        p: 1,
        bgcolor: isFavorite ? 'red' : 'black',
        color: isFavorite ? 'white' : 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <>
            <Grid item lg={4} md={4} sm={6} xs={12} p={2} position={'relative'}>
                <Card>
                    <Box position="relative" display="flex" flex="none" width="100%" height={270} alignItems="center" overflow="hidden">
                        <CardMedia
                            onClick={() => {
                                router.push(`/user/work-details?id=${work._id}`);
                            }}
                            component="img"
                            image={workPhotoPaths[currentIndex]?.url || 'default-image-url'}
                            alt="Work Image"
                            sx={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                left: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                p: 1.5,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                bgcolor: 'white',
                                opacity: 0.5,
                                zIndex: 99,
                                '&:hover': {
                                    bgcolor: 'black',
                                    color: 'white'
                                },
                            }}
                            onClick={handlePrevSlideClick}
                        >
                            <ArrowBackIosNewIcon />
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                right: 10,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                p: 1.5,
                                borderRadius: '50%',
                                cursor: 'pointer',
                                bgcolor: 'white',
                                opacity: 0.5,
                                zIndex: 99,
                                '&:hover': {
                                    bgcolor: 'black',
                                    color: 'white'
                                },
                            }}
                            onClick={handleNextSlideClick}
                        >
                            <ArrowForwardIosIcon />
                        </Box>
                    </Box>
                    <CardContent>
                        <Typography variant="h5" className="title" sx={{ marginBottom: '5px' }}>
                            {title}
                        </Typography>
                        <Grid display={'flex'} justifyContent={'space-between'} marginY={1}>
                            <Grid display={'flex'} flexDirection={'column'} gap={1}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    ${price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {description.substring(0, 35)}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        image={typeof creator.profileImagePath === 'string' ? creator.profileImagePath : creator.profileImagePath.url}
                                        alt="Creator's Profile Image"
                                        sx={{
                                            height: 40,
                                            width: 40,
                                            objectFit: 'fill',
                                            borderRadius: '50%',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: 700,
                                            color: 'green',
                                        }}
                                    >
                                        {creator.username}
                                    </Typography>
                                    <Typography>in</Typography>
                                    <Typography>{category}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                {userId === work?.creator?._id ? (
                    <Box sx={commonList} onClick={handleDelete}>
                        <DeleteIcon />
                    </Box>
                ) : (
                    <Box onClick={handleFavoriteClick} sx={commonFavorite}>
                        <FavoriteIcon />
                    </Box>
                )}
            </Grid>
        </>
    );
};

export default WorkCard;
