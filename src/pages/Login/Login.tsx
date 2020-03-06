import React, { FormEvent } from "react";
import { Button } from "antd";

import { Firebase } from "../../config/firebase";

import "./Login.scss";

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = React.useState<string | null>(null);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    handleLoading();
    if (loginError) {
      setLoginError(null);
    }
    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setLoginSuccess("Login successful!");
      })
      .catch(() => {
        handleLoading();
        setLoginError("Wrong email or password! Please try again.");
      });
  };

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login">
      <p className="landing-message">
        Welcome to fake <b>Spotify</b>
      </p>
      <div className="loginCard">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-input-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="form-input-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <Button className="btn-login" shape="round" htmlType="submit">
            Login
          </Button>
        </form>
        <div className="login-message">
          {loginSuccess && <p>{loginSuccess}</p>}
          {loginError && <p>{loginError}</p>}
        </div>
      </div>

      <div className="landing-page-note">
        <p id="note">
          * For the purposes of this demo, please use login details provided :
        </p>
        <div className="login-details">
          <p>
            Email :{" "}
            <b
              style={{
                color: "#1db954"
              }}
            >
              test.user@mail.com
            </b>
          </p>
          <p>
            Password : <b style={{ color: "#1db954" }}>test01</b>
          </p>
        </div>
      </div>
    </div>
  );
};
