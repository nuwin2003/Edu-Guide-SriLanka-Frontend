import React from 'react';
import {Box, Typography} from "@mui/material";

const OurServiceCard = ({service}) => {
    return (
        <Box sx={{
            backgroundColor: '#F3F3F3',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '10px',
            height: 400,
            m: 2,
            cursor: 'pointer'
        }}>
            <Box component='img' src={service.icon} width={80} height={80} margin={1}
                 sx={{backgroundColor: '#7095DE', borderRadius: '10px', p: 1}}/>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center'}}>
                <Typography sx={{fontWeight: 600, fontSize: 16}}>
                    {service.title}
                </Typography>
                <Typography sx={{color: '#757575', fontSize: 16}}>
                    {service.content}
                </Typography>
            </Box>
        </Box>
    );
};

export default OurServiceCard;