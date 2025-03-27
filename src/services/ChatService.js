import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
});

const chatService = {

    // Chat
    chat: async (userInput) => {
        try {
            const response = await axiosInstance.post('/chat', {userInput});
            console.log(response);
            return response.data.response;
        } catch (error) {
            console.error("Error on userInput", error);
            throw error;
        }
    },
};

export default chatService;