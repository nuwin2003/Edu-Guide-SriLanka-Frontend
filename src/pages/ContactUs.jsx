import React, {useRef, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import ContactUsImg from '../assets/ContactUsImg.png';
import {toast} from 'react-toastify';
import emailjs from '@emailjs/browser';

const ContactUs = () => {

    const form = useRef(null);
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.from_name) {
            tempErrors.from_name = "Name is required";
            isValid = false;
        }

        if (!formData.from_email) {
            tempErrors.from_email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
            tempErrors.from_email = "Email is not valid";
            isValid = false;
        }

        if (!formData.message) {
            tempErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const sendEmail = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Validate Success");
            emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_USER_ID)
                .then((result) => {
                    console.log("Email sent successfully:", result.text);
                    toast.success("Email sent successfully!");
                    setFormData({from_name: '', from_email: '', message: ''});
                    setErrors({});
                }, (error) => {
                    console.log(error.text);
                    toast.error("Failed to send email. Please try again.");
                });
        } else {
            toast.error("Please fill all the fields before submitting the form.");
        }
    };

    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'left', position: 'relative', height: '100%'}}>
                <Box sx={{
                    position: 'absolute',
                    width: {sm: '100%', xs: '100%'},
                    height: '100%',
                    left: {sm: '-3%', xs: '-1%'},
                    top: '-3%',
                }}/>
                <Box component="img" src={ContactUsImg} alt="Excited professional" sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {lg: 653, sm: 400, xs: '100%'},
                    height: 'auto',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    position: 'relative',
                }}/>
            </Grid>

            <Grid item xs={12} md={6}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <Box sx={{
                    borderColor: '#D8D8D8',
                    borderWidth: 3,
                    borderStyle: 'solid',
                    padding: 4,
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: 500,
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }}>
                    <Typography variant="h4" component="h1" align="left" gutterBottom
                                sx={{fontWeight: 600, color: '#0086C0'}}>
                        CONTACT US
                    </Typography>
                    <Typography variant="body2" align="left" sx={{mb: 3, color: '#757575', fontWeight: 500}}>
                        Get in Touch: We're Here to Help! Have questions? Our team is ready to support your educational
                        journey!
                    </Typography>
                    <Box component="form" ref={form} onSubmit={sendEmail}
                         sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Name"
                            name="from_name"
                            value={formData.from_name}
                            onChange={handleInputChange}
                            sx={{backgroundColor: '#FFFFFF'}}
                            helperText={errors.from_name}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email Address"
                            name="from_email"
                            value={formData.from_email}
                            onChange={handleInputChange}
                            sx={{backgroundColor: '#FFFFFF'}}
                            helperText={errors.from_email}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            multiline
                            rows={5}
                            sx={{backgroundColor: '#FFFFFF'}}
                            helperText={errors.message}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                backgroundColor: '#0086C0',
                                color: 'white',
                                '&:hover': {backgroundColor: '#0086F0'},
                                // textTransform: 'none',
                                py: 1.5
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ContactUs;