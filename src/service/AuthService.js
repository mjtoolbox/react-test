import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:8080/token/';

class AuthService {
  login(credentials) {
    return axios.post(AUTH_API_BASE_URL + 'generate-token', credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  getAuthHeader() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.getUserInfo().token
      }
    };
  }

  logOut() {
    localStorage.removeItem('userInfo');
    return axios.post(AUTH_API_BASE_URL + 'logout', {}, this.getAuthHeader());
  }
}

export default new AuthService();
