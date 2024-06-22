import OrderDetails from '@/components/orderDetails/orderDetails';
import { Box } from '@mui/material';

const Order = () => {

  return (
    <Box
      sx={{
        maxWidth: '100%',
        marginX: 'auto',
        paddingX: {
          xs: 4,
          xl: 12,
        },
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#dedede',
      }}
    >
      <OrderDetails />

    </Box>
  )
}

export default Order