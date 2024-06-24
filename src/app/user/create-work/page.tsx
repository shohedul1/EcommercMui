// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import Form from '@/components/Form/Form';
// import { toast } from 'react-toastify';
// import Notification from '@/components/Notification/Notification';
// import { useRouter } from 'next/navigation';

// interface Work {
//   creator: string;
//   category: string;
//   title: string;
//   description: string;
//   price: string;
//   photos: (File | { id: string, url: string })[];

// }
// const initializeState: Work = {
//   creator: "",
//   category: "",
//   title: "",
//   description: "",
//   price: "",
//   photos: [] as (File | { id: string, url: string })[], // Initialize photos as an empty array
// };


// const CreateWork: React.FC = () => {
//   const [work, setWork] = useState<Work>(initializeState);
//   const { data: session } = useSession();
//   const userId = session?.user?.id
//   const [loader, setLoader] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     // Initialize creator from session when session is available
//     if (session?.user?.id) {
//       setWork((prevWork) => ({
//         ...prevWork,
//         creator: session.user.id,
//       }));
//     }
//   }, [session]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { creator, category, title, description, price, photos, } = work;

//     try {
//       setLoader(true)
//       const image = await uploadImage();

//       const userPost = {
//         creator,
//         category,
//         title,
//         description,
//         price,
//         photos: image
//       }

//       const response = await fetch('/api/work/new', {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(userPost)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         if (data.success) {
//           toast.success(data.message, {
//             position: 'top-center'
//           });
//           setWork(initializeState);
//           setTimeout(() => {
//             router.push(`/user/shop/?id=${userId}`);
//           }, 1000);
//         } else {
//           toast.error(data.message, {
//             position: 'top-center'
//           });
//         }
//       } else {
//         toast.error("There was a problem with your request.", {
//           position: 'top-right'
//         });
//       }

//     } catch (error: any) {
//       toast.error(error)
//     } finally {
//       setLoader(false);
//     }
//   };



//   //cloudinary upload name 
//   const CLOUD_NAME = "djhjt07rh";
//   const UPLOAD_PRESET = "nextjs_blog_images";
//   const uploadImage = async () => {
//     if (!work.photos.length) return null;

//     const uploadedImages = await Promise.all(
//       work.photos.map(async (photo: any) => {
//         const formdata = new FormData();
//         formdata.append("file", photo);
//         formdata.append('upload_preset', UPLOAD_PRESET);

//         try {
//           const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
//             method: "POST",
//             body: formdata
//           });
//           const data = await res.json();
//           return {
//             id: data['public_id'],
//             url: data['secure_url']
//           };
//         } catch (error) {
//           console.error(error);
//           return null;
//         }
//       })
//     );

//     return uploadedImages.filter(image => image !== null);
//   };

//   return (
//     <>
//       <Form
//         type="Create"
//         loader={loader}
//         work={work}
//         setWork={setWork}
//         handleSubmit={handleSubmit}
//       />
//       <Notification />
//     </>
//   )
// };

// export default CreateWork;
'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@/components/Form/Form';
import { toast } from 'react-toastify';
import Notification from '@/components/Notification/Notification';
import { useRouter } from 'next/navigation';

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
  photos: [] as (File | { id: string, url: string })[]
};

const CreateWork: React.FC = () => {
  const [work, setWork] = useState<Work>(initializeState);
  const { data: session } = useSession();
  const userId = session?.user?.id
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize creator from session when session is available
    if (session?.user?.id) {
      setWork((prevWork) => ({
        ...prevWork,
        creator: session.user.id,
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { creator, category, title, description, price, photos, } = work;

    try {
      setLoader(true)
      const image = await uploadImage();

      const userPost = {
        creator,
        category,
        title,
        description,
        price,
        photos: image
      }

      const response = await fetch('/api/work/new', {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userPost)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(data.message, {
            position: 'top-center'
          });
          setWork(initializeState);
          setTimeout(() => {
            router.push(`/user/shop/?id=${userId}`);
          }, 1000);
        } else {
          toast.error(data.message, {
            position: 'top-center'
          });
        }
      } else {
        toast.error("There was a problem with your request.", {
          position: 'top-right'
        });
      }

    } catch (error: any) {
      toast.error(error)
    } finally {
      setLoader(false);
    }
  };



  //cloudinary upload name 
  const CLOUD_NAME = "djhjt07rh";
  const UPLOAD_PRESET = "nextjs_blog_images";
  const uploadImage = async () => {
    if (!work.photos.length) return null;

    const uploadedImages = await Promise.all(
      work.photos.map(async (photo:any) => {
        const formdata = new FormData();
        formdata.append("file", photo);
        formdata.append('upload_preset', UPLOAD_PRESET);

        try {
          const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formdata
          });
          const data = await res.json();
          return {
            id: data['public_id'],
            url: data['secure_url']
          };
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    );

    return uploadedImages.filter(image => image !== null);
  };

  return (
    <>
      <Form
        type="Create"
        loader={loader}
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
      <Notification />
    </>
  )
};

export default CreateWork;