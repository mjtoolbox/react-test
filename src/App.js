import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import Home from './Home';
import LoginComponent from './LoginComponent';
import News from './News';
import StudentList from './StudentList';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('userInfo') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginComponent} />
          <Route exact path='/news' component={News} />
          <AuthenticatedRoute exact path='/students' component={StudentList} />
          {/* <AuthenticatedRoute path='/oss/students' component={StudentList} /> */}
        </Switch>
      </Router>
    );
  }
}

function wrongUrl() {
  return (
    <div>
      <h1>404 Wrong URL</h1>
      <br />
      <h2>
        Please naviage to <Link to='/'>login page</Link>
      </h2>
    </div>
  );
}

export default App;
