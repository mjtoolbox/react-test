import React from 'react';
import AuthService from './service/AuthService';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';
import { userActions } from './actions';
import { connect } from 'react-redux';

class Logout extends React.Component {
  state = {
    navigate: false
  };

  logout = () => {
    sessionStorage.clear('userInfo');
    sessionStorage.clear('isLogged');
    this.setState({ navigate: true });
    this.props.cleanStore();
  };

  render() {
    const { navigate } = this.state;

    if (navigate) {
      return <Redirect to='/logout' push={true} />;
    }

    return <Button onClick={this.logout}>Log out</Button>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    cleanStore: () => dispatch(userActions.logOut())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
