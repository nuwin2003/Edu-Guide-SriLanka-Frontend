import React from 'react';
import {
    Dialog,
    DialogContent,
    Typography,
    IconButton,
    Button,
    Box
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import Science from '../assets/streamIcons/science.png';
import Commerce from '../assets/streamIcons/commerce.png';
import Arts from '../assets/streamIcons/art.png';
import Technology from '../assets/streamIcons/technology.png';

const streamDescriptions = {
    Science: "Based on your interest and the data given by you, we suggest science stream as you have strong analytical and experimental skills",
    Commerce: "Based on your interest and the data given by you, we suggest commerce stream as you have business acumen and financial understanding",
    Arts: "Based on your interest and the data given by you, we suggest arts stream as you have creative thinking and analytical abilities",
    Technology: "Based on your interest and the data given by you, we suggest technology stream as you have strong aptitude for engineering concepts, practical applications, and technical problem-solving skills in areas like electronics, mechanics, and engineering science",
};

const streamIconMap = {
    Science: Science,
    Commerce: Commerce,
    Arts: Arts,
    Technology: Technology
};

const StreamResultDialog = ({ open, onClose, response }) => {
    const streamName = response?.streamName || 'Science';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    p: 2
                }
            }}
        >
            <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon size={20} />
                </IconButton>
            </Box>

            <DialogContent>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 2
                }}>
                    <Box component='img' src={streamIconMap[streamName]} width={80} height={80} />

                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        {streamName} Stream
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {streamDescriptions[streamName]}
                    </Typography>

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={onClose}
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            py: 1.5,
                            borderRadius: 1,
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                    >
                        OK
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default StreamResultDialog;
