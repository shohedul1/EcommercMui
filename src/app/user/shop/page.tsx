"use client";

import WorkList from "@/components/WorkList/WorkList";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

const ShopContent = () => {
    const { data: session } = useSession();
    const loggedInUserId = session?.user?.id;

    const searchParams = useSearchParams();
    const profileId = searchParams.get("id");

    const [workList, setWorkList] = useState([]);
    const [profile, setProfile] = useState<any>({});


    useEffect(() => {
        const getWorkList = async () => {
            const response = await fetch(`/api/user/${profileId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                console.error('Failed to fetch work list');
                return;
            }

            const data = await response.json();
            setWorkList(data.workList);
            setProfile(data.user);  // Correctly set profile from the response
        };

        if (profileId) {
            getWorkList();
        }
    }, [profileId]);

    return (
        <>
            {loggedInUserId === profileId && (
                <h1 className="title-list">Your Works</h1>
            )}

            {loggedInUserId !== profileId && (
                <h1 className="title-list">{profile.username}'s Works</h1>
            )}

            <WorkList workList={workList} />
        </>
    );
};

const Shop = () => {
    return (
        <Suspense>
            <ShopContent />
        </Suspense>
    );
};

export default Shop;
