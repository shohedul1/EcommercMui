'use client';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

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

    const handSingOut = () => {
        signOut({ callbackUrl: "/login" });
        setAnchorEl(null);
        handleMobileMenuClose();
    }

    const { data: session } = useSession();
    console.log(session)

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Box sx={{ bgcolor: 'white', }}>
            <Menu
                anchorEl={anchorEl}
                id={menuId}
                keepMounted
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                {session ? (
                    <Box sx={{ p: 2 }}>
                        <Link passHref href="/user/wishlist" style={{ color: 'black', textDecoration: 'none', }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>Wishlist</MenuItem>
                        </Link>
                        <Link passHref href="/user/cart" style={{ color: 'black', textDecoration: "none", }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>Cart</MenuItem>
                        </Link>
                        <Link passHref href="/user/order" style={{ color: 'black', textDecoration: "none", }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>Order</MenuItem>
                        </Link>
                        <Link passHref href="/user/shop" style={{ color: 'black', textDecoration: "none", }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>Your Shop</MenuItem>
                        </Link>
                        <Link passHref href="/user/create-work" style={{ color: 'black', textDecoration: "none", }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>Sell Your Work</MenuItem>
                        </Link>
                        <MenuItem
                            sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}

                            onClick={handSingOut}>
                            logout
                        </MenuItem>
                    </Box>
                ) : (
                    <Box sx={{ px: 4.5 }}>
                        <Link passHref href="/login" style={{ color: 'black', textDecoration: 'none', }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>LogIn</MenuItem>
                        </Link>
                        <Link passHref href="/signin" style={{ color: 'black', textDecoration: "none", }}>
                            <MenuItem onClick={handleMenuClose} sx={{
                                fontSize: '15px', fontWeight: 900, '&:hover': {
                                    color: "red" // Change text color to red on hover
                                },
                            }}>SignIn</MenuItem>
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
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
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
                            alt="Remy Sharp"
                            src="https://res.cloudinary.com/djhjt07rh/image/upload/v1717607036/next.js_blog_images/rs4otnmin2w5jg7j4d0s.jpg"
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
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Ecommerce
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center', justifyItems: "center" }}>
                        <Link href={"/user/cart"}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={40} color="error">
                                    <ShoppingCartIcon sx={{ color: "white" }} />
                                </Badge>
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
                                    alt="Remy Sharp"
                                    src={session?.user?.profileImagePath ?? session?.user?.image ?? ''}
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

