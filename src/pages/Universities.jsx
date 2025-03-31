import React, {useState, useRef, useEffect} from 'react';
import {motion} from "framer-motion";
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
import axios from "axios";

// Replace this with your real Flask or ngrok URL
const baseURL = "http://localhost:";

const Universities = () => {
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Hello, My Name is EDUGUIDE, How can I assist you?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // We'll store the user's answers in local state
    const [skillInput, setSkillInput] = useState("");
    const [govInterest, setGovInterest] = useState("");
    const [zScore, setZScore] = useState("");
    const [district, setDistrict] = useState("");
    const [alStream, setAlStream] = useState("");

    // Step in the conversation flow: 0 to final
    // step 0 => prompt for skill_input
    // step 1 => prompt for gov_interest
    // (If "no", skip to final rec)
    // step 2 => prompt for z_score
    // step 3 => prompt for district
    // step 4 => prompt for al_stream
    // step 5 => we have all data => do server call
    const [step, setStep] = useState(0);

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // On mount: ask the first question
    useEffect(() => {
        // Only if no messages are present, to avoid double prints in dev mode
        if (messages.length === 0) {
            sendBotMessage("Hi! Let's get started. What skill area are you interested in?");
        }
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "auto"});
    };

    // Helper to append a message from the "assistant"
    const sendBotMessage = (text) => {
        const botMsg = {role: "assistant", content: text};
        setMessages((prev) => [...prev, botMsg]);
    };

    // When user hits "Send"
    const sendMessage = async () => {
        if (!inputMessage.trim()) return;
        // Add user’s message to chat
        const userMsg = {role: "user", content: inputMessage.trim()};
        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        // Grab user input from the text area
        const userReply = inputMessage.trim();

        // Clear input
        setInputMessage("");

        // We'll handle the logic based on current step
        switch (step) {
            case 0:
                // skill_input
                setSkillInput(userReply);
                setTimeout(() => {
                    sendBotMessage("Are you interested in government universities? (yes/no)");
                    setStep(1);
                    setIsLoading(false);
                }, 500);
                break;

            case 1:
                // gov_interest
                setGovInterest(userReply);
                if (userReply.toLowerCase().includes("yes")) {
                    // If yes => ask for z-score
                    setTimeout(() => {
                        sendBotMessage("Please enter your Z-score:");
                        setStep(2);
                        setIsLoading(false);
                    }, 500);
                } else {
                    // If "no", skip everything & finalize
                    setTimeout(() => {
                        sendBotMessage("Alright, skipping government unis. Let me process your request...");
                        setStep(5); // jump directly to final
                        handleFinalRecommendation();
                    }, 500);
                }
                break;

            case 2:
                // z_score
                setZScore(userReply);
                // Next => ask district
                setTimeout(() => {
                    sendBotMessage("Got it. Please enter your district:");
                    setStep(3);
                    setIsLoading(false);
                }, 500);
                break;

            case 3:
                // district
                setDistrict(userReply);
                // Next => ask al_stream
                setTimeout(() => {
                    sendBotMessage("Finally, what's your A-Level stream?");
                    setStep(4);
                    setIsLoading(false);
                }, 500);
                break;

            case 4:
                // al_stream
                setAlStream(userReply);
                // Next => we have all data, do server call
                setTimeout(() => {
                    sendBotMessage("Great! Let me process your request...");
                    setStep(5);
                    handleFinalRecommendation();
                }, 500);
                break;

            default:
                // If we are beyond step 4, do nothing
                setIsLoading(false);
                break;
        }
    };

    // Once we have skillInput, govInterest, (optional) zScore, district, alStream => call the Flask endpoint
    const handleFinalRecommendation = async () => {
        setIsLoading(true);
        try {
            // Build the payload
            const payload = {
                skill_input: skillInput,
                gov_interest: govInterest,
                z_score: zScore ? parseFloat(zScore) : undefined,
                district,
                al_stream: alStream,
            };

            // Call the server
            const response = await axios.post(`${baseURL}/recommend`, payload, {
                headers: {
                    "Content-Type": "application/json",
                    // Optionally skip the ngrok warning
                    "ngrok-skip-browser-warning": "1",
                },
            });

            const responseData = response.data;

            // Let's build a user-friendly final message
            let finalMessage = `Here are your recommendations:\n\n`;

            // 1) matched_career, matched_score, matched_skill_text
            const matchedCareer = responseData.matched_career || "N/A";
            const matchedScore = responseData.matched_score || 0;
            const matchedSkillText = responseData.matched_skill_text || "N/A";
            finalMessage += `**Matched Career**: ${matchedCareer}\n`;
            finalMessage += `**Matched Score**: ${matchedScore}\n`;
            finalMessage += `**Skill Text**: ${matchedSkillText}\n\n`;

            // 2) Private
            if (responseData.private_universities && responseData.private_universities.length > 0) {
                finalMessage += `**Private Universities**:\n`;
                responseData.private_universities.forEach((uni, index) => {
                    finalMessage += `${index + 1}) **${uni.University}**\n`;
                    finalMessage += `   Degree: ${uni.Degree}\n`;
                    if (uni.Link) finalMessage += `   Link: ${uni.Link}\n`;
                    if (uni.Similarity_Score !== undefined) {
                        finalMessage += `   Similarity: ${uni.Similarity_Score}\n`;
                    }
                    finalMessage += "\n";
                });
            } else {
                finalMessage += "No private university recommendations.\n\n";
            }

            // 3) Government
            if (responseData.government_universities) {
                if (Array.isArray(responseData.government_universities)) {
                    if (responseData.government_universities.length > 0) {
                        finalMessage += `**Government Universities**:\n`;
                        responseData.government_universities.forEach((uni, idx) => {
                            finalMessage += `${idx + 1}) **${uni.University}**\n`;
                            finalMessage += `   Degree: ${uni.Degree}\n`;
                            if (uni.Z_score_Program !== undefined) {
                                finalMessage += `   Z-Score Program: ${uni.Z_score_Program}\n`;
                            }
                            if (uni.Stream) finalMessage += `   Stream: ${uni.Stream}\n`;
                            if (uni.Similarity_Score !== undefined) {
                                finalMessage += `   Similarity: ${uni.Similarity_Score}\n`;
                            }
                            finalMessage += "\n";
                        });
                    } else {
                        finalMessage += "No government university recommendations.\n";
                    }
                } else {
                    // Not an array
                    finalMessage += `Government data: ${JSON.stringify(responseData.government_universities, null, 2)}\n`;
                }
            }

            const finalMsg = {role: "assistant", content: finalMessage};
            setMessages((prev) => [...prev, finalMsg]);
        } catch (error) {
            console.error("Error in final recommendation:", error);
            const errMsg = {
                role: "assistant",
                content: "⚠️ An error occurred: " + error.toString(),
            };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    // Keep your formatMessageContent function
    function formatMessageContent(content) {
        const sections = content.split(/(```[\s\S]*?```|`[\s\S]*?`)/g);
        return sections
            .map((section) => {
                if (section.startsWith("```") && section.endsWith("```")) {
                    section = section.split("\n").slice(1).join("\n");
                    const code = section.substring(0, section.length - 3);
                    return `<pre><code class="code-block">${code}</code></pre>`;
                } else if (section.startsWith("`") && section.endsWith("`")) {
                    const code = section.substring(1, section.length - 1);
                    return `<code class="inline-code">${code}</code>`;
                } else {
                    return section.replace(/\n/g, "<br>");
                }
            })
            .join("");
    }

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

                    <Box sx={{ flexGrow: 1, overflow: "auto", mb: 2 }}>
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
                                            sx={{ width: 40, height: 40, mx: 1 }}
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
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {formatMessageContent(message.content)}
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
                            placeholder="Type a message"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (inputMessage) {
                                        sendMessage();
                                    }
                                }
                            }}
                            sx={{
                                backgroundColor: "#FFFFFF",
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                        />
                        <IconButton
                            color="primary"
                            onClick={() => {
                                sendMessage()
                            }}
                            disabled={isLoading || !inputMessage.trim()}
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