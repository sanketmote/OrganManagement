
/* Register.jsx */
import React from "react";
// import loginImg from "../../login.svg";
import axios from 'axios';
import formdata from '../services/state'
import web from "../Etherium/web";
import instance from "../Etherium/contrctInstance";
export class HRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hname: '',
      mobileno: '',
      email: '',
      state1: 'Andhra Pradesh',
      district: 'Anantapur',
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
    this.fetcheth = this.fetcheth.bind(this);
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
      state1: event.target.value
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
  async fetcheth(event) {
    // const len = await inst
    // let productsList = await Promise.all(
    // Array(parseInt(countProductsAddedInLaunch)).fill().map((element , index)=>{

    // const accounts = await web.eth.getAccounts();
    const len = await instance.methods.gethospitalcount().call();
    console.log(len);
    // const a1 =   
    // })
    // );
  }
  async onSubmit(event) {
    event.preventDefault()
    try {
      const accounts = await web.eth.getAccounts();
      console.log(accounts[0])
      if (!accounts[0]) {
        alert("Please add metamaskid")
        var link = '#'
        window.location.href = link;
      } else {
        // creatRequestHospital

        // alert(accounts[0])
        const registration = {
          hosname: this.state.hname,
          mobileno: this.state.mobileno,
          email: this.state.email,
          city: this.state.city,
          state: this.state.state1,
          district: this.state.district,
          country: this.state.country,
          address: this.state.hosadd,
          password: this.state.password,
          metamaskid: accounts[0]
        }

        axios.post('http://localhost:4000/hr/', registration)   /// After Hosting change to hosted backend name
          .then(res => {
            console.log(res);
            if (!res.data.message) {
              console.log("ok")
            } else {
              alert(res.data.message);
            }

          })
          .catch(err => console.log(err));
        await instance.methods.creatRequestHospital(this.state.hname).send({ from: accounts[0] });
        var link = '/login'
        window.location.href = link;
        const len = await instance.methods.gethospitalcount().call();
        console.log(len);
        // await instance.methods.creatRequestHospital(this.state.hname).send({ from: accounts[0], gasPrice: "210000" });
      }
    } catch (err) {
      console.log(err);
      alert("You Don't Have Metamask extension we can't fetch so please enable it");
    }
  }

  render() {
    const AllState = formdata.getState();
    const { state1 } = this.state;
    const AllDistrict = formdata.getDistrict(state1) === undefined ? formdata.getDistrict(AllState[0]) : formdata.getDistrict(state1);
    return (
      <div className="limiter">
        <div className="container-login100 background-image" >
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form action="/signup" method="POST" onSubmit={this.onSubmit} className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                Hospital Registeration
              </span>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Hospital Name is reauired">
                <span className="label-input100" >Hospital Name</span>
                <input className="input100" type="text" name="hname" placeholder="Type Hospital Name" autoComplete="off"
                  onChange={this.changehosname} value={this.state.hname} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>


              <div className="wrap-input100 validate-input m-b-23" data-validate="Email id is reauired">
                <span className="label-input100">Email </span>
                <input className="input100" type="email" name="email" placeholder="Type Hospital Email id" autoComplete="off"
                  onChange={this.changeemail} value={this.state.email} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Mobile no is reauired">
                <span className="label-input100">Mobile no</span>
                <input className="input100" type="tel" name="mobileno" placeholder="Type Mobile Number" autoComplete="off"
                  onChange={this.changeno} value={this.state.mobileno} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Hospital Address is reauired">
                <span className="label-input100">Hospital Address</span>
                <input className="input100" type="text" name="hosadd" placeholder="Enter Hospital Address" autoComplete="off"
                  onChange={this.changehosadd} value={this.state.hosadd} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="state is reauired">
                <span className="label-input100">State</span>
                <select className="input100" name="state" id="role" onChange={this.changestate} value={this.state.state1} required >
                  {/* for(var i=0;i<formData.getState.length;i++)
                   */}
                  {AllState.map(state3 => (
                    <option value={state3}>{state3}</option>
                  ))}
                </select>
                {/* <input className="input100" type="text" name="state" placeholder="Enter state" autoComplete="off"
                  onChange={this.changestate} value={this.state.state} required /> */}
                <span className="focus-input100" data-symbol="&#xf10c;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="district is reauired">
                <span className="label-input100">District</span>
                <select className="input100" name="district" id="role" onChange={this.changedistrict} value={this.state.district} required >
                  {/* for(var i=0;i<formData.getState.length;i++)
                   */}
                  {AllDistrict.map(state3 => (
                    <option value={state3}>{state3}</option>
                  ))}
                </select>

                {/* <input className="input100" type="text" name="district" placeholder="Enter district" autoComplete="off"
                  onChange={this.changedistrict} value={this.state.district} required /> */}
                <span className="focus-input100" data-symbol="&#xf10c;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="city is reauired">
                <span className="label-input100">City</span>
                <input className="input100" type="text" name="city" placeholder="Enter city name" autoComplete="off"
                  onChange={this.changecity} value={this.state.city} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="country is reauired">
                <span className="label-input100">Country</span>
                <input className="input100" type="text" name="country" placeholder="country" autoComplete="off"
                  onChange={this.changecountry} value={this.state.country} />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <span className="label-input100">Enter Password</span>
                <input className="input100" id="password" type="password" name="pass" placeholder="Type your password" autoComplete="off"
                  onChange={this.changepassword} value={this.state.password} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character" />

                <span className="focus-input100" data-symbol="&#xf190;"></span>
              </div>

              <div className="wrap-input100 validate-input form-group has-feedback cp" id="message1" data-validate="Password is required">
                <span className="label-input100">Confirm Password</span>
                <input className="input100" id="confirm_password" type="password" name="pass1" placeholder="Type to Confirm password" autoComplete="off"
                  onChange={this.changecpassword} value={this.state.cpassword} />
                <span className="focus-input100" data-symbol="&#xf190;"></span>
                <span className="glyphicon  form-control-feedback" id="message2"></span>
              </div>
              <a onClick={this.fetcheth} className="txt2 login100-form-btn">
                Fetch Metamask id
              </a>
              <div className="container-login100-form-btn hidden" id="disabled" style={{ "marginTop": "10%" }}>
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit" name="submit" value="info">
                    Register
                  </button>
                </div>
              </div>

            </form>


            <div className="flex-col-c p-t-155 cp1">
              <span className="txt1 p-b-17">
                Already have an account?
              </span>

              <a href="/login" className="txt2">
                Log in
              </a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
