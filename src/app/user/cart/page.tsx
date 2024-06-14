'use client';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Cart() {
  const [totalAmt, setTotalAmt] = useState(0);
  const [rowPrice, setRowPrice] = useState(0);


  // Price value



  return (
    <>
      {1 > 0 ? (
        <Box sx={{ paddingX: 5, paddingTop: 10 }}>
          <Typography variant='h4' sx={{ borderBottom: '1px dotted #134D17', marginY: 3 }}>Your Cart</Typography>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <TableHead sx={{ bgcolor: 'yellow' }}>
                <TableRow>
                  <TableCell >Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantiy</TableCell>
                  <TableCell align="center">SubTotal Pricce</TableCell>
                  <TableCell align="center">Saving</TableCell>
                </TableRow>
              </TableHead>
              {/* {productData.map((item: ProductType) => (
                <TableBody key={item?.id}>
                  <TableRow>
                    <TableCell >
                      <Grid display="flex" gap={2}>
                        <DeleteIcon
                          onClick={() => {
                            dispatch(deleteProduct(item?.id)),
                              toast.success(`${item.attributes.title} is remoived from Cart!`);
                          }} />

                        <Image src={item?.attributes?.image?.data?.attributes.url} alt='image' width={50} height={50} />
                        <Typography variant='h6' marginTop={1}>{item.attributes?.title}</Typography>
                      </Grid>
                    </TableCell>
                    <TableCell align='center'>
                      <FormattedPrice amount={item?.attributes?.price} />
                    </TableCell>
                    <TableCell align='center'>
                      <Grid >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <KeyboardDoubleArrowLeftIcon
                            onClick={() => item?.attributes?.quantity > 1 ? dispatch(decreaseQuantity(item)) &&
                              toast.success(
                                "Quantity decreased Successfully!"
                              ) : toast.error("Can not delete less than 1")
                            } />
                          <Typography variant='h6'>{item?.attributes?.quantity}</Typography>
                          <KeyboardDoubleArrowRightIcon
                            onClick={() => {
                              dispatch(increaseQuantity(item)),
                                toast.success(`${item?.attributes?.title} quantity added`)
                            }} />

                        </Box>
                      </Grid>

                    </TableCell>
                    <TableCell align="center">
                      <FormattedPrice amount={item?.attributes?.price * item?.attributes?.quantity} />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ bgcolor: 'black', color: '#31FA1B', display: 'inline-flex' }}>

                        {calculatePerecentage(item?.attributes?.price, item?.attributes?.prvPrice)} {" "}%save

                      </Box>

                    </TableCell>
                  </TableRow>
                </TableBody>
              ))} */}
            </Table>
          </TableContainer>
          {/* <ModalCart /> */}
          <Grid container sx={{ marginBottom: 5 }}>
            <Grid item xs={12} md={6} sx={{ bgcolor: 'white', paddingY: 2 }}>
              <Box sx={{ marginX: 2 }}>
                <Typography sx={{ borderBottom: '1px dotted #2345ED', paddingBottom: 2 }}>Cart Summary</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                  <Typography>Total Items</Typography>
                  <Typography>
                  11
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                  <Typography>Price</Typography>
                  <Typography>
                    456465$
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                  <Typography>Discount</Typography>
                  <Typography>
                    45654$
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 2 }}>
                  <Typography>Total Price</Typography>
                  <Typography>6546</Typography>
                </Box>

                {true ? (
                  <Button 
                    variant="outlined" color="success" sx={{ marginY: 2, '&:hover': { bgcolor: 'orange' }, width: '100%' }} >
                    <Typography sx={{ color: 'black', }}>Proceed to Checkout</Typography>
                  </Button>

                ) : (
                  <>
                    <Button
                      variant="outlined" color="success" sx={{ marginY: 2, '&:hover': { bgcolor: 'orange' }, width: '100%' }} >
                      <Typography sx={{ color: 'black', }}>Proceed to Checkout</Typography>
                    </Button>
                    <Typography
                      sx={{
                        color: 'red',
                        animation: 'bounce 1s ease-in-out infinite', // bounce animation properties
                        paddingTop: 2,
                        '@keyframes bounce': {
                          '0%, 20%, 50%, 80%, 100%': {
                            transform: 'translateY(1)',
                          },
                          '40%': {
                            transform: 'translateY(-10px)', // Adjust the distance of the bounce
                          },
                          '40': {
                            transform: 'translateY(-20px)', // Adjust the distance of the bounce
                          },
                        },
                      }}
                    >Please login to continue</Typography>
                  </>
                )}

              </Box>
            </Grid>
          </Grid>
        </Box>) : (
        <Box sx={{ paddingX: 5, paddingTop: 10 }}>
          <Typography variant='h4' sx={{ borderBottom: '1px dotted #134D17', marginY: 3 }}>Your Cart</Typography>
          <Box sx={{ display: 'flex', paddingY: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><br />
            <Typography sx={{ fontFamily: 'bold', fontSize: '25px' }}>Your Cart is Empty</Typography>
            <Link href={"/"} >
              <Typography sx={{ '&:hover': { color: 'orange', textDecoration: "underline" }, color: 'black' }}> Go back to Shopping</Typography>
            </Link>

          </Box>

        </Box>

      )}
      {/* <Toaster position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#000",
                        color: "#fff",
                    }
                }} /> */}

    </>










  );
}