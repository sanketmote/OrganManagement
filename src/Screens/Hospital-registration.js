
/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";
import axios from 'axios';
export class HRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hname: '',
      mobileno: '',
      email: '',
      state: '',
      district: '',
      hosadd: '',
      city: '',
      state: '',
      country: '',
      password: '',
      cpassword: '',
    }
    this.changehosname = this.changehosname.bind(this);
    this.changeemail = this.changeemail.bind(this);
    this.changeno = this.changeno.bind(this);
    this.changehosadd = this.changehosadd.bind(this);
    this.changecity = this.changecity.bind(this);
    this.changecountry = this.changecountry.bind(this);
    this.changestate = this.changestate.bind(this);
    this.changedistrict = this.changedistrict.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changecpassword = this.changecpassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changehosname(event) {
    this.setState({
      hname: event.target.value
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

  changehosadd(event) {
    this.setState({
      hosadd: event.target.value
    })
  }
  changecity(event) {
    this.setState({
      city: event.target.value
    })
  }

  changecountry(event) {
    this.setState({
      country: event.target.value
    })
  }

  changestate(event) {
    this.setState({
      state: event.target.value
    })
  }

  changedistrict(event) {
    this.setState({
      district: event.target.value
    })
  }

  changepassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    // await instance.methods.creatRequestDonar(this.state.metamaskid,this.state.metamaskhospitalid,this.state.organ,this.state.bloodgro)
    const registration = {
      hosname: this.state.hname,
      mobileno: this.state.mobileno,
      email: this.state.email,
      city: this.state.city,
      state: this.state.state,
      district: this.state.district,
      country: this.state.country,
      address: this.state.hosadd,
      password: this.state.password,
    }

    axios.post('http://localhost:4000/hr/', registration)   /// After Hosting change to hosted backend name
      .then(res => {
        console.log(res);
        if (!res.data.message) {
          var link = '/login'
          window.location.href = link;
        } else {
          alert(res.data.message);
        }

      })
      .catch(err => console.log(err));

  }

  render() {
    return (
      <div class="limiter">
        <div class="container-login100 background-image" >
          <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form action="/signup" method="POST" onSubmit={this.onSubmit} class="login100-form validate-form">
              <span class="login100-form-title p-b-49">
                Hospital Registeration
              </span>

              <div class="wrap-input100 validate-input m-b-23" data-validate="Hospital Name is reauired">
                <span class="label-input100" >Hospital Name</span>
                <input class="input100" type="text" name="hname" placeholder="Type Hospital Name" autocomplete="off"
                  onChange={this.changehosname} value={this.state.hname} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>


              <div class="wrap-input100 validate-input m-b-23" data-validate="Email id is reauired">
                <span class="label-input100">Email </span>
                <input class="input100" type="email" name="email" placeholder="Type Hospital Email id" autocomplete="off"
                  onChange={this.changeemail} value={this.state.email} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="Mobile no is reauired">
                <span class="label-input100">Mobile no</span>
                <input class="input100" type="tel" name="mobileno" placeholder="Type Mobile Number" autocomplete="off"
                  onChange={this.changeno} value={this.state.mobileno} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="Hospital Address is reauired">
                <span class="label-input100">Hospital Address</span>
                <input class="input100" type="text" name="hosadd" placeholder="Enter Hospital Address" autocomplete="off"
                  onChange={this.changehosadd} value={this.state.hosadd} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="city is reauired">
                <span class="label-input100">City</span>
                <input class="input100" type="text" name="city" placeholder="Enter city name" autocomplete="off"
                  onChange={this.changecity} value={this.state.city} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="district is reauired">
                <span class="label-input100">District</span>
                <input class="input100" type="text" name="district" placeholder="Enter district" autocomplete="off"
                  onChange={this.changedistrict} value={this.state.district} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="state is reauired">
                <span class="label-input100">State</span>
                <input class="input100" type="text" name="state" placeholder="Enter state" autocomplete="off"
                  onChange={this.changestate} value={this.state.state} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="country is reauired">
                <span class="label-input100">Country</span>
                <input class="input100" type="text" name="country" placeholder="country" autocomplete="off"
                  onChange={this.changecountry} value={this.state.country} />
                <span class="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div class="wrap-input100 validate-input" data-validate="Password is required">
                <span class="label-input100">Enter Password</span>
                <input class="input100" id="password" type="password" name="pass" placeholder="Type your password" autocomplete="off"
                  onChange={this.changepassword} value={this.state.password} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" />

                <span class="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div class="wrap-input100 validate-input form-group has-feedback cp" id="message1" data-validate="Password is required">
                <span class="label-input100">Confirm Password</span>
                <input class="input100" id="confirm_password" type="password" name="pass1" placeholder="Type to Confirm password" autocomplete="off"
                  onChange={this.changecpassword} value={this.state.cpassword} />
                <span class="focus-input100" data-symbol="&#xf190;"></span>
                <span class="glyphicon  form-control-feedback" id="message2"></span>
              </div>

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

              <a href="/" class="txt2">
                Log in
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
