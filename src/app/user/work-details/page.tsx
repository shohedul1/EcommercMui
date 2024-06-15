'use client';

import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';


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
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
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

    if (loading) {
        return (
            <p>loading..</p>
        );
    }

    if (!work) {
        return <div>Error loading work details.</div>;
    }


    return (
        <Box
            sx={{
                pt: 10,
                px: 20,
                pb: 30,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: { sm: 'column' },
                    gap: 2,
                }}
            >
                <h1 className="text-xl">{work.title}</h1>
                {work.creator._id === userId ? (
                    <div
                        className="flex items-center gap-2.5 cursor-pointer"
                        onClick={() => {
                            router.push(`/update-work?id=${workId}`);
                        }}
                    >

                        <p className="text-xl font-bold m-0 hover:text-red-500">Edit</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5 cursor-pointer" >
                        {true ? (
                            <div>love</div>
                        ) : (
                            <div>love</div>
                        )}
                        <p className="text-xl font-bold m-0 hover:text-red-500">Save</p>
                    </div>
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
                            <img src={photo.url} alt="work" style={{ width: '100%', height: '100%' }} />
                            <Box
                                sx={{
                                    position: 'absolute',
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
                                {/* <MdArrowBackIosNew /> */}
                                next
                            </Box>
                            <Box
                                sx={{
                                    position: 'absolute',
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
                                {/* <MdArrowForwardIos /> */}
                                prev
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
                    <img
                        key={index}
                        src={photo.url}
                        alt="work-demo"
                        onClick={() => handleSelectedPhoto(index)}
                        className={`cursor-pointer w-36 h-auto ${selectedPhoto === index ? 'border-2 border-black border-solid' : ''}`}
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
                        {/* <MdFavoriteBorder sx={{ fontSize: '40px' }} /> */}
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
                    className="w-16 h-16 rounded-full"
                    onClick={() => router.push(`/shop?id=${work.creator._id}`)}
                />
                <h3>Created by {work.creator.username}</h3>
            </Box>

            <hr />

            <h3>About this product</h3>
            <p className="max-w-800 my-2">{work.description}</p>

            <h1>${work.price}</h1>
            <button type="submit" className="my-5 px-2 py-3 bg-red-200 rounded-full font-bold hover:shadow-lg flex items-center gap-2">
                {/* <FaShoppingCart /> */}
                ADD TO CART
            </button>
        </Box>
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
