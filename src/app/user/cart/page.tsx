'use client';
// Import necessary components and hooks
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { resetCart } from '@/lib/redux/shoppingSlice';
import CartItem from '@/components/CartItem/CartItem';

// Navbar component
export default function Cart() {
  // Redux selector to get productData state
  const { productData } = useSelector((state: any) => state.shopping);
  const dispatch = useDispatch();

  // State to manage loading state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading effect (replace with actual data fetching logic)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2 seconds loading time
  }, []);

  return (
    <>
      {/* Conditional rendering based on productData and loading state */}
      {!loading ? (
        <Box sx={{
          maxWidth: '100vw', // Assuming you want to use full viewport width
          marginX: 'auto', // Center align horizontally
          padding: {
            xs: 4,  // Padding for extra small screens
            xl: 12, // Padding for extra large screens
          },
          py: 10, // Vertical padding
        }}>
          {
            productData.length > 0 ? (
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '2rem', // Adjusted to Material-UI's syntax
                    fontWeight: 600,
                    marginBottom: 2 // Adjusted to Material-UI's syntax
                  }}
                >Cart</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <CartItem />
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'end', mt: 2 }}>
                    <Button
                      sx={{
                        backgroundColor: 'red',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: 'black',
                        px: 3,
                        '&:hover': {
                          backgroundColor: 'black',
                          color: "white"
                        },
                        transition: 200
                      }}
                      onClick={() => dispatch(resetCart())}
                    >
                      reset cart
                    </Button>
                  </Box>
                  {/* <PaymentForm /> */}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  alignItems: 'center',
                  justifyItems: 'center',
                  bgcolor: 'white',
                  height: 96,
                  px: 4
                }}
              >
                <Typography sx={{
                  border: '1px solid red',
                  p: 2,
                  width: '100%',
                  alignItems: 'center'
                }} >Your product Cart is currently empty</Typography>
                <Link href={"/"} style={{textDecoration:'none'}}>
                  <Typography 
                  sx={{
                    bgcolor:'black',
                    color:'white',
                    py:2,
                    px:6,
                    "&:hover":{
                      bgcolor:'red',
                      transition:200,
                      color:'white'
                    }
                  }}
                  className="bg-darkText text-white py-2 px-6 rounded-md hover:bg-orange-600 duration-150">Return to shop</Typography>
                </Link>
              </Box>
            )
          }

        </Box>
      ) : (
        // Loading indicator while fetching data
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
