'use client';

import { Box, Button, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { BorderAll } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


interface ProfileImagePath {
    url: string;
}

interface Creator {
    _id: string;
    username: string;
    email: string;
    profileImagePath: string | ProfileImagePath;
}

interface Work {
    _id: string;
    category: string;
    creator: Creator;
    description: string;
    price: number;
    title: string;
    workPhotoPaths: { url: string }[];
}

const WorkDetailsContent = () => {
    const [work, setWork] = useState<Work | null>(null);
    const searchParams = useSearchParams();
    const workId = searchParams.get('id');
    const router = useRouter();
    const { data: session, update } = useSession();
    const userId = session?.user?.id;

    useEffect(() => {
        const getWorkDetails = async () => {
            if (!workId) return;

            try {
                const response = await fetch(`/api/work/${workId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWork(data);
            } catch (error) {
                console.error('Error fetching work details:', error);
            }
        };

        getWorkDetails();
    }, [workId]);

    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNextSlide = () => {
        if (work) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length);
        }
    };

    const goToPrevSlide = () => {
        if (work) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + work.workPhotoPaths.length) % work.workPhotoPaths.length);
        }
    };

    const [visiblePhotos, setVisiblePhotos] = useState(5);

    const loadMorePhotos = () => {
        if (work) {
            setVisiblePhotos(work.workPhotoPaths.length);
        }
    };

    const [selectedPhoto, setSelectedPhoto] = useState(0);

    const handleSelectedPhoto = (index: number) => {
        setSelectedPhoto(index);
        setCurrentIndex(index);
    };


    return (
        <>
            {
                work && (
                    <Box
                        sx={{
                            pt: 10,
                            px: { xs: 2, md: 20 },
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: { xs: "center", sm: 'start' },
                                flexDirection: { sm: 'column' },
                                gap: { sm: 2.5 }
                            }}
                        >
                            <Typography sx={{
                                fontSize: "20px"
                            }}>
                                {work.title}
                            </Typography>
                            {work.creator._id === userId ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        router.push(`/update-work?id=${workId}`);
                                    }}
                                >
                                    <EditIcon />
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: "bold",
                                            "&:hover": {

                                                color: "red"

                                            }
                                        }}
                                    >
                                        Edit
                                    </Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: "center",
                                        gap: 1,
                                        cursor: "pointer"
                                    }}>
                                    {/* {isLiked ? (
                                        <MdFavorite className="text-red-500" />
                                    ) : (
                                        <MdFavoriteBorder />
                                    )} */}
                                    <FavoriteBorderIcon />
                                    <Typography sx={{
                                        fontSize: "20px",
                                        fontWeight: 'bold',
                                        "&:hover": {
                                            color: "red"
                                        }
                                    }}>
                                        Save
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box
                            sx={{
                                maxWidth: 800,
                                overflow: 'hidden',
                                borderRadius: 2,
                                my: 10,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    transition: 'transform 0.5s ease',
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                }}
                            >
                                {work.workPhotoPaths.map((photo, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            position: 'relative',
                                            flex: 'none',
                                            width: '100%',
                                            height: 'auto',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >

                                        <img src={photo.url}
                                            alt="work"
                                            style={{
                                                width: '100%',
                                                height: '500px',
                                                objectFit: 'fill',
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                display: "flex",
                                                alignItems: "center",
                                                left: 2.5,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                p: 1.5,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                bgcolor: 'white',
                                                opacity: 0.7,
                                                zIndex: 99,
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                },
                                            }}
                                            onClick={goToPrevSlide}
                                        >
                                            <ArrowCircleRightIcon />
                                        </Box>
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                display: "flex",
                                                alignItems: "center",
                                                right: 2.5,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                p: 1.5,
                                                borderRadius: '50%',
                                                cursor: 'pointer',
                                                bgcolor: 'white',
                                                opacity: 0.7,
                                                zIndex: 99,
                                                '&:hover': {
                                                    bgcolor: 'white',
                                                },
                                            }}
                                            onClick={goToNextSlide}
                                        >
                                            <ArrowCircleLeftIcon />
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2.5,
                                my: 5,
                            }}
                        >
                            {work.workPhotoPaths.slice(0, visiblePhotos).map((photo, index) => (
                                <Box
                                    key={index}
                                    component="img"
                                    src={photo.url}
                                    alt="work-demo"
                                    onClick={() => handleSelectedPhoto(index)}
                                    sx={{
                                        cursor: 'pointer',
                                        width: 144, // equivalent to w-36 in Tailwind (36 * 4px = 144px)
                                        height: 'auto',
                                        border: selectedPhoto === index ? '2px solid black' : 'none',
                                    }}
                                />

                            ))}



                            {visiblePhotos < work.workPhotoPaths.length && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                    }}
                                    onClick={loadMorePhotos}
                                >
                                    <BorderAll sx={{ fontSize: '40px' }} />
                                    Show More
                                </Box>
                            )}
                        </Box>

                        <hr className="my-5" />

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 5,
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <img
                                src={typeof work.creator.profileImagePath === 'string' ? work.creator.profileImagePath : work.creator.profileImagePath.url}
                                alt="profile"
                                style={{
                                    width: '40px',
                                    height: "40px",
                                    borderRadius: "50%"
                                }}
                                onClick={() => router.push(`/shop?id=${work?.creator?._id}`)}
                            />
                            <h3>Created by {work?.creator?.username}</h3>
                        </Box>

                        <hr />

                        <h3>About this product</h3>
                        <Typography sx={{ maxWidth: '1200px', my: 2 }} className="max-w-800 my-2">{work.description}</Typography>

                        <h1>${work.price}</h1>
                        <Button
                            type="submit"
                            sx={{
                                my: 5,
                                px: 2,
                                py: 2,
                                backgroundColor: 'red',
                                color: 'white',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: 'black',
                                    boxShadow: 2
                                },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                            <ShoppingCartIcon/>
                            ADD TO CART
                        </Button>
                    </Box>
                )
            }
        </>
    );
};


const WorkDetails = () => {
    return (
        <Suspense>
            <WorkDetailsContent />
        </Suspense>
    );
};

export default WorkDetails;
