'use client';
import WorkList from '@/components/WorkList/WorkList';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const OrderDetails = () => {
  const { favoriteData } = useSelector((state: any) => state.shopping);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Simulating end of loading for demonstration purposes
  }, []);

  console.log('favoriteData', favoriteData)



  return (
    <>
      {!isLoading && (
        <>
          {
            favoriteData && favoriteData.length > 0 ? (
              <WorkList workList={favoriteData} />
            ):(

              <Box
              sx={{
                  maxWidth: '100%',
                  height: '100vh',
                  backgroundColor: '#dedede',
                  display:'flex',
                  alignItems:'center',
                  gap:2,
                  flexDirection:'column',
                  justifyContent:"center"

              }}
              className='py-10 bg-white text-black text-2xl text-center'>
              <Typography variant='body1'>Nothing to show your wishlist emty</Typography>
              <Link href={'/'}>
                  <Button
                      variant='contained'
                      color='primary'
                  >
                      Continue Shopping
                  </Button>
              </Link>
          </Box>

            )
        }
        </>
      )
      }
    </>
  )
}
export default OrderDetails;
