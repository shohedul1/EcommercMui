'use client';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from 'next-auth/react';
import { resetCart, saveOrder } from "@/lib/redux/shoppingSlice";
import { AppDispatch, RootState } from "@/lib/redux/store"; // Adjust this import to your store's location
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from '@mui/system';

// Define bounce animation keyframes
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const PaymentForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { productData } = useSelector((state: RootState) => state.shopping);

    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        let amt = 0;
        productData.map((item: any) => {
            amt += item?.price * item?.qty
            return;
        });
        setTotalAmt(amt);
    }, [productData]);


    //Stripe  Payment Start here

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    const { data: session } = useSession()

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: productData,
                email: session?.user?.email,
            }),
        });
        const data = await response.json();

        if (response.ok) {
            await dispatch(saveOrder({ order: productData, id: data.id }));
            stripe?.redirectToCheckout({ sessionId: data.id });
            dispatch(resetCart());
        } else {
            throw new Error("Failed to create Stripe Payment");
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: 'white',
                p: 4,
            }}
        >
            <h2>Cart Totals</h2>
            <Box
                sx={{
                    borderBottom: '1px solid #dedede',
                    paddingY: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: 'lg',
                    }}>
                    <Typography sx={{
                        textTransform: 'uppercase',
                        fontWeight: 400
                    }} >Subtotal</Typography>
                    <p>
                        ${totalAmt}
                    </p>
                </Box>
            </Box>
            <Box
                sx={{
                    borderBottom: '1px solid #dedede',
                    paddingY: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: 'lg',
                    }}>
                    <Typography sx={{
                        textTransform: 'uppercase',
                        fontWeight: 400
                    }} >shopping</Typography>
                    <p>
                        ${totalAmt}
                    </p>
                </Box>
            </Box>
            <Box
                sx={{
                    borderBottom: '1px solid #dedede',
                    paddingY: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: 'lg',
                    }}>
                    <Typography sx={{
                        textTransform: 'uppercase',
                        fontWeight: 400
                    }} >total amount</Typography>
                    <p>
                        ${totalAmt + 20}
                    </p>
                </Box>
            </Box>


            {session?.user ? (
                <Button onClick={handleCheckout}
                    sx={{
                        bgcolor: 'black',
                        color: '#f1f5f9',
                        mt: 4,
                        px: 2,
                        py: 2,
                        '&:hover': {
                            bgcolor: '#6d0000'
                        },
                        cursor: 'pointer',
                        transition: 200,

                    }}
                >
                    Proceed to checkout
                </Button>
            ) : (
                <div>
                    <Button onClick={handleCheckout}
                        sx={{
                            bgcolor: 'black',
                            color: '#f1f5f9',
                            mt: 4,
                            px: 2,
                            py: 2,
                            '&:hover': {
                                bgcolor: '#6d0000'
                            },
                            cursor: 'pointer',
                            transition: 200,

                        }}
                    >
                        Proceed to checkout
                    </Button>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            mt: 2,
                            fontWeight: 600,
                            animation: `${bounce} 0.5s infinite alternate`
                        }}

                    >
                        Please login to continue
                    </Typography>
                </div>
            )
            }
        </Box >
    );
}

export default PaymentForm;
