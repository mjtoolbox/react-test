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
  // const isLogged = useSelector(state => state.isLogged);

  render() {
    const { isLogged, username } = this.props;
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
              {isLogged && <Logout />}
            </ul>
          </div>
        </nav>{' '}
        <br />
        {isLogged && <h2>Welcome Home page. {username} You are logged in!</h2>}
        {!isLogged && <h2>Please log in.</h2>}
        <div>{!isLogged && <Link to='/login'>login page</Link>}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  if (state.isLogged == true) {
    const { isLogged, userInfo } = state;
    const { username } = userInfo;
    return {
      isLogged,
      username
    };
  }
}

export default connect(mapStateToProps)(Home);
