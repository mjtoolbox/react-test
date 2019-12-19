import React from 'react';
import axios from 'axios';
import { decode } from 'punycode';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginRequest, logout, loginSuccess } from '../actions';

const API_BASE_URL = 'http://localhost:8080';

class AuthService {
  constructor() {
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  login(credentials) {
    return axios
      .post(API_BASE_URL + '/token/generate-token', credentials)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          // localStorage.setItem('userInfo', JSON.stringify(res.data.authToken));
          this.setToken(res.data.authToken);
          //this.props.history.push('/home');
          return Promise.resolve(res);
        } else {
          this.setState({ message: res.data.message });
          console.log('Authentication failed');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  signup(userInfo) {
    return axios
      .post(API_BASE_URL + '/register', userInfo)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          // localStorage.setItem('userInfo', JSON.stringify(res.data.authToken));
          this.setToken(res.data.authToken);
          return Promise.resolve(res);
        } else {
          this.setState({ message: res.data.message });
          console.log('Authentication failed');
        }
      })
      .catch(err => {
        alert(err);
      });
  }

  // userInfo contains token, username
  setToken(idToken) {
    sessionStorage.setItem('userInfo', JSON.stringify(idToken));
  }

  loggedIn() {
    const token = this.getUserInfo().token;
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getUserInfo().token);
  }

  getUserInfo() {
    return JSON.parse(sessionStorage.getItem('userInfo'));
  }

  getAuthHeader() {
    console.log(this.getUserInfo());
    return {
      headers: {
        // Authorization: 'Bearer ' + this.getUserInfo().token
        Authorization: 'Bearer ' + this.getUserInfo()
      }
    };
  }

  logOut() {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('isLogged');
    //return axios.post(API_BASE_URL + '/token/logout', {}, this.getAuthHeader());
  }
}

export default AuthService;
