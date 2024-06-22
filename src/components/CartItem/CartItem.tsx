
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Box, Typography } from "@mui/material";
import { decreaseQty, deleteProduct, increaseQty } from "@/lib/redux/shoppingSlice";

const CartItem = () => {
    const { productData } = useSelector((state: any) => state?.shopping);
    const dispatch = useDispatch();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header Row */}
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
                <Typography sx={{ flex: '1 0 33%' }}>Product</Typography>
                <Typography sx={{ flex: '1 0 33%', display: 'flex', justifyContent: 'center' }}>Quantity</Typography>
                <Typography sx={{ flex: '1 0 33%', display: 'flex', justifyContent: 'flex-end' }}>Subtotal</Typography>
            </Box>
            {/* Product Rows */}
            {productData?.map((item: any) => (
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Typography
                            onClick={() => dispatch(deleteProduct(item._id))}
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
                            <DeleteIcon />
                        </Typography>
                        <Image
                            src={item.workPhotoPaths?.[0]?.url || "/"}
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
                            <Typography
                                onClick={() => dispatch(decreaseQty(item._id))}
                                sx={{ cursor: 'pointer' }}
                            >
                                <RemoveOutlinedIcon />
                            </Typography>
                            <Typography>{item.qty}</Typography>
                            <Typography
                                onClick={() => dispatch(increaseQty(item._id))}
                                sx={{ cursor: 'pointer' }}
                            >
                                <AddIcon />
                            </Typography>
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
            ))}
        </Box>
    );
}

export default CartItem;

