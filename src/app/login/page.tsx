'use client';
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Notification from "@/components/Notification/Notification";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (response?.ok) {
                toast.success("Logged in successfully!", {
                    position: 'top-center'
                });
                router.push("/");
            } else if (response?.error) {
                toast.error("Invalid email or password. Please try again!", {
                    position: 'top-center'
                });
            }
        } catch (err) {
            console.log(err);
            toast.error("An error occurred. Please try again.", {
                position: 'top-center'
            });
        }
    };

    const loginWithGoogle = () => {
        signIn("google", { callbackUrl: "/" });
    };

    const boxStyle1 = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
    };

    const boxStyle2 = {
        backgroundColor: "white",
        padding: 4,
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
    };

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={boxStyle1}>
                    <Box sx={boxStyle2}>
                        <Typography variant="h5" sx={{ marginBottom: 3, textAlign: "center" }}>
                            Login to your account
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                autoComplete="current-email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                required
                            />
                            <TextField
                                label="Password"
                                autoComplete="current-password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                Don&apos;t have an account? <Link href="/signin" passHref>Sign In</Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Notification />

        </>
    );
};

export default Login;
