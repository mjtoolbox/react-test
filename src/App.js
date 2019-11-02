import React from 'react';
import './App.css';
import StudentList from './StudentList';
import Home from './Home';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import LoginComponent from './LoginComponent';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('userInfo') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
class App extends React.Component {
  render() {
    return (
      <Router>
        {/* <div>
          <ul>
            <li>
              <Link to='/students'>Student List</Link>
            </li>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </div> */}
        <Switch>
          <Route path='/' exact component={LoginComponent} />
          <AuthenticatedRoute exact path='/home' component={Home} />
          <AuthenticatedRoute path='/students' component={StudentList} />
        </Switch>
      </Router>
    );
  }
}

export default App;
