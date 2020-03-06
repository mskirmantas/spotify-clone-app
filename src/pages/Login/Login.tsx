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

// export class Login extends React.Component {
//   state = {
//     email: {
//       value: ""
//     },
//     password: {
//       value: ""
//     },
//     loading: false,
//     loginSuccess: null,
//     loginError: null
//   };

//   handleLogin(e: FormEvent) {
//     e.preventDefault();
//     this.handleLoading();
//     if (this.state.loginError) {
//       this.setState({ loginError: null });
//     }
//     Firebase.auth()
//       .signInWithEmailAndPassword(
//         this.state.email.value,
//         this.state.password.value
//       )
//       .then(() => {
//         this.setState({ loginSuccess: "Login successful!" });
//       })
//       .catch(() => {
//         this.handleLoading();
//         this.setState({
//           loginError: "Wrong email or password! Please try again."
//         });
//       });
//   }

//   handleLoading() {
//     this.setState({ loading: !this.state.loading });
//   }

//   handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState({ email: { value: e.target.value } });
//   }
//   handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
//     this.setState({ password: { value: e.target.value } });
//   }

//   render() {
//     return (
//       <div className="Login">
//         <p className="landing-message">
//           Welcome to fake <b>Spotify</b>
//         </p>
//         <div className="loginCard">
//           <form className="login-form" onSubmit={this.handleLogin.bind(this)}>
//             <div className="form-input-field">
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter email address"
//                 value={this.state.email.value}
//                 onChange={this.handleEmail.bind(this)}
//                 required
//               />
//             </div>
//             <div className="form-input-field">
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter password"
//                 value={this.state.password.value}
//                 onChange={this.handlePassword.bind(this)}
//                 required
//               />
//             </div>
//             <Button className="btn-login" shape="round" htmlType="submit">
//               Login
//             </Button>
//           </form>
//           <div className="login-message">
//             {this.state.loginSuccess && <p>{this.state.loginSuccess}</p>}
//             {this.state.loginError && <p>{this.state.loginError}</p>}
//           </div>
//         </div>

//         <div className="landing-page-note">
//           <p id="note">
//             * For the purposes of this demo, please use login details provided :
//           </p>
//           <div className="login-details">
//             <p>
//               Email :{" "}
//               <b
//                 style={{
//                   color: "#1db954"
//                 }}
//               >
//                 test.user@mail.com
//               </b>
//             </p>
//             <p>
//               Password : <b style={{ color: "#1db954" }}>test01</b>
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
