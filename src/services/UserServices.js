import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/user",
});

const userService = {
    // Sign In
    signIn: async (userDTO) => {
        const apiRequest = {
            email: userDTO.email,
            password: userDTO.password
        };
        console.log(apiRequest);
        try {
            const response = await axiosInstance.post('/sign-in', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on sign-in", error);
            throw error;
        }
    },

    // Sign Up
    signUp: async (userDTO) => {
        try {
            const response = await axiosInstance.post('/sign-up', userDTO);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            throw error;
        }
    },
};

export default userService;