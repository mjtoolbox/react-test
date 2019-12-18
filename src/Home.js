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

function mapStateToProps(state) {
  return { isLogged: state.isLogged };
}

class Home extends React.Component {
  // const isLogged = useSelector(state => state.isLogged);
  render() {
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
            </ul>
          </div>
        </nav>{' '}
        <br />
        {/* {this.state.isLogged && ( */}
          <h2>Welcome Home page. You must be logged in.</h2>
        {/* )} */}
        <div>
          <Link to='/login'>login page</Link>
        </div>
        {/* <ReduxDemo></ReduxDemo> */}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Home);
