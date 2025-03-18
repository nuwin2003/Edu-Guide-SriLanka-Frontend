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
            if (error.response) {
                return error.response.data;
            } else {
                return { status: 'failure', message: "An unexpected error occurred." };
            }
        }
    },

    // Sign Up
    signUp: async (userDTO) => {
        try {
            const apiRequest = {
                userName: userDTO.userName,
                email: userDTO.email,
                password: userDTO.password
            };
            console.log(apiRequest);
            const response = await axiosInstance.post('/sign-up', apiRequest);
            return response.data;
        } catch (error) {
            console.error("Error on sign-up", error);
            if (error.response) {
                return error.response.data;
            } else {
                return { status: 'failure', message: "An unexpected error occurred." };
            }
        }
    },
};

export default userService;