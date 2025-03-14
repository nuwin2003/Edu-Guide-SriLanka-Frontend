import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    Stack,
    Box,
    Slider
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuggestionService from "../services/SuggestionService.js";
import StreamResultDialog from "./StreamResultDialog.jsx";

const questions = [
    { id: 1, text: "Enter your O/L Mathematics Grade:", type: "select", options: ["A", "B", "C", "S", "F"] },
    { id: 2, text: "Enter your O/L Science Grade:", type: "select", options: ["A", "B", "C", "S", "F"] },
    { id: 3, text: "Enter your O/L Commerce Grade:", type: "select", options: ["A", "B", "C", "S", "F"] },
    { id: 4, text: "Enter your O/L English Grade:", type: "select", options: ["A", "B", "C", "S", "F"] },
    { id: 5, text: "Enter your O/L IT Grade:", type: "select", options: ["A", "B", "C", "S", "F"] },
    { id: 6, text: "Enter your Favorite Subject:", type: "text" },
    { id: 7, text: "Enter your Career Interest:", type: "text" },
    { id: 8, text: "Enter your Logical Thinking Score (1-10):", type: "slider", min: 1, max: 10 },
    { id: 9, text: "Enter your Analytical Skills Score (1-10):", type: "slider", min: 1, max: 10 },
    { id: 10, text: "Enter your Creativity Level:", type: "select", options: ["Low", "Medium", "High"] }
];

const StudyPathForm = () => {
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState(null);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: questions.reduce((acc, q) => ({
            ...acc,
            [`question${q.id}`]: q.type === "slider" ? 5 : ''
        }), {})
    });

    const onSubmit = async (data) => {
        const unanswered = questions.some((q) => data[`question${q.id}`] === '');
        if (unanswered) {
            toast.error('Please answer all questions before submitting.');
            return;
        }

        const formattedData = {
            'O/L_Mathematics_Grade': data.question1,
            'O/L_Science_Grade': data.question2,
            'O/L_Commerce_Grade': data.question3,
            'O/L_English_Grade': data.question4,
            'O/L_IT_Grade': data.question5,
            'Favorite_Subject': data.question6,
            'Career_Interest': data.question7,
            'Logical_Thinking_Score': data.question8,
            'Analytical_Skills_Score': data.question9,
            'Creativity_Level': data.question10
        };

        console.log('Formatted Data Sent to API:', formattedData);

        try {
            const response = await SuggestionService.suggestStream(formattedData);
            console.log('Response from API:', response);
            setResponse(response);
            setOpen(true);
        } catch (e) {
            console.error('Error in API call:', e);
            toast.error('Error in fetching stream suggestion. Please try again.');
        }
    };

    return (
        <Card sx={{ backgroundColor: '#F3F3F3', p: 2, overflow: 'auto', maxHeight: 600, scrollbarWidth: 'none' }}>
            <ToastContainer />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Typography sx={{ fontSize: 22, fontWeight: 600, textAlign: 'center', maxWidth: 500 }}>
                        A/L STREAM RECOMMENDATION
                    </Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 600, textAlign: 'center', maxWidth: 500 }}>
                        Discover Your Ideal Study Path with EduGuide
                    </Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 500, color: '#757575', textAlign: 'center', maxWidth: 800 }}>
                        Answer a few questions to discover the study stream that aligns with
                        your interests and goals. Let EduGuide guide you to the perfect
                        academic path!
                    </Typography>
                </Box>

                <Box m={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={3}>
                            {questions.map((question) => (
                                <Box key={question.id}>
                                    <Typography sx={{ fontWeight: 'bold', mb: 1 }}>{question.text}</Typography>
                                    <Controller
                                        name={`question${question.id}`}
                                        control={control}
                                        render={({ field }) => (
                                            question.type === "select" ? (
                                                <Select {...field} fullWidth variant="outlined">
                                                    {question.options.map((option, index) => (
                                                        <MenuItem key={index} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            ) : question.type === "slider" ? (
                                                <Slider
                                                    {...field}
                                                    value={field.value || 5}
                                                    onChange={(_, value) => field.onChange(value)}
                                                    min={question.min}
                                                    max={question.max}
                                                    step={1}
                                                    marks
                                                />
                                            ) : (
                                                <TextField {...field} fullWidth variant="outlined" placeholder="Type your answer here" />
                                            )
                                        )}
                                    />
                                </Box>
                            ))}

                            <Box>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ backgroundColor: '#7095DE' }}
                                >
                                    PREDICT YOUR A/L STREAM
                                </Button>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </CardContent>
            <StreamResultDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    reset();
                }}
                response={response}
            />
        </Card>
    );
};

export default StudyPathForm;
