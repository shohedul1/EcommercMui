'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { resetOrder } from '@/lib/redux/shoppingSlice';
import { RootState } from '@/lib/redux/store';
import { Box, Typography, Button } from '@mui/material';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderData } = useSelector((state: RootState) => state.shopping);
    const [isLoading, setIsLoading] = useState(true);
    const [totalAmt, setTotalAmt] = useState(0);

    useEffect(() => {
        setIsLoading(false); // Simulating end of loading for demonstration purposes
    }, []);

    useEffect(() => {
        if (orderData && orderData.length > 0) {
            let amt = 0;
            orderData.forEach((order) => {
                order.order.forEach((item: any) => {
                    amt += item.price * item.qty;
                });
            });
            setTotalAmt(amt);
        }
    }, [orderData]);

    return (
        <>
            {!isLoading && (
                <>
                    {orderData && orderData.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    fontWeight: 600,
                                    bgcolor: 'green',
                                    color: 'white',
                                    p: 2
                                }}
                            >
                                <Typography sx={{ flex: '1 0 33%' }}>Items</Typography>
                                <Typography sx={{ flex: '1 0 33%', display: 'flex', justifyContent: 'center' }}>Quantity</Typography>
                                <Typography sx={{ flex: '1 0 33%', display: 'flex', justifyContent: 'flex-end' }}>Subtotal</Typography>
                            </Box>
                            <Box sx={{ py: 2, gap: 2 }}>
                                {orderData.map((order) =>
                                    order.order.map((item: any) => (
                                        <Box
                                            key={item._id}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: { xs: 'column', md: 'row' },
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                fontWeight: 600,
                                                bgcolor: 'white',
                                                p: 2,
                                                gap: 2
                                            }}
                                        >
                                            {/* Delete Icon and Image */}
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexDirection: 'column' }}>
                                                <Image
                                                    src={item.workPhotoPaths?.[0]?.url}
                                                    width={80}
                                                    height={80}
                                                    alt="product image"
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        objectFit: 'cover'
                                                    }}
                                                    loading="lazy"
                                                />
                                                <Typography
                                                    sx={{
                                                        fontSize: '1rem',
                                                        cursor: 'pointer',
                                                        color: 'inherit',
                                                        transition: 'color 0.2s',
                                                        '&:hover': {
                                                            color: 'red'
                                                        }
                                                    }}
                                                >
                                                    {item?.title}
                                                </Typography>

                                            </Box>
                                            {/* Quantity */}
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 3,
                                                    border: '1px solid #ccc',
                                                    py: 2,
                                                    px: 4,
                                                    width: { xs: '100%', md: 'auto' },
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>

                                                    <Typography>{item.qty}</Typography>

                                                </Box>
                                            </Box>
                                            {/* Subtotal */}
                                            <Box
                                                sx={{
                                                    width: { xs: '100%', md: 'auto' },
                                                    textAlign: { xs: 'left', md: 'right' },
                                                    mt: { xs: 2, md: 0 }
                                                }}
                                            >
                                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', }}>
                                                    <p>${item.price}</p>
                                                    <p>${item.price * item.qty}</p>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))
                                )}
                            </Box>
                            <Box sx={{ textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'medium', py: 2, borderBottom: '1px solid #CBD5E0' }}>
                                <Typography variant='body1'>Payment Details</Typography>
                            </Box>
                            <Typography className='py-2'>
                                Total Paid{' '}
                                <span className='text-xl font-semibold'>${totalAmt}</span>
                            </Typography>
                            <Button
                                onClick={() => dispatch(resetOrder())}
                                variant='outlined'
                                sx={{
                                    mt: 5,
                                    borderColor: '#8B5CF6',
                                    py: 1,
                                    px: 4,
                                    fontWeight: 'medium',
                                    borderRadius: '0.375rem',
                                    '&:hover': {
                                        borderColor: '#D1D5DB',
                                        backgroundColor: '#8B5CF6',
                                        color: '#FFFFFF',
                                    },
                                }}
                            >
                                Reset Order
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                maxWidth: '100%',
                                height: '100vh',
                                backgroundColor: '#dedede',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                flexDirection: 'column',
                                justifyContent: "center"

                            }}
                        >
                            <Typography variant='body1'>Nothing to show </Typography>
                            <Link href={'/'}>
                                <Button
                                    className='bg-black mt-2 text-slate-100 w-44 h-12 rounded-full text-base font-semibold hover:bg-orange-600 duration-300'
                                    variant='contained'
                                    color='primary'
                                >
                                    Continue Shopping
                                </Button>
                            </Link>
                        </Box>
                    )}
                </>
            )
            }
        </>
    )
}
export default OrderDetails;
