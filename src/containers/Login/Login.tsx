import React from "react";
import "./Login.scss";
// import { Link } from "react-router-dom";
import { Firebase } from "../../config/firebase";
import { Button } from "antd";

interface LoginProps {}

interface ILogin {
  email: any;
  password: string;
}

export class Login extends React.Component<LoginProps, ILogin> {
  state: ILogin = {
    email: "",
    password: ""
  };

  login(e: any) {
    e.preventDefault();
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }

  signUp(e: any) {
    e.preventDefault();
    Firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        console.log(u);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleEmail(e: any) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e: any) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="Login">
        <p className="login-message">Welcome to fake Spotify!</p>
        <form className="login-form">
          <div className="form-input-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email address"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
            />
          </div>
          <Button
            className="btn-login"
            shape="round"
            onClick={this.login.bind(this)}
          >
            <b>Login</b>
          </Button>
          {/* <button onClick={this.signUp.bind(this)}>Signup</button> */}
        </form>
      </div>
    );
  }
}
