import React, {useRef, useState} from 'react';
import {Box, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import ContactUsImg from '../assets/ContactUsImg.png';
import Phone from '../assets/contactUs/Phone.png';
import Fax from '../assets/contactUs/Fax.png';
import Email from '../assets/contactUs/Email.png';
import {toast} from 'react-toastify';
import emailjs from '@emailjs/browser';

const ContactUs = () => {

    const form = useRef();
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
        <Grid container mt={5}>
            <Grid item xs={12} md={6} p={5} pl={10}>
                <Box>
                    <Box sx={{display: 'flex', gap: 0.5}}>
                        <Typography sx={{fontWeight: 700, color: '#000000', fontSize: 50}}>
                            Get in
                        </Typography>
                        <Typography sx={{fontWeight: 700, color: '#3E70D0', fontSize: 50}}>
                            Touch
                        </Typography>
                    </Box>

                    <Typography sx={{maxWidth: 525, color: '#757575', fontSize: 16, fontWeight: 500}}>
                        Get in Touch: We're Ready to Assist You! Whether you have questions or need guidance, our
                        dedicated team is here to support you on your educational journey!
                    </Typography>
                </Box>
                <Box component="form" ref={form} onSubmit={sendEmail} sx={{
                    display: 'flex',
                    justifyContent: {lg: 'left', xs: 'center'},
                    flexDirection: 'column',
                    gap: 2,
                    backgroundColor: 'white',
                    width: {md: 500, xs: '100%'},
                    p: 2,
                    borderRadius: '10px',
                    position: 'relative',
                }}>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        size='small'
                        name="from_name"
                        value={formData.from_name}
                        onChange={handleInputChange}
                        error={Boolean(errors.from_name)}
                        helperText={errors.from_name}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        size='small'
                        name="from_email"
                        value={formData.from_email}
                        onChange={handleInputChange}
                        error={Boolean(errors.from_email)}
                        helperText={errors.from_email}
                    />
                    <TextField
                        fullWidth
                        label="Message"
                        variant="outlined"
                        multiline
                        rows={4}
                        size='small'
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        error={Boolean(errors.message)}
                        helperText={errors.message}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{
                            alignSelf: 'flex-start', backgroundColor: '#3E70D0',
                            '&:hover': {
                                backgroundColor: '#3E70D0',
                            },
                        }}
                    >
                        SEND
                    </Button>
                </Box>

                <Box sx={{display: 'flex', gap: 4, m: 2}}>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box component='img' src={Phone} width={28} height={28}/>
                        <Stack>
                            <Typography sx={{fontSize: 13, fontWeight: 600}}>
                                PHONE
                            </Typography>
                            <Typography sx={{fontSize: 13, color: '#757575'}}>
                                03 5432 1234
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box component='img' src={Fax} width={28} height={28}/>
                        <Stack>
                            <Typography sx={{fontSize: 13, fontWeight: 600}}>
                                FAX
                            </Typography>
                            <Typography sx={{fontSize: 13, color: '#757575'}}>
                                03 5432 1234
                            </Typography>
                        </Stack>
                    </Box>
                    <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                        <Box component='img' src={Email} width={28} height={28}/>
                        <Stack>
                            <Typography sx={{fontSize: 13, fontWeight: 600}}>
                                EMAIL
                            </Typography>
                            <Typography sx={{fontSize: 13, color: '#757575'}}>
                                info@EduConnect.com
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box component='img' src={ContactUsImg} width={680} height={570}/>
            </Grid>
        </Grid>
    );
};

export default ContactUs;