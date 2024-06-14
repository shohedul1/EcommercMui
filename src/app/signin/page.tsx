
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Notification from "@/components/Notification/Notification";
import { toast } from "react-toastify";

interface FormDataType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profileImage: File | null;
    [key: string]: string | File | null;
}

const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const [formData, setFormData] = useState<FormDataType>({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: name === "profileImage" ? (files ? files[0] : null) : value,
        });
    };

    const router = useRouter();

    const [passwordMatch, setPasswordMatch] = useState(true);

    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword);
    }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const registerForm = new FormData();

            for (const key in formData) {
                registerForm.append(key, formData[key] as Blob | string);
            }

            const response = await fetch(`/api/register`, {
                method: "POST",
                body: registerForm,
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success(data.message, {
                    position: 'top-center'
                });
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    profileImage: null,
                });
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
                toast.error(data.message, {
                    position: 'top-center'
                });
            }
        } catch (err: any) {
            toast.error("Registration failed: " + err.message, {
                position: 'top-center'
            });
            console.log("Registration failed", err);
        }
    };


    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    };
    console.log(formData);
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
                            Login to your account
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

                            {/* Display Profile Photo */}
                            {formData.profileImage && (
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: 'center',
                                }}>
                                    <img
                                        src={URL.createObjectURL(formData.profileImage)}
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

                            {/* Email Input */}
                            <TextField
                                label="Name"
                                name="username"
                                value={formData.username}
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
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                type="email"
                                required

                            />
                            {/* Password Input */}
                            <TextField
                                label="Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="password"
                                value={formData.password}
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
                            {/* Confirm Password Input */}
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={formData.confirmPassword}
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

                            {/* Login Button */}
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
                        {/* Login with Google Button */}
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
                        {/* Sign Up Link */}
                        <Box sx={{ textAlign: "center", marginTop: 2 }}>
                            <Typography variant="body2" color="primary">
                                Don&apos;t have an account? <Link href="/signup" passHref>Sign Up</Link>
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


