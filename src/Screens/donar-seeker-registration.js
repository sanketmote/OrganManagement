
/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";
import "../styles/Registration-login.scss";
import axios from 'axios';
import instance from "../Etherium/contrctInstance";
import web from '../Etherium/web'
export class DRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      mobileno: '',
      email: '',
      metamaskid: '',
      password: '',
      cpassword: '',
    }
    this.changefullName = this.changefullName.bind(this);
    this.changeemail = this.changeemail.bind(this);
    this.changeno = this.changeno.bind(this);
    this.changemetamaskid = this.changemetamaskid.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changecpassword = this.changecpassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetcheth = this.fetcheth.bind(this);
  }

  changefullName(event) {
    this.setState({
      fullName: event.target.value
    })
  }

  changeemail(event) {
    this.setState({
      email: event.target.value
    })
  }

  changecpassword(event) {
    this.setState({
      cpassword: event.target.value
    })
  }

  changeno(event) {
    this.setState({
      mobileno: event.target.value
    })
  }

  changemetamaskid(event) {
    this.setState({
      metamaskid: event.target.value
    })
  }

  changepassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  async fetcheth(event){
    // const len = await inst
    // let productsList = await Promise.all(
      // Array(parseInt(countProductsAddedInLaunch)).fill().map((element , index)=>{
        const account1='0x15860AB0E54D6690feD81628ade276C3F0f6B547';
        const donar= await instance.methods.Donors(account1).call();
        console.log(donar['donorid']);
      // })
  // );
  }
  async onSubmit(event) {
    event.preventDefault();
    const accounts=await web.eth.getAccounts();
    // await instance.methods.creatRequestDonar(this.state.metamaskid,'0x988AF3B7649f5dB29B1b40564E14615cd87D606d','EYE','A+').send({from:accounts[0]});
    const registration = {
      fullName: this.state.fullName,
      mobileno: this.state.mobileno,
      email: this.state.email,
      metamaskid: this.state.metamaskid,
      password: this.state.password,
    }

    axios.post('http://localhost:4000/ur/', registration)   /// After Hosting change to hosted backend name
      .then(res => {
        console.log(res);
        if (!res.data.message) {
          var link = '/login'
          window.location.href = link;
        } else {
          alert(res.data.message);
        }

      })
      .catch(err => {
        console.log(err);
        alert("Err -> " + err);
      });

  }

  render() {
    return (
      <div class="limiter">
        <div class="container-login100 background-image" >
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form action="/signup" method="POST" onSubmit={this.onSubmit} class="login100-form validate-form">
              <span class="login100-form-title p-b-49">
                User Registeration
              </span>

              <div class="wrap-input100 validate-input m-b-23" data-validate="Full Name is reauired">
                <span class="label-input100" >Full Name</span>
                <input class="input100" type="text" name="fname"
                  placeholder="Type your Full Name" autoComplete="off"
                  onChange={this.changefullName} value={this.state.fullName} required />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>


              <div class="wrap-input100 validate-input m-b-23" data-validate="Email is reauired">
                <span class="label-input100">Email</span>
                <input class="input100" type="text" name="email"
                  placeholder="Type your Email" autoComplete="off"
                  onChange={this.changeemail} value={this.state.email} required />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="mobile no is reauired">
                <span class="label-input100">Mobile No</span>
                <input class="input100" type="tel" name="mobile" placeholder="Type your mobile no"
                  autoComplete="off" required
                  onChange={this.changeno} value={this.state.mobileno} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="metamask id is reauired">
                <span class="label-input100">MetaMask ID</span>
                <input class="input100" type="text" name="metamaskid" placeholder="Type your Meta Mask ID"
                  autoComplete="off" required onChange={this.changemetamaskid} value={this.state.metamaskid} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input" data-validate="Password is required">
                <span class="label-input100">Enter Password</span>
                <input class="input100" id="password" type="password" name="pass"
                  placeholder="Type your password" autoComplete="off"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
                  onChange={this.changepassword} value={this.state.password} required />

                <span class="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div class="wrap-input100 validate-input form-group has-feedback cp" id="message1" data-validate="Password is required">
                <span class="label-input100">Confirm Password</span>
                <input class="input100" id="confirm_password" type="password" name="pass1" placeholder="Type your Confirm password"
                  autoComplete="off" required onChange={this.changecpassword} value={this.state.cpassword} />
                <span class="focus-input100" data-symbol="&#xf190;"></span>
                <span class="glyphicon  form-control-feedback" id="message2"></span>
              </div>
              <a onClick={this.fetcheth} class="txt2 login100-form-btn">
                Fetch Metamask id              
              </a>
              <div class="container-login100-form-btn hidden" id="disabled" style={{ "marginTop": "10%" }}>
                <div class="wrap-login100-form-btn">
                  <div class="login100-form-bgbtn"></div>
                  <button class="login100-form-btn" type="submit" name="submit" value="info">
                    Register
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
