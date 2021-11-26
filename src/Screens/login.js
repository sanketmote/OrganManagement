import React from "react";
// import loginImg from "../../login.svg";
import "../styles/Registration-login.scss";
// import axios from 'axios';
import AuthService from "../services/auth.service";

export class Login extends React.Component {
  constructor(props) {
    super(props); this.state = {
      role: 'users',
      email: '',
      password: '',
    }
    this.changerole = this.changerole.bind(this);
    this.changeemail = this.changeemail.bind(this);
    // this.changemetamaskid = this.changemetamaskid.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  changerole(event) {
    this.setState({
      role: event.target.value
    })
  }

  changeemail(event) {
    this.setState({
      email: event.target.value
    })
  }
  // changemetamaskid(event) {
  //   this.setState({
  //     metamaskid: event.target.value
  //   })
  // }

  changepassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  async onSubmit(event) {
    event.preventDefault()

    const loginval = {
      role: this.state.role,
      email: this.state.email,
      // metamaskid: this.state.metamaskid,
      password: this.state.password,
    }
    console.log(loginval);
    const res = await AuthService.login(loginval);
    if(!res.message){
      // alert('Logging .. ');
        window.location.href = '/login'
    } else {
      alert(res.message);
    }
    // console.log("hii",loginval)
    // axios.post('http://localhost:4000/login/',loginval)   /// After Hosting change to hosted backend name
    //   .then(res => { 
    //     console.log(res);

    //     if(!res.data.message){
    //       if(loginval.role === 'users'){
    //         window.location = '/user'
    //       } 
    //       if(loginval.role === 'Hospitals'){
    //         window.location = '/HDashboard' //#endregion
    //       }
    //     } else {
    //       alert("Invalid User Email id and Password for "+ loginval.role + " Login");
    //     }
        
    //   })
    //   .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="limiter reglog">
        <div className="container-login100 background-image">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form method="get" action="/login" onSubmit={this.onSubmit} className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                Login
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
                <span className="label-input100">Role </span>
                <select className="input100" name="role" id="role" onChange={this.changerole} value={this.state.role} >
                  <option value="users">User</option>
                  <option value="Hospitals">Hospital</option>
                  <option value="Admin">Admin</option>
                </select>

                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
                <span className="label-input100">Email </span>
                <input className="input100" type="email" name="email" placeholder="Type your Email" autoComplete="off"
                  onChange={this.changeemail} value={this.state.email} required />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Password</span>
                <input className="input100" type="password" name="pass" placeholder="Type your password"
                  onChange={this.changepassword} value={this.state.password} required />
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
                  <button className="login100-form-btn" onSubmit={this.onSubmit} type="submit" name="submit" value="Login">
                    Login
                  </button>
                </div>
              </div>

              <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">
                  Don't have account?
                </span>

                <a href="/" className="txt2">
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