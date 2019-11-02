import React from 'react';
import AuthService from './service/AuthService';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    this.state = {
      username: '',
      password: '',
      message: ''
    };
    this.loginClicked = this.loginClicked.bind(this);
  }

  componentDidMount() {
    localStorage.clear();
  }

  loginClicked = e => {
    e.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password
    };

    AuthService.login(credentials)
      .then(res => {
        console.log(res.data);
        if (res.data.status === 200) {
          localStorage.setItem('userInfo', JSON.stringify(res.data.authToken));
          this.props.history.push('/home');
          console.log('home loaded');
        } else {
          this.setState({ message: res.data.message });
          console.log('Authentication failed');
        }
      })
      .catch(err => {
        alert(err);
      });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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
            <Typography variant='h4' style={styles.notification}>
              {this.state.message}
            </Typography>
            <TextField
              type='text'
              label='USERNAME'
              fullWidth
              margin='normal'
              name='username'
              value={this.state.username}
              onChange={this.onChange}
            />

            <TextField
              type='password'
              label='PASSWORD'
              fullWidth
              margin='normal'
              name='password'
              value={this.state.password}
              onChange={this.onChange}
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

export default LoginComponent;
