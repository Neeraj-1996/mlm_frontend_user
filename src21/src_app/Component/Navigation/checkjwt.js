import jwtDecode from 'jwt-decode';
import axios from 'axios';

const checkTokenExpiration = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken) {
        return false; // No access token found, likely not logged in
    }

    // Decode the token to get expiration time
    const { exp } = jwtDecode(accessToken);
    const isTokenExpired = Date.now() >= exp * 1000;

    if (isTokenExpired && refreshToken) {
        // Token has expired, attempt to refresh it
        try {
            const response = await axios.post('YOUR_API_URL/refresh-token', { refreshToken });
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return true; // Token refreshed successfully
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false; // Token refresh failed, user needs to log in again
        }
    }

    return !isTokenExpired; // Token is valid
};

export default checkTokenExpiration;