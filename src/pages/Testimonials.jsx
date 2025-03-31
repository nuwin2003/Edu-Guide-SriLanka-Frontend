import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Photo1 from '../assets/testimonials/Photo1.png';
import Photo2 from '../assets/testimonials/Photo2.png';
import Photo3 from '../assets/testimonials/Photo3.png';
import VideoImg from '../assets/testimonials/VideoImg.png';
import TestimonialsCard from "../components/TestimonialsCard.jsx";

const Testimonials = () => {

    const testimonials = [
        {
            image: Photo1,
            comment: "Lorem ipsum dolor sit amet consectetur. Aliquet lacinia nunc sem pharetra neque aenean massa. ",
            name: "Lorem ipsum"
        },
        {
            image: Photo2,
            comment: "Lorem ipsum dolor sit amet consectetur. Aliquet lacinia nunc sem pharetra neque aenean massa. ",
            name: "Lorem ipsum"
        },
        {
            image: Photo3,
            comment: "Lorem ipsum dolor sit amet consectetur. Aliquet lacinia nunc sem pharetra neque aenean massa. ",
            name: "Lorem ipsum"
        },
    ];

    return (
        <Grid container xs={12}>
            <Grid item xs={12}>
                <Box sx={{display: 'flex', gap: 1, justifyContent: 'center', m: 1}}>
                    <Typography sx={{fontWeight: 600, fontSize: 30}}>
                        Our
                    </Typography>
                    <Typography sx={{fontWeight: 600, fontSize: 30, color: '#7095DE'}}>
                        Testimonials
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', m: 2}}>
                <Box component='img' src={VideoImg} width={1150} height={375} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{mt: 5, mb: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Typography sx={{fontWeight: 600, fontSize: 25}}>
                        Lorem Lipsum
                    </Typography>
                    <Typography sx={{color: '#757575', fontWeight: 550, fontSize: 15, maxWidth: 600}}>
                        Lorem ipsum dolor sit amet consectetur. Volutpat ut gravida est viverra mauris donec convallis leo maecenas.
                    </Typography>
                </Box>
            </Grid>
            <Grid container spacing={3} justifyContent="center" sx={{m: 2}}>
                {testimonials.map((testimonial, index) => (
                    <Grid item key={index} xs={12} sm={6} md={3} sx={{display: 'flex', justifyContent: 'center'}}>
                        <TestimonialsCard testimonial={testimonial}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Testimonials;