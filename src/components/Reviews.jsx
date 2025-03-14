import {useState} from 'react';
import {Box, Grid, IconButton, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import Review from './Review';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import profile1 from '../assets/reviewProfiles/profile1.png';
import profile2 from '../assets/reviewProfiles/profile2.png';
import profile3 from '../assets/reviewProfiles/profile3.png';

const Reviews = () => {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const reviewsPerPage = 3;

    const handleNextPage = () => {
        setDirection(1);
        setPage((prevPage) => (prevPage + 1) % Math.ceil(reviews.length / reviewsPerPage));
    };

    const handlePrevPage = () => {
        setDirection(-1);
        setPage((prevPage) => (prevPage - 1 + Math.ceil(reviews.length / reviewsPerPage)) % Math.ceil(reviews.length / reviewsPerPage));
    };

    const variants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden', // Prevent horizontal scrollbar
        }}>
            <Typography sx={{
                fontSize: {lg: 30, sm: 25},
                fontWeight: 600,
                mt: 10,
                textTransform: 'uppercase',
            }}>
                What Students Say
            </Typography>
            <Typography sx={{
                fontSize: {xs: 12, md: 16},
                fontWeight: 500,
                color: '#757575',
                mb: {xs: -2, md: 3},
                textAlign: 'center',
                maxWidth: 600,
            }}>
                Here's what our students have to say about their experiences with EduConnect. We are proud to have
                guided thousands of students in finding the right university and course that suits their needs.
            </Typography>
            <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'} my={{xs: 2, md: 8}}>
                <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <IconButton onClick={handlePrevPage} sx={{
                        bgcolor: '#EBEBEB',
                        ":hover": {
                            bgcolor: '#0055FF',
                            opacity: '60%',
                            color: '#FFFFFF',
                        },
                        ":focus": {
                            outline: 'none',
                        },
                        display: {xs: 'none', md: 'flex'},
                    }}>
                        <ArrowBackRoundedIcon/>
                    </IconButton>
                </Grid>
                <Grid item md={11} xs={12} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <motion.div
                        key={page}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={variants}
                        transition={{
                            x: {type: "spring", stiffness: 200, damping: 40}, // Slower animation
                            opacity: {duration: 0.4}
                        }}
                        style={{display: 'flex', width: '100%'}}
                    >
                        <Grid container spacing={2}>
                            {reviews.slice(page * reviewsPerPage, (page + 1) * reviewsPerPage).map((review) => (
                                <Grid key={review.id} item md={4} xs={12} display={'flex'} justifyContent={'center'}
                                      alignItems={'center'}>
                                    <Review review={review}/>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Grid>
                <Grid item md={0.5} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <IconButton onClick={handleNextPage} sx={{
                        bgcolor: '#EBEBEB',
                        ":hover": {
                            bgcolor: '#0055FF',
                            opacity: '60%',
                            color: '#FFFFFF',
                        },
                        ":focus": {
                            outline: 'none',
                        },
                        display: {xs: 'none', md: 'flex'},
                    }}>
                        <ArrowForwardRoundedIcon/>
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reviews;

const reviews = [
    {
        id: 1,
        name: 'Carla',
        image: profile1,
        rating: 4,
        comment: 'EduConnect made my university search so much easier. The personalized guidance helped me find the perfect course that matches my career goals. I couldn\'t be happier with my choice!'
    },
    {
        id: 2,
        name: 'John',
        image: profile2,
        rating: 5,
        comment: 'Thanks to EduConnect, I was able to explore different universities and learn about their programs in detail. The application assistance was a game-changer for me. Highly recommended!'
    },
    {
        id: 3,
        name: 'Emma',
        image: profile3,
        rating: 5,
        comment: 'The course finder tool on EduConnect is fantastic! I found several options I hadn\'t even considered before. Their support team was there to answer all my questions and guide me throughout the process.'
    },
    {
        id: 4,
        name: 'Carla',
        image: profile1,
        rating: 4,
        comment: 'EduConnect made my university search so much easier. The personalized guidance helped me find the perfect course that matches my career goals. I couldn\'t be happier with my choice!'
    },
    {
        id: 5,
        name: 'John',
        image: profile2,
        rating: 5,
        comment: 'Thanks to EduConnect, I was able to explore different universities and learn about their programs in detail. The application assistance was a game-changer for me. Highly recommended!'
    },
    {
        id: 6,
        name: 'Emma',
        image: profile3,
        rating: 5,
        comment: 'The course finder tool on EduConnect is fantastic! I found several options I hadn\'t even considered before. Their support team was there to answer all my questions and guide me throughout the process.'
    },
];
