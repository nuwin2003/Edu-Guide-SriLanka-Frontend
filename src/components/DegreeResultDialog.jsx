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

const DegreeResultDialog = ({ open, onClose, response }) => {
    const degreeName = response?.predictedDegree || 'No Recommendation'; // Use the actual model response

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
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        {degreeName} Degree
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {response?.explanation || "This recommendation is based on your skills."}
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

export default DegreeResultDialog;
