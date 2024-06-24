'use client';

import Form from "@/components/Form/Form";
import Notification from "@/components/Notification/Notification";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";


interface Work {
    creator: string;
    category: string;
    title: string;
    description: string;
    price: string;
    photos: (File | { id: string, url: string })[];
}


const initializeState: Work = {
    creator: "",
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [], // Initially empty
};

const UpdatedWorkContent: React.FC = () => {
    const { data: session } = useSession();
    const [loader, setLoader] = useState(false);
    const [work, setWork] = useState<Work>(initializeState); // Use Work interface here
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const type = id ? "Update" : "Create";

    // useEffect for fetching existing work data
    useEffect(() => {
        if (id) {
            const fetchWork = async () => {
                try {
                    const res = await fetch(`/api/work/${id}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!res.ok) {
                        throw new Error("Failed to fetch data");
                    }

                    const data = await res.json();
                    setWork({
                        creator: data.creator,
                        category: data.category,
                        title: data.title,
                        description: data.description,
                        price: data.price,
                        photos: data.workPhotoPaths.map((photo: { id: string; url: string }) => ({
                            id: photo.id,
                            url: photo.url
                        }))
                    });
                } catch (error) {
                    console.error(error);
                }
            };
            fetchWork();
        }
    }, [id]);

    // // handleSubmit function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoader(true);

        if (!session?.user?.id) {
            toast.error('User not authenticated');
            setLoader(false);
            return;
        }

        try {
            const uploadedPhotos = await uploadImages();

            const formData = new FormData();
            formData.append('creator', session?.user?.id);
            formData.append('category', work.category);
            formData.append('title', work.title);
            formData.append('description', work.description);
            formData.append('price', work.price);
            formData.append('photos', JSON.stringify(uploadedPhotos));

            const res = await fetch(`/api/work/${id}`, {
                method: id ? 'PATCH' : 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    toast.success(data.message, {
                        position: 'top-center'
                    });
                    setTimeout(() => {
                        router.push(`/user/shop/?id=${session.user.id}`);
                    }, 1000);
                } else {
                    toast.error(data.message, {
                        position: 'top-center'
                    });
                }



            } else {
                throw new Error('Failed to submit work');
            }
        } catch (error: any) {
            toast.error(`Error: ${error.message}`);
        } finally {
            setLoader(false);
        }
    }

    // Function to upload images to Cloudinary
    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";
    const uploadImages = async () => {
        const uploadedImages = await Promise.all(
            work.photos.map(async (photo: File | { id: string; url: string }) => {
                if (photo instanceof File) {
                    const formData = new FormData();
                    formData.append('file', photo);
                    formData.append('upload_preset', UPLOAD_PRESET);

                    try {
                        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                            method: 'POST',
                            body: formData
                        });

                        const data = await res.json();
                        return {
                            id: data.public_id,
                            url: data.secure_url
                        };
                    } catch (error) {
                        console.error("Error uploading image:", error);
                        return null;
                    }
                } else {
                    return photo; // Return already uploaded photo
                }
            })
        );

        return uploadedImages.filter((photo: any) => photo !== null) as (File | { id: string; url: string })[]; // Adjust type
    };

    return (
        <>
            <Notification />
            <Form
                type={type}
                work={work}
                setWork={setWork}
                handleSubmit={handleSubmit}
                loader={loader}
            />
        </>
    );
};


const UpdatedWork = () => {
    return (
        <Suspense>
            <UpdatedWorkContent />
        </Suspense>
    );
};

export default UpdatedWork;

