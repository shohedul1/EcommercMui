'use client';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Define interfaces for types
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
    workPhotoPaths: { url: string }[]; // Assuming workPhotoPaths is an array of objects with a 'url' property
}

const WorkDetailsContent = () => {
    const [work, setWork] = useState<Work | null>(null); // Use null or undefined as initial state
    const searchParams = useSearchParams();
    const workId = searchParams.get("id");
    const router = useRouter();

    useEffect(() => {
        const getWorkDetails = async () => {
            try {
                const response = await fetch(`/api/work/${workId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWork(data as Work); // Type assertion to Work interface
            } catch (error) {
                console.error('Error fetching work details:', error);
            }
        };

        if (workId) {
            getWorkDetails();
        }
    }, [workId]);

    const { data: session, update } = useSession();
    const userId = session?.user?.id;

    /* SLIDER FOR PHOTOS */
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

    /* SHOW MORE PHOTOS */
    const [visiblePhotos, setVisiblePhotos] = useState(5);

    const loadMorePhotos = () => {
        if (work) {
            setVisiblePhotos(work.workPhotoPaths.length);
        }
    };

    /* SELECT PHOTO TO SHOW */
    const [selectedPhoto, setSelectedPhoto] = useState(0);

    const handleSelectedPhoto = (index: number) => {
        setSelectedPhoto(index);
        setCurrentIndex(index);
    };

    if (!work) {
        return <div>Loading...</div>;
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
                    display: "flex",
                    justifyItems: "between",
                    alignItems: "center",
                    flexDirection: { sm: "column" },
                    gap: 2

                }}
            >
                <h1 className="text-xl">{work.title}</h1>
                {work?.creator?._id === userId ? (
                    <div
                        className="flex items-center gap-2.5 cursor-pointer"
                        onClick={() => {
                            router.push(`/update-work?id=${workId}`);
                        }}
                    >
                        edit
                        <p className="text-xl font-bold m-0 hover:text-red-500">Edit</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2.5 cursor-pointer">
                        {/* Adjust your condition for liking */}
                        <div>Love</div>
                        <p className="text-xl font-bold m-0 hover:text-red-500">Save</p>
                    </div>
                )}
            </Box>

            <div className="max-w-[800px] overflow-hidden rounded-[10px] my-10">
                <div className="flex transition-transform duration-500 ease" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {work.workPhotoPaths?.map((photo, index) => (
                        <div className="relative flex-none w-full h-auto flex items-center" key={index}>
                            <img src={photo.url} alt="work" className="w-full h-full" />
                            <div
                                className="hover:bg-white left-2.5 absolute top-1/2 transform -translate-y-1/2 p-[6px] rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-[99]"
                                onClick={(e) => goToPrevSlide()}
                            >
                                next
                            </div>
                            <div
                                className="absolute bg-white right-2.5 top-1/2 transform -translate-y-1/2 p-[6px] rounded-full border-none cursor-pointer flex items-center justify-center bg-white/70 z-[99]"
                                onClick={(e) => goToNextSlide()}
                            >
                                prev
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-wrap gap-2.5 my-5">
                {work.workPhotoPaths?.slice(0, visiblePhotos).map((photo, index) => (
                    <img
                        key={index}
                        src={typeof work.creator.profileImagePath === 'string' ? work.creator.profileImagePath : work.creator.profileImagePath.url}
                        alt="work-demo"
                        onClick={() => handleSelectedPhoto(index)}
                        className={`cursor-pointer w-36 h-auto ${selectedPhoto === index ? "border-2 border-black border-solid" : ""}`}
                    />
                ))}

                {visiblePhotos < work.workPhotoPaths.length && (
                    <div className="flex flex-col gap-5 items-center justify-center cursor-pointer" onClick={loadMorePhotos}>
                        Show More
                    </div>
                )}
            </div>

            <hr className="my-5" />

            <div className="flex gap-5 items-center cursor-pointer">
                <img
                    src={typeof work.creator.profileImagePath === 'string' ? work.creator.profileImagePath : work.creator.profileImagePath.url}
                    alt="profile"
                    className="w-16 h-16 rounded-full"
                />
                <h3>Created by {work.creator.username}</h3>
            </div>

            <hr />

            <h3>About this product</h3>
            <p className="max-w-800 my-2">{work.description}</p>

            <h1>${work.price}</h1>
            <button type="submit" className="my-5 px-2 py-3 bg-red-200 rounded-full font-bold hover:shadow-lg flex items-center gap-2 ">
                ADD TO CART
            </button>
        </Box>
    );
};

export default WorkDetailsContent;
