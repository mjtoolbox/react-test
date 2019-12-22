import React from 'react';
import axios from 'axios';
import { decode } from 'punycode';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { userActions } from './../actions';
import { connect } from 'react-redux';

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
        // this.setToken(res.data.token);
        this.setUserProfile(res.data);
        return Promise.resolve(res);
      })
    .catch(err => {
      console.log('Authentication failed', err);
    });
  }

  signup(userInfo) {
    return axios
      .post(API_BASE_URL + '/register', userInfo)
      .then(res => {
        if (res.data.status === 200) {
          this.setUserProfile(res.data);

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

  setUserProfile(data) {
    sessionStorage.setItem('userProfile', JSON.stringify(data));
  }
  getUserProfile() {
    return JSON.parse(sessionStorage.getItem('userProfile'));
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

  // Really it should name it as getToken()
  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getUserProfile().token);
  }

  getAuthHeader() {
    console.log(this.getUserInfo());
    return {
      headers: {
        // Authorization: 'Bearer ' + this.getUserInfo().token
        Authorization: 'Bearer ' + this.getProfile()
      }
    };
  }

  logOut() {
    sessionStorage.removeItem('userProfile');
    sessionStorage.removeItem('isLogged');
    return axios.post(API_BASE_URL + '/token/logout', {}, this.getAuthHeader());
  }
}

export default AuthService;
