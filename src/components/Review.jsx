import {Avatar, Box, Rating, Typography} from '@mui/material'

const Review = ({review}) => {
    const {image, rating, comment} = review

    return (
        <Box sx={{
            width: {xs: '80%', md: 255, lg: 354,},
            height: {xs: 100, md: 115, lg: 152,},
            mt: {xs: 5, md: 0},
            bgcolor: '#EBEBEB',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Avatar src={image} alt={'image'} sx={{
                width: {xs: 50, sm: 60, md: 65, lg: 80,},
                height: {xs: 50, sm: 60, md: 65, lg: 80,},
                position: 'absolute',
                top: {xs: -20, md: -40,},
                left: 15,
            }}/>
            <Rating
                value={rating}
                readOnly
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                }}/>
            <Typography sx={{
                fontSize: {xs: 8, sm: 10, md: 9, lg: 10,},
                fontWeight: 500,
                color: '#757575',
                width: {xs: 297, sm: '100%', md: 297},
                height: 75,
                overflow: 'auto',
                scrollbarWidth: 'none',
                mt: {xs: 8, sm: 10, md: 5,},
                textAlign: 'center',
                px: {xs: 1, lg: 0},
            }}>
                {comment}
            </Typography>
        </Box>
    )
}

export default Review