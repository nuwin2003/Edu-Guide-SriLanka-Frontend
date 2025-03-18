import React from 'react';
import {Box, Button, Grid, Typography} from "@mui/material";
import InitialViewImg from '../assets/InitialViewImg.png';
import {useNavigate} from "react-router-dom";

const InitialView = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{backgroundColor: "#E6EEFF"}}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <Box p={{sm: 8, xs: 4}} sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                            <Typography sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, lineHeight: 1.2}}>
                                Find the{' '}
                            </Typography>
                            <Typography
                                sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, color: '#7095DE', lineHeight: 1.2}}>
                                Right Path{' '}
                            </Typography>
                            <Typography sx={{fontSize: {xs: 35, md: 50}, fontWeight: 600, lineHeight: 1.2}}>
                                to
                            </Typography>
                            <Typography sx={{
                                fontSize: {xs: 35, md: 50},
                                fontWeight: 600,
                                lineHeight: 1.2,
                                display: 'block',
                                width: '100%'
                            }}>
                                Your Dream Career
                            </Typography>
                        </Box>
                        <Typography sx={{color: "#757575", fontSize: 20, fontWeight: 600}}>
                            Explore a wide range of universities and courses and A/L stream that align with your passion
                            and career goals. Let us guide you to make the best educational choices and create a
                            brighter future.
                        </Typography>
                        <Button sx={{
                            width: 180,
                            height: 40,
                            borderRadius: 2,
                            backgroundColor: '#7095DE',
                            color: '#FFFFFF',
                            '&:hover': {backgroundColor: '#7095AF'}
                        }}>
                            <Typography sx={{fontWeight: 600, textTransform: 'none'}} onClick={() => {
                                navigate("/home/contact-us");
                            }}>Choose your Path</Typography>
                        </Button>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box component='img' src={InitialViewImg} width={{sm: 560, xs: 300}} height={{sm: 600}}>
                    </Box>
                </Grid>
            </Grid>
        </Box>

    );
};

export default InitialView;