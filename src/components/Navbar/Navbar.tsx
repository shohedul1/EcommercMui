
'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: "/login" });
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const handleCart = () => {
        router.push("/user/cart")
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const { data: session } = useSession();
    const user = session?.user;

    //searchQuery 
    const [query, setQuery] = React.useState('');
    const router = useRouter();
    const searchWork = async () => {
        router.push(`/user/search/${query}`);
    }

    //redux
    const { productData } = useSelector((state: any) => state.shopping);

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Box sx={{ bgcolor: 'white' }}>
            <Menu
                anchorEl={anchorEl}
                id={menuId}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {session ? (
                    <Box sx={{ p: 2 }}>
                        <Link passHref href="/user/wishlist" style={{ color: 'black', textDecoration: 'none' }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Wishlist</MenuItem>
                        </Link>
                        <Link passHref href="/user/cart" style={{ color: 'black', textDecoration: "none" }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Cart</MenuItem>
                        </Link>
                        <Link passHref href="/user/order" style={{ color: 'black', textDecoration: "none" }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Order</MenuItem>
                        </Link>
                        <Link passHref href={`/user/shop/?id=${user?.id}`} style={{ color: 'black', textDecoration: "none" }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Your Shop</MenuItem>
                        </Link>
                        <Link passHref href="/user/create-work" style={{ color: 'black', textDecoration: "none" }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Sell Your Work</MenuItem>
                        </Link>
                        <MenuItem onClick={handleSignOut} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Logout</MenuItem>
                    </Box>
                ) : (
                    <Box sx={{ px: 4.5 }}>
                        <Link passHref href="/login" style={{ color: 'black', textDecoration: 'none' }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Log In</MenuItem>
                        </Link>
                        <Link passHref href="/signin" style={{ color: 'black', textDecoration: "none" }}>
                            <MenuItem onClick={handleMenuClose} sx={{ fontSize: '15px', fontWeight: 900, '&:hover': { color: "red" } }}>Sign In</MenuItem>
                        </Link>
                    </Box>
                )}
            </Menu>
        </Box>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{ mt: 2 }}
        >
            <MenuItem onClick={handleCart}>

                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    {mounted && (
                        <Badge badgeContent={productData ? productData.length : "0"} color="error" sx={{ mr: 2 }}>
                            <ShoppingCartIcon sx={{ color: "black" }} />
                        </Badge>
                    )}
                    <p>cart</p>
                </IconButton>

            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {session ? (
                        <Avatar
                            alt="User Avatar"
                            src={
                                typeof session?.user?.profileImagePath === "string"
                                    ? session?.user?.profileImagePath // If it's already a string (direct URL)
                                    : session?.user?.profileImagePath?.url // If it's an object, access the url property
                            }
                        />
                    ) : (
                        <AccountCircle />
                    )}
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: 'darkslategray',
                    paddingX: { xs: 1, lg: 5 },
                    py: 2
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Link href={"/"}><MenuIcon sx={{ color: "white" }} /></Link>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Ecommerce
                    </Typography>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            p: 1,
                            alignItems: 'center',
                            display: 'flex',
                            border: '1px solid #e0e0e0',
                            gap: 1,
                            ml: { sx: 1, md: 5 }
                        }}
                    >
                        <InputBase
                            type='text'
                            placeholder='Search...'
                            sx={{
                                outline: 'none',
                                borderBottom: 'none',
                                color: 'white',
                                flex: 1,
                                '& input': {
                                    padding: '8px',
                                    color: 'white',
                                },
                                '&:hover': {
                                    borderBottom: 'none',
                                },
                                '&:focus': {
                                    borderBottom: 'none',
                                },
                            }}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <SearchIcon sx={{ color: 'white' }} onClick={searchWork} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', justifyItems: "center" }}>
                        <Link href={"/user/cart"}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                {mounted && (
                                    <Badge badgeContent={productData.length} color="error">
                                        <ShoppingCartIcon sx={{ color: "white" }} />
                                    </Badge>
                                )}
                            </IconButton>
                        </Link>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {session ? (
                                <Avatar
                                    alt="User Avatar"
                                    src={
                                        typeof session?.user?.profileImagePath === "string"
                                            ? session?.user?.profileImagePath
                                            : session?.user?.profileImagePath?.url
                                    }
                                />
                            ) : (
                                <AccountCircle />
                            )}
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}


