import React from 'react';
import AuthService from './service/AuthService';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { userActions } from './actions';
import { connect } from 'react-redux';

// import axios from 'axios';

const styles = {
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  notification: {
    display: 'flex',
    justifyContent: 'center',
    color: '#dc3545'
  }
};

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    //this.props.store.dispatch(userActions.logOut());

    this.state = {
      email: '',
      password: '',
      message: ''
    };

    this.Auth = new AuthService();

    this.onChange = this.onChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // sessionStorage.clear();
  }

  loginClicked = e => {
    e.preventDefault();

    const credentials = {
      email: this.state.email,
      password: this.state.password
    };

    // To use Redux with further detail state, user action
    this.Auth.login(credentials)
      .then(res => {
        // if (res.data.status === 200) {
        this.props.login(res.data);
        this.props.history.push('/');
        // } else {
        //   console.log('Login Failed!!! From LoginComponent');
        // }
      })
      .catch(err => {
        this.setState({
          message: 'Authentication failed. Please check your password.'
        });
        this.props.loginFailure(this.state.email);
      });

    // AuthService.login(credentials)
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.data.status === 200) {
    //       localStorage.setItem('userInfo', JSON.stringify(res.data.authToken));
    //       this.props.history.push('/home');
    //     } else {
    //       this.setState({ message: res.data.message });
    //       console.log('Authentication failed');
    //     }
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onClick = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({
      message: ''
    });
  };

  render() {
    return (
      <React.Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>React User Application</Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth='sm'>
          <Typography variant='h4' style={styles.center}>
            Login
          </Typography>
          <form>
            <Typography variant='h6' style={styles.notification}>
              {this.state.message}
            </Typography>
            <TextField
              type='text'
              label='EMAIL'
              fullWidth
              margin='normal'
              name='email'
              value={this.state.email}
              onChange={this.onChange}
              onClick={this.onClick}
            />

            <TextField
              type='password'
              label='PASSWORD'
              fullWidth
              margin='normal'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
              onClick={this.onClick}
            />

            <Button
              variant='contained'
              color='secondary'
              onClick={this.loginClicked}
            >
              Login
            </Button>
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: userProfile => dispatch(userActions.loginSuccess(userProfile)),
    loginFailure: email => dispatch(userActions.loginFailure(email))
  };
}

export default connect(null, mapDispatchToProps)(LoginComponent);
