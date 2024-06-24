import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

const SuccessPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 20,
      }}
    >
      <Box
        sx={{
          maxWidth: '90%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ fontSize: { xs: '24px', md: '32px' }, fontWeight: 700, }}>Your Payment Accepted by shoppingmart.com</Typography>
        <Typography sx={{ fontSize: { xs: '16px', md: '18px' }, mt: 2 }}>Now you can view your orders or continue shopping with us.</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 3, md: 5 },
            mt: 3,
          }}
        >
          <Link href="/user/order" passHref>
            <Button variant="contained" sx={{ width: { xs: '100%', md: 'auto' } }}>View Orders</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outlined" sx={{ width: { xs: '100%', md: 'auto' } }}>Continue Shopping</Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SuccessPage;
