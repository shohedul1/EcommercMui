
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Notification from "@/components/Notification/Notification";
import { useRouter } from "next/navigation";

interface FormDataType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: File | null;
    [key: string]: string | File | null;
}

const initialState: FormDataType = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
};

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const [state, setState] = useState<FormDataType>(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        if (type === 'file' && files) {
            setState({ ...state, [name]: files[0] });
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const router = useRouter();

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(state.password === state.confirmPassword);
    }, [state.password, state.confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password } = state;

        try {
            const profileImage = await uploadImage();
            if (!profileImage) {
                toast.error("Image upload failed.");
                return;
            }

            const userSingup = {
                username,
                email,
                password,
                profileImage
            };

            const response = await fetch('/api/register', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(userSingup)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message, {
                        position: 'top-center'
                    });
                    setState(initialState);
                    setTimeout(() => {
                        router.push('/login');
                    }, 1000);
                } else {
                    toast.error(data.message, {
                        position: 'top-center'
                    });
                }
            } else {
                toast.error("There was a problem with your request.", {
                    position: 'top-right'
                });
            }
        } catch (error: any) {
            setState(initialState);
            toast.error(error.message || "An error occurred");
        }
    };

    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";
    const uploadImage = async () => {
        if (!state.profileImage) return null;
        const formdata = new FormData();
        formdata.append("file", state.profileImage);
        formdata.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formdata
            });
            const data = await res.json();
            return {
                id: data['public_id'],
                url: data['secure_url']
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "white",
                            padding: 4,
                            borderRadius: "10px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                            width: "100%",
                            maxWidth: "400px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center", color: "black" }}>
                            Register an account
                        </Typography>
                        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                            <label htmlFor="image" style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                                <DownloadForOfflineIcon sx={{ textAlign: 'center' }} />
                                <Typography variant="body1" sx={{ color: "black" }}>
                                    Upload Profile Photo
                                </Typography>
                                <input
                                    type="file"
                                    id="image"
                                    name="profileImage"
                                    onChange={handleChange}
                                    accept="image/*"
                                    style={{ display: "none" }}
                                />
                            </label>

                            {state.profileImage && (
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: 'center',
                                }}>
                                    <img
                                        src={URL.createObjectURL(state.profileImage)}
                                        alt="Profile"
                                        style={{
                                            maxWidth: '80px',
                                            maxHeight: '80px',
                                            marginTop: '10px',
                                            borderRadius: "50%",
                                        }}
                                    />
                                </Box>
                            )}

                            <TextField
                                label="Username"
                                name="username"
                                value={state.username}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                            />

                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={state.email}
                                onChange={handleChange}
                                autoComplete="current-email"
                                name="email"
                                type="email"
                                required
                            />

                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                autoComplete="new-password"
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                required
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {!passwordMatch && (
                                <p style={{ color: "red" }}>Passwords are not matched!</p>
                            )}

                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                autoComplete="current-password"
                                fullWidth
                                margin="normal"
                                value={state.confirmPassword}
                                onChange={handleChange}
                                name="confirmPassword"
                                required
                                type={confirmShowPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setConfirmShowPassword((prev) => !prev)}
                                                edge="end"
                                            >
                                                {confirmShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    marginTop: 2,
                                    backgroundImage: "linear-gradient(to right, indigo, purple, pink)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundImage: "linear-gradient(to right, indigo, purple, pink)",
                                    },
                                }}
                            >
                                Login
                            </Button>
                        </form>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={loginWithGoogle}
                            sx={{
                                marginTop: 2,
                                backgroundImage: "linear-gradient(to right, indigo, purple, pink)",
                                color: "white",
                                "&:hover": {
                                    backgroundImage: "linear-gradient(to right, indigo, purple, pink)",
                                },
                            }}
                            startIcon={<GoogleIcon />}
                        >
                            Log In with Google
                        </Button>
                        <Box sx={{ textAlign: "center", marginTop: 2 }}>
                            <Typography variant="body2" color="primary">
                                Don&apos;t have an account? <Link href="/login" passHref>Sign Up</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Notification />
        </>
    );
};

export default Signin;
