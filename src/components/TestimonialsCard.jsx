import React from "react";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const TestimonialsCard = ({testimonial}) => {
    return (
        <Card
            sx={{
                maxWidth: 300,
                borderRadius: 3,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "0.3s",
                "&:hover": {boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)"},
            }}
        >
            <CardMedia
                component="img"
                height="350"
                image={testimonial?.image}
                alt={testimonial?.name}
                sx={{objectFit: "cover"}}
            />
            <CardContent sx={{textAlign: "center"}}>
                <Typography
                    sx={{fontSize: 14, color: '#757575', textAlign: 'left', fontWeight: 500, mb: 1}}
                >
                    {testimonial?.comment}
                </Typography>
                <Typography
                    sx={{fontWeight: 500, textAlign: 'left', fontSize: 12, color: "#BEBEBE", mt: 1}}
                >
                    {testimonial?.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default TestimonialsCard;
