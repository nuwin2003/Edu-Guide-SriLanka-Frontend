import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SuggestionService2 from "../services/SuggestionService2.js";
import DegreeResultDialog from "./DegreeResultDialog.jsx";

const DegreePredictionForm = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      skills: ''
    }
  });

  const onSubmit = async (data) => {
    if (!data.skills) {
      toast.error('Please enter your skills before submitting.');
      return;
    }

    const requestBody = { skills: data.skills };
    console.log('Sending request:', requestBody);

    try {
      const response = await SuggestionService2.predictDegree(requestBody);
      console.log("response : ", response);
      setResponse(response);
      setOpen(true);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <Card sx={{ backgroundColor: '#F3F3F3', p: 2, overflow: 'auto', maxHeight: 600, scrollbarWidth: 'none' }}>
      <ToastContainer />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Typography sx={{ fontSize: 22, fontWeight: 600, textAlign: 'center', maxWidth: 500 }}>
            Degree Prediction with EduGuide
          </Typography>
          <Typography
            sx={{ fontSize: 16, fontWeight: 500, color: '#757575', textAlign: 'center', maxWidth: 800 }}
          >
            Enter your skills to get a recommended degree program
          </Typography>
        </Box>

        <Box m={2}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={3}>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enter your skills (comma-separated)"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Box>
            <Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ backgroundColor: '#7095DE' }}
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </CardContent>
      <DegreeResultDialog
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

export default DegreePredictionForm;
