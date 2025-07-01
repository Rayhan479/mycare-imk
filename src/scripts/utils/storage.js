const Storage = {
    saveToken(token) {
        localStorage.setItem('accessToken', token);
    },
    getToken() {
        return localStorage.getItem('accessToken');
    },
    clearToken() {
        localStorage.removeItem('accessToken');
    },
};

export default Storage;