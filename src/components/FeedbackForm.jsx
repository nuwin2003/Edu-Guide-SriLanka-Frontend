import React, {useState} from 'react';
import {
    Box,
    Typography,
    TextField,
    Rating,
    Button,
    Container,
    Paper,
    styled
} from '@mui/material';

// Custom styled components
const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    borderRadius: 20,
    boxShadow: 'none',
    backgroundColor: '#FFFFFF',
}));

const SubmitButton = styled(Button)(({theme}) => ({
    backgroundColor: '#7095DE',
    color: 'white',
    padding: '12px',
    width: '100%',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#7095AF',
    },
}));

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        rating: 3,
        feedback: '',
    });

    const handleSubmit = () => {
    };

    return (
        <Container maxWidth={false} sx={{mt: 10, maxWidth: 1450}}>
            <Box sx={{display: 'flex', gap: 4}}>
                <Box sx={{flex: 1}}>
                    <Typography sx={{fontWeight: 700, color: '#3E70D0'}}>- RATE OUR SERVICES</Typography>
                    <StyledPaper>
                        <Typography variant="h6" sx={{mb: 3, fontWeight: 'bold'}}>
                            Share Your Experience with EduConnect
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit}>
                            <Typography sx={{mb: 1, color: '#757575', size: 15}}>Name</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                size='small'
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#F5F5F5',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {border: 'none'},
                                    },
                                }}
                            />

                            <Typography sx={{mb: 1, color: '#757575', size: 15}}>Your service rating</Typography>
                            <Rating
                                value={formData.rating}
                                onChange={(event, newValue) => {
                                    setFormData({...formData, rating: newValue});
                                }}
                                sx={{
                                    mb: 3,
                                    '& .MuiRating-iconFilled': {
                                        color: '#FFD700',
                                    },
                                }}
                                size="large"
                            />

                            <Typography sx={{mb: 1, color: '#757575', size: 15}}>Your feedback</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                size='small'
                                variant="outlined"
                                value={formData.feedback}
                                onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#F5F5F5',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {border: 'none'},
                                    },
                                }}
                            />

                            <SubmitButton type="submit" variant="contained">
                                SUBMIT
                            </SubmitButton>
                        </Box>
                    </StyledPaper>
                </Box>

                <Box sx={{flex: 0.75, pt: 8}}>
                    <Typography sx={{mb: 3, color: '#170F49', fontWeight: 700, fontSize: 40, maxWidth: 300,}}>
                        Fill the form to submit your feedback
                    </Typography>
                    <Typography sx={{color: '#6F6C90', maxWidth: 400,}}>
                        We value your experience and are committed to making our car auctions even better. Your feedback
                        helps us understand what we're doing right and where we can improve. Please take a moment to
                        share your thoughts—your input drives our progress and ensures we continue to meet your needs.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default FeedbackForm;