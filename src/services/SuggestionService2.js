import axios from 'axios';

const API_URL = "http://127.0.0.1:5001";  // Correct Flask API URL

const SuggestionService2 = {
    predictDegree: async (userResponseSkills) => {  // Fix function name
        try {
            const response = await axios.post(`${API_URL}/predict-degree`, userResponseSkills);
            return response.data;
        } catch (error) {
            console.error("Error fetching degree prediction:", error);
            throw error;
        }
    }
};

export default SuggestionService2;
