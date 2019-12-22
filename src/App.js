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
import Management from './Management';
import { connect } from 'react-redux';
import Alert from './Alert.js';

const AuthenticatedRoute = ({
  component: Component,
  restricted,
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem('userProfile') ? (
        restricted == false ? (
          <Component {...props} />
        ) : role === 'ADMIN' ? (
          <Component {...props} />
        ) : (
          <Alert />
        )
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
    const { isLogged, role } = this.props;

    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/login' component={LoginComponent} />
          <Route exact path='/news' component={News} />
          <AuthenticatedRoute
            exact
            path='/students'
            restricted={false}
            role={role}
            component={StudentList}
          />
          <AuthenticatedRoute
            exact
            path='/management'
            restricted={true}
            role={role}
            component={Management}            
          />
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

function restrictedPage() {
  return (
    <div>
      <h1>This page is restricted</h1>
      <br />
      <h2>
        Please naviage to <Link to='/home'>Home</Link>
      </h2>
    </div>
  );
}

function mapStateToProps(state) {
  if (state.isLogged == true) {
    const { isLogged, role } = state;
    return {
      isLogged,
      role
    };
  }
}

export default connect(mapStateToProps)(App);
