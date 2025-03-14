import React from 'react';
import {Box, Grid} from "@mui/material";
import StreamImg from '../assets/stream/StreamImg.png';
import StudyPathForm from "../components/StudyPathForm.jsx";
import UniversitiesForm from '../components/UniversitiesForm.jsx';

const Universities = () => {
    return (
        <Grid container gap={4} mb={4} >
            <Grid item xs={12} md={4} m={5}>
                <Box component='img' src={StreamImg} width={450} height={535} />
            </Grid>
            <Grid item xs={12} md={6} m={2}>
                <UniversitiesForm />
            </Grid>
        </Grid>
    );
};

export default Universities;