import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import AboutUsImg from "../assets/AboutUsImg.png";

const AboutUs = () => {
    return (
        <Grid container sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center'}}>
                <Box component='img' src={AboutUsImg} width={500} height={550}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography sx={{fontWeight: 600, fontSize: 20}}>
                        ABOUT US
                    </Typography>
                    <Typography sx={{fontWeight: 600, fontSize: 20}}>
                        Empowering Your Educational Journey: Connecting You to the Best Universities and Courses
                    </Typography>
                    <Typography sx={{fontWeight: 500, color: '#757575', mt: 2}}>
                        At EduGuide, we’re committed to helping you find the perfect academic path. From top
                        universities and specialized courses to tailored study streams based on your interests, we
                        connect you with the opportunities that best fit your aspirations. Start your journey with
                        EduGuide and discover a world of options designed to support your goals and fuel your success.
                    </Typography>
                    <Typography sx={{fontWeight: 500, color: '#757575', mt: 2}}>
                        We believe that education is the key to unlocking a successful future. That's why we strive to
                        provide personalized support and resources that inspire students to make informed decisions. Our
                        goal is to make the process of finding the right university, course, or study stream seamless,
                        straightforward, and accessible to all.
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AboutUs;