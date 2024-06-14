'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Form from '@/components/Form/Form';

interface Work {
  creator: string;
  category: string;
  title: string;
  description: string;
  price: string;
  photos: File[];
}

const initializeState: Work = {
  creator: "",
  category: "",
  title: "",
  description: "",
  price: "",
  photos: [],
};

const CreateWork: React.FC = () => {
  const [work, setWork] = useState<Work>(initializeState);
  const { data: session } = useSession();

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
    console.log(work); // For testing

    // Implement form submission logic here

    // Redirect to success page or do something else after submission
  };

  return (
    <Form
      type="Create"
      work={work}
      setWork={setWork}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreateWork;
