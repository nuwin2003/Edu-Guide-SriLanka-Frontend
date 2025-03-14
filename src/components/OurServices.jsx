import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import Service1 from "../assets/services/Service1.png"
import Service2 from "../assets/services/Service2.png"
import Service3 from "../assets/services/Service3.png"
import Service4 from "../assets/services/Service4.png"
import OurServiceCard from "./OurServiceCard.jsx";

const OurServices = () => {

    const services = [
        {
            title: "Discover Top Universities",
            content: "Browse through our comprehensive list of universities, each offering unique courses, facilities, and opportunities to match your aspirations. Start exploring and find your ideal campus.",
            icon: Service1
        },
        {
            title: "Discover Your Desired Stream",
            content: "Discover range of A/L streams, each offering specialized subjects to align with your academic interests and future aspirations. You can get the recommendation based on your interest. Choose the path that best supports your goals and get ready to excel!",
            icon: Service2
        },
        {
            title: "Find the Perfect Course",
            content: "Our platform provides in-depth details on a variety of courses available, from undergraduate to postgraduate programs. Make an informed decision with our detailed course insights.",
            icon: Service3
        },
        {
            title: "Feedback and Reviews",
            content: "We value your experience and continuously work to improve our services. Share your feedback to help us enhance your EduConnect journey and provide the best educational resources.",
            icon: Service4
        },
    ];

    return (
        <Grid container p={4} mt={8}>
            <Grid item xs={12}>
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
                    <Typography sx={{fontWeight: 600, fontSize: 25}}>
                        Our Services
                    </Typography>
                    <Typography sx={{color: '#757575', fontWeight: 500, maxWidth: 510, textAlign: 'center'}}>
                        Guiding You Every Step of the Way—Explore, Learn, and Succeed with Our Comprehensive Services
                    </Typography>
                </Box>

            </Grid>

            {services.map((service) => (
                <Grid item xs={12} sm={6} md={3}>
                    <OurServiceCard service={service}/>
                </Grid>
            ))}

        </Grid>
    );
};

export default OurServices;