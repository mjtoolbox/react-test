import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import AuthService from './service/AuthService';
import Logout from './Logout.js';

class Home extends React.Component {

  render() {
    const { isLogged, name, role } = this.props;
    return (
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link to={'/home'} className='navbar-brand'>
            HOME
          </Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to='/news' className='nav-link'>
                  News
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/students' className='nav-link'>
                  StudentList
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/management' className='nav-link'>
                  Management
                </Link>
              </li>
              {!isLogged &&
              <li className='nav-item'>
                <Link to='/login' className='nav-link'>
                  Login
                </Link>
              </li>}              
              {isLogged && <Logout />}
            </ul>
          </div>
        </nav>{' '}
        <br />
        {isLogged && <h2>Welcome {name}, you are logged in! Your role is {role}</h2>}
        {!isLogged && <h2>Please log in.</h2>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.isLogged == true) {
    const { isLogged, userProfile, role } = state;
    const { email, name } = userProfile;
    return {
      isLogged,
      name, 
      role
    };
  }
}

export default connect(mapStateToProps)(Home);
