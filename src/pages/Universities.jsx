import React, {useState, useRef, useEffect} from 'react';
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    Grid,
    Avatar,
    CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBotImg from '../assets/ChatBotImg.png';
import chatService from "../services/ChatService.js";

const Universities = () => {
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Hello, My Name is EDUGUIDE, How can I assist you?'
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            content: inputValue
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Simulated API call - replace with actual API integration
            const response = await chatService.chat(inputValue);

            // Add bot response
            const botMessage = {
                type: 'bot',
                content: response
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                type: 'error',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsLoading(false);
            setInputValue('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Grid container spacing={2} sx={{mb: 8, mt: 5}}>
            <Grid item xs={6} sx={{display: 'flex', justifyContent: 'center'}}>
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.8, ease: "easeOut"}}
                >
                    <Box component="img" src={ChatBotImg} sx={{width: 500, height: 500}}/>
                </motion.div>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Paper
                    elevation={3}
                    sx={{
                        width: 500,
                        height: 500,
                        backgroundColor: "#F3F3F3",
                        p: 4,
                        borderRadius: 4,
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <Typography variant="h5" sx={{fontWeight: 600, textAlign: "center", mb: 3}}>
                        EduGuide : Your Learning Companion
                    </Typography>

                    <Box sx={{flexGrow: 1, overflow: "auto", mb: 2}}>
                        {messages.map((message, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    mb: 2
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        maxWidth: '80%',
                                        flexDirection: message.type === 'user' ? 'row-reverse' : 'row'
                                    }}
                                >
                                    {message.type === 'bot' && (
                                        <Avatar
                                            src={ChatBotImg}
                                            sx={{width: 40, height: 40, mx: 1}}
                                        />
                                    )}
                                    <Paper
                                        sx={{
                                            p: 2,
                                            backgroundColor: message.type === 'user'
                                                ? '#007BFF'
                                                : message.type === 'error'
                                                    ? '#ffebee'
                                                    : '#FFFFFF',
                                            color: message.type === 'user' ? '#FFFFFF' : 'text.primary',
                                            borderRadius: 2,
                                        }}
                                    >
                                        <Typography sx={{whiteSpace: 'pre-wrap'}}>
                                            {message.content}
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Box>
                        ))}
                        {isLoading && (
                            <Box sx={{display: 'flex', justifyContent: 'flex-start', mb: 2}}>
                                <CircularProgress size={20}/>
                            </Box>
                        )}
                        <Box ref={messagesEndRef}/>
                    </Box>

                    <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            sx={{
                                backgroundColor: "#FFFFFF",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            sx={{
                                backgroundColor: '#007BFF',
                                color: '#FFFFFF',
                                '&:hover': {
                                    backgroundColor: '#0056b3'
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#cccccc'
                                }
                            }}
                        >
                            <SendIcon/>
                        </IconButton>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Universities;