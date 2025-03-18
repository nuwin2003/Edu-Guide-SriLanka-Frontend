import React, {useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import SignUpImg from '../assets/SignUpImg.png';
import {useNavigate} from "react-router-dom";
import userServices from '../services/userServices';
import {toast} from "react-toastify";
import EduGuideLogo from '../assets/EduGuide_Logo.png';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignUp = async () => {
        if (!formData.userName || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        const userDTO = {
            userName: formData.userName,
            email: formData.email,
            password: formData.password
        };

        try {
            const response = await userServices.signUp(userDTO);
            console.log("Sign up response:", response);

            if (response?.status === "success") {
                toast.success(response.message);
                navigate("/login");
            } else {
                toast.error(response.message || "Sign up failed. Please try again.");
            }
        } catch (error) {
            console.log("Error during sign up:", error);
        }
    };

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'center', position: 'relative', height: '100%'}}>
                <Box sx={{
                    position: 'absolute',
                    width: {sm: '90%', xs: '100%'},
                    height: '103%',
                    backgroundColor: '#E6EEFF',
                    left: {sm: '-3%', xs: '-1%'},
                    top: '-3%',
                    zIndex: 1,
                }}/>
                <Box component="img" src={SignUpImg} alt="Excited professional" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {lg: 653, sm: 400, xs: '100%'},
                    height: 'auto',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    zIndex: 2,
                    position: 'relative',
                }}/>
            </Grid>

            <Grid item xs={12} md={6}
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
                            SIGN UP
                        </Typography>
                        <Typography variant="body2" align="left" sx={{mb: 3, color: '#757575', fontWeight: 500}}>
                            Sign Up to Unlock Your Future: Create Your Account to Receive Personalized Course Recommendations and Explore Leading Universities!
                        </Typography>
                        <Box component="form" sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Name"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                sx={{backgroundColor: '#FFFFFF'}}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                sx={{backgroundColor: '#FFFFFF'}}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                sx={{backgroundColor: '#FFFFFF'}}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: '#7095DE',
                                    color: 'white',
                                    '&:hover': {backgroundColor: '#0086F0'},
                                    // textTransform: 'none',
                                    py: 1.5
                                }}
                                onClick={handleSignUp}
                            >
                                Proceed
                            </Button>
                        </Box>
                        <Box sx={{display: 'flex', mt: 2, gap: 1, justifyContent: 'center'}}>
                            <Typography variant="body2">
                                Already have an account?
                            </Typography>
                            <Typography variant="body2" sx={{color: "#0086C0", cursor: 'pointer'}}
                                        onClick={() => navigate("/login")}>
                                Sign In
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Grid>
        </Grid>
    );
};

export default SignUp;
