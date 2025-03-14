import axios from 'axios';

const API_URL = "http://127.0.0.1:5000";  // Ensure this points to your Flask backend

const SuggestionService = {
    suggestStream: async (userResponseStreams) => {
        try {
            const response = await axios.post(`${API_URL}/predict`, userResponseStreams);
            return response.data;
        } catch (error) {
            console.error("Error fetching stream suggestion:", error);
            throw error;
        }
    }
};

export default SuggestionService;
