import axios from 'axios';
import AuthService from './AuthService';

const API_BASE_URL = 'http://localhost:8080/';

/**
 * To be completed. Use API Service pattern.
 */
class StudentService {
  fetchStudent() {
    return axios.get(API_BASE_URL, AuthService.getAuthHeader());
  }

  fetchStudentById(userId) {
    return axios.get(
      API_BASE_URL + '/students' + userId,
      AuthService.getAuthHeader()
    );
  }

  deleteStudent(userId) {
    return axios.delete(
      API_BASE_URL + '/' + userId,
      AuthService.getAuthHeader()
    );
  }

  addStudent(user) {
    return axios.post('' + API_BASE_URL, user, AuthService.getAuthHeader());
  }

  editStudent(user) {
    return axios.put(
      API_BASE_URL + '/' + user.id,
      user,
      AuthService.getAuthHeader()
    );
  }
}

export default new StudentService();
