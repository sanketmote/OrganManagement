import React from "react";
// import loginImg from "../../login.svg";
import "../styles/Registration-login.scss";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="limiter reglog">
        <div className="container-login100 background-image">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form method="POST" action="/" className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                Login
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100">Username</span>
                <input className="input100" type="text" name="username" placeholder="Type your username" autocomplete="off" />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Password</span>
                <input className="input100" type="password" name="pass" placeholder="Type your password" />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div className="text-right p-t-8 p-b-31">
                <a href="/forget">
                  Forgot password?
                </a>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit" name="submit" value="Login">
                    Login
                  </button>
                </div>
              </div>

              <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">
                  Don't have account?
                </span>

                <a onclick="" href="/signup" className="txt2">
                  Sign Up
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}