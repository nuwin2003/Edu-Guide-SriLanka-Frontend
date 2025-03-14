// authService.js
const authService = {
    setToken: (token) => {
        localStorage.setItem('jwtToken', token);
    },

    getToken: () => {
        return localStorage.getItem('jwtToken');
    },

    removeToken: () => {
        localStorage.removeItem('jwtToken');
    }
};

export default authService;