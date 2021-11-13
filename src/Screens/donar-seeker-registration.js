
/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";
import "../styles/Registration-login.scss";


export class DRegister extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="limiter">
        <div class="container-login100 background-image" >
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form action="/signup" method="POST" class="login100-form validate-form">
              <span class="login100-form-title p-b-49">
                User Registeration
              </span>

              <div class="wrap-input100 validate-input m-b-23" data-validate="Full Name is reauired">
                <span class="label-input100" >Full Name</span>
                <input class="input100" type="text" name="fname" placeholder="Type your Full Name" autocomplete="off" required />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>


              <div class="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
                <span class="label-input100">Email</span>
                <input class="input100" type="text" name="email" placeholder="Type your Email" autocomplete="off" required />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="mobile no is reauired">
                <span class="label-input100">Mobile No</span>
                <input class="input100" type="tel" name="mobile" placeholder="Type your mobile no" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" autocomplete="off" required />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input" data-validate="Password is required">
                <span class="label-input100">Enter Password</span>
                <input class="input100" id="password" type="password" name="pass" placeholder="Type your password" autocomplete="off" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" required />

                <span class="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div class="wrap-input100 validate-input form-group has-feedback cp" id="message1" data-validate="Password is required">
                <span class="label-input100">Confirm Password</span>
                <input class="input100" id="confirm_password" type="password" name="pass1" placeholder="Type your Confirm password" autocomplete="off" required />
                <span class="focus-input100" data-symbol="&#xf190;"></span>
                <span class="glyphicon  form-control-feedback" id="message2"></span>
              </div>

              <div class="container-login100-form-btn hidden" id="disabled" style={{ "marginTop": "10%" }}>
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn" type="submit" name="submit" value="info">
                    Verify
                  </button>
                </div>
              </div>

            </form>


            <div class="flex-col-c p-t-155 cp1">
              <span class="txt1 p-b-17">
                Already have an account?
              </span>

              <a href="/login" class="txt2">
                Log in
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
