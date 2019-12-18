import React from 'react';
import AuthService from './service/AuthService';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: ''
    };
    this.Auth = new AuthService();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    const userInfo = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    };

    this.Auth.login(userInfo)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        alert(err);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Sign Up For An Account</h1>

        <label>Email</label>
        <input
          name='username'
          placeholder='Username'
          value={this.state.username}
          onChange={this.onChange}
        />
        <br />

        <label>Name</label>
        <input
          name='name'
          placeholder='Name'
          value={this.state.name}
          onChange={this.onChange}
        />
        <br />

        <label>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.onChange}
        />
        <br />

        <input type='submit' />
      </form>
    );
  }
}

export default Registration;
