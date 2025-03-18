import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import LoginImg from '../assets/LoginImg.png';
import {useNavigate} from "react-router-dom";
import userServices from "../services/UserServices.js";
import {toast} from "react-toastify";
import EduGuideLogo from '../assets/EduGuide_Logo.png';
import authService from "../services/AuthService.js";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const userDTO = {
                email: formData.email,
                password: formData.password,
            };

            const response = await userServices.signIn(userDTO);
            console.log("response : ", response);
            if (response?.status === 'success') {
                authService.setToken(response.token);
                toast.success(response.message);

                localStorage.setItem('userId', response.userId);
                localStorage.setItem('userName', response.userName);
                navigate('/home');
            } else {
                toast.error(response?.message || "An unexpected error occurred.");
            }

        } catch (error) {
            console.log("Error in Login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6.5}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box component='img' src={EduGuideLogo} height={100} width={210} m={2} />
                    <Box sx={{
                        borderColor: '#D8D8D8',
                        borderWidth: 3,
                        borderStyle: 'solid',
                        padding: 4,
                        borderRadius: 5,
                        width: '100%',
                        maxWidth: 500,
                        maxHeight: '90vh',
                        overflowY: 'auto',
                    }}>
                        <Typography variant="h4" component="h1" align="left" gutterBottom
                                    sx={{fontWeight: 600, color: '#7095DE'}}>
                            SIGN IN
                        </Typography>
                        <Typography variant="body2" align="left" sx={{mb: 3, color: '#757575', fontWeight: 500}}>
                            Log In to Discover Your Dream Course and University: Get Personalized Guidance and Explore Top Institutions!
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}
                             sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <TextField
                                fullWidth
                                name="email"
                                variant="outlined"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                                sx={{backgroundColor: '#FFFFFF'}}
                            />
                            <TextField
                                fullWidth
                                name="password"
                                variant="outlined"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                error={Boolean(errors.password)}
                                helperText={errors.password}
                                sx={{backgroundColor: '#FFFFFF'}}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    backgroundColor: '#7095DE',
                                    color: 'white',
                                    '&:hover': {backgroundColor: '#0086F0'},
                                    // textTransform: 'none',
                                    py: 1.5
                                }}
                            >
                                {loading ? 'Signing in...' : 'Proceed'}
                            </Button>
                        </Box>

                        <Box sx={{display: 'flex', mt: 2, gap: 1, justifyContent: 'center'}}>
                            <Typography variant="body2">
                                If you don’t have an account ?
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{color: "#7095DE", cursor: 'pointer'}}
                                onClick={() => navigate("/sign-up")}
                            >
                                Register
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Grid>
            <Grid item xs={12} md={5.5}
                  sx={{display: 'flex', justifyContent: 'right', position: 'relative', height: '100%'}}>
                <Box
                    component="img"
                    src={LoginImg}
                    alt="Excited professional"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: 'auto',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        position: 'relative',
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Login;
