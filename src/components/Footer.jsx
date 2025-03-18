import React from 'react';
import {Box, Grid, IconButton, Link, Typography} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import logo from '../assets/Footer/logo.png';
import FacebookIcon from '../assets/Footer/facebookIcon.png'
import InstagramIcon from '../assets/Footer/instagramIcon.png'
import TiktokIcon from '../assets/Footer/tiktokIcon.png'
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: '#001846',
                color: 'white',
                py: 3,
                px: {xs: 2, sm: 10}
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <Box mb={2}>
                        <img src={logo} alt="logo" style={{
                            width: '100px',
                            height: '96px',
                            marginBottom: '5px'
                        }}/>
                    </Box>
                    <Typography variant="body2" color={"#BDBDBD"}>
                        EduGuide — Your partner in finding the best universities, courses, and study streams tailored to your interests. We help you make informed choices to achieve your educational and career aspirations, guiding you to the perfect path for a successful future.
                    </Typography>
                    <Box mt={2}>
                        <IconButton
                            color="inherit"
                            aria-label="Facebook"
                        >
                            <img src={FacebookIcon} alt="facebookIcon" style={{width: '30px', height: '30px'}}/>
                        </IconButton>

                        <IconButton color="inherit" aria-label="Instagram">
                            <img src={InstagramIcon} alt="instagramIcon" style={{width: '30px', height: '30px'}}/>
                        </IconButton>

                        <IconButton color="inherit" aria-label="Tiktok">
                            <img src={TiktokIcon} alt="instagramIcon" style={{width: '30px', height: '30px'}}/>
                        </IconButton>
                    </Box>
                </Grid>
                <Grid item display={{
                    xs: 'none',
                    sm: 'flex',
                }} sm={2}/>
                <Grid item xs={12} sm={2} mt={{xs: 2, sm: 12}}>
                    <Typography sx={{
                        fontSize: '17px',
                        fontWeight: '600'
                    }} gutterBottom>
                        USEFUL LINKS
                    </Typography>
                    <Typography onClick={() => navigate('/')} color="inherit"
                                sx={{mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500}}>
                        Home
                    </Typography>
                    <Typography onClick={() => navigate('stream')} color="inherit"
                                sx={{mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500}}>
                        Stream
                    </Typography>
                    <Typography onClick={() => navigate('universities')} color="inherit"
                                sx={{mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500}}>
                        Universities
                    </Typography>
                    <Typography onClick={() => navigate('testimonials')} color="inherit"
                                sx={{mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500}}>
                        Testimonials
                    </Typography>
                    <Typography onClick={() => navigate('contact-us')} color="inherit"
                                sx={{mb: 1, cursor: 'pointer', fontSize: 14, fontWeight: 500}}>
                        Contact Us
                    </Typography>
                </Grid>
                <Grid item display={{
                    xs: 'none',
                    sm: 'flex',
                }} sm={2}/>
                <Grid item xs={12} sm={2.9} mt={{xs: 2, sm: 12}}>
                    <Typography sx={{
                        fontSize: '17px',
                        fontWeight: '600'
                    }} gutterBottom>
                        CONTACTS
                    </Typography>
                    <Box sx={{display: 'flex', mb: 1}}>
                        <LocationOnIcon sx={{mr: 1}}/>
                        <Typography sx={{mb: 1, fontSize: 14, fontWeight: 500}}>
                            251 /A New Galle Road,
                            Bamblapitiya
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex', mb: 1}} onClick={() => window.location.href = 'tel:+61 450 225 194'}>
                        <PhoneIcon sx={{mr: 1}}/>
                        <Typography
                            sx={{mb: 1, fontSize: 14, fontWeight: 500, color: 'white', textDecoration: 'underline'}}>+61
                            0758353569</Typography>
                    </Box>
                    <Box sx={{display: 'flex', mb: 1}}>
                        <EmailIcon sx={{mr: 1}}/>
                        <Link href="mailto:educonnect@gmail.com" color="inherit"
                              sx={{mb: 1, fontSize: 14, fontWeight: 500}}>
                            educonnect@gmail.com
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Footer;
