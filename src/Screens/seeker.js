import React from "react";
import axios from "axios";
import web3 from "../Etherium/web"
// import loginImg from "../../login.svg";
import "../styles/Registration-login.scss";
import formdata from '../services/state'
import AuthService from '../services/auth.service'
// import web3 from "../Etherium/web";\
import instance from "../Etherium/contrctInstance";
// const Web3=require('web3');
// todo : -> fetch list of hospitals according to city , district , state .
export class Seeker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      bloodgroup: '',
      selecthospital: '',
      metamaskid: '',
      orgname: '',
      selectedFile: null,
      city: '',
      state1: 'Andhra Pradesh',
      district: 'Anantapur',
      hid: '',
      hospitalvalue: [],
      keydatahos: []
    }
    this.changefullName = this.changefullName.bind(this);
    this.changeselecthospital = this.changeselecthospital.bind(this);
    this.changebloodgroup = this.changebloodgroup.bind(this);
    this.changemetamaskid = this.changemetamaskid.bind(this);
    this.changeorgname = this.changeorgname.bind(this);
    this.changestate = this.changestate.bind(this);
    this.changedistrict = this.changedistrict.bind(this);
    this.changecity = this.changecity.bind(this);
    this.changeselectedFile = this.changeselectedFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setData = this.setData.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount() {
    axios
      .get("http://localhost:4000/getHospital?state=" + this.state.state1 + "&district=" + this.state.district)
      .then(result => {
        this.setData(result.data, result.data.data)
      });
  }

  setData(resdata, data) {
    this.setState({
      hospitalvalue: data,
      keydatahos: resdata,
      selecthospital: data[0],
    })
  }

  changefullName(event) {
    this.setState({
      fullName: event.target.value
    })
  }

  changeselecthospital(event) {
    this.setState({
      selecthospital: event.target.value
    })
  }

  changeselectedFile(event) {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  changebloodgroup(event) {
    this.setState({
      bloodgroup: event.target.value
    })
  }

  changecity(event) {
    this.setState({
      city: event.target.value
    })
    this.componentWillMount()
  }

  // changecountry(event) {
  //   this.setState({
  //     country: event.target.value
  //   })
  // }

  changestate(event) {
    this.setState({
      state1: event.target.value
    })

  }

  changedistrict(event) {
    this.setState({
      district: event.target.value
    })
    this.componentWillMount()
  }

  changemetamaskid(event) {
    this.setState({
      metamaskid: event.target.value
    })
  }

  changeorgname(event) {
    this.setState({
      orgname: event.target.value
    })
  }

  async onSubmit(event) {
    event.preventDefault()
    try {
      const accounts = await web3.eth.getAccounts();
      const user = AuthService.getCurrentUser();
      if (!accounts[0]) {
        alert("Please add metamaskid")
        var link = '#'
        window.location.href = link;
      } else {
        alert(accounts[0]);
        const formData = new FormData();
        console.log("hello1 ");
        // Update the formData object
        formData.append(
          "myFile",
          this.state.selectedFile,
          this.state.selectedFile.name
        );

        for (var i = 0; i < this.state.keydatahos.data.length; i++) {
          if (this.state.keydatahos.data[i] === this.state.selecthospital) {
            this.state.hid = this.state.keydatahos.key[i];
            break;
          }
        }
        console.log("Hello2");

        if (this.state.hid === '') {
          alert("Hospital is not selected" + this.state.selecthospital)
        } else {
            console.log("Hello3");
          await instance.methods.creatRequestRecipient(this.state.hid, this.state.orgname, this.state.bloodgroup).send({ from: accounts[0] });
          const len = await instance.methods.getrecipientcount().call();
          console.log(len);
          const registration = {
            fullName: this.state.fullName,
            bloodgroup: this.state.bloodgroup,
            selecthospital: this.state.selecthospital,
            metamaskid: accounts[0],
            orgname: this.state.orgname,
            // selectedFile: this.state.selectedFile,
            city: this.state.city,
            district: this.state.district,
            state: this.state.state1,
            hid: this.state.hid,
            uid: user.id,
          }

          axios.post('http://localhost:4000/as/', registration)   /// After Hosting change to hosted backend name
            .then(res => {
              if (!res.data.message) {
                var link = '/'
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

      }
    } catch (e) {

    }



  }

  render() {
    const AllState = formdata.getState();
    const { state1, district, city, hospitalvalue } = this.state;
    const AllDistrict = formdata.getDistrict(state1) === undefined ? [] : formdata.getDistrict(state1);
    return (
      <div className="limiter reglog">
        <div className="container-login100 background-image">
          <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
            <form method="post" action="/hospitals" onSubmit={this.onSubmit} className="login100-form validate-form">
              <span className="login100-form-title p-b-49">
                Verification Form
              </span>
              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100">Full name</span>
                <input className="input100" type="text" name="fullname" placeholder="Type the recipient name"
                  onChange={this.changefullName} value={this.state.fullName} autoComplete="off" required />
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="bloodgroup is reauired">
                <span className="label-input100">Blood Group</span>
                <input className="input100" type="text" name="bloodgroup" placeholder="Type your blood group"
                  onChange={this.changebloodgroup} value={this.state.bloodgroup} autoComplete="off" required />
                <span className="focus-input100" data-symbol="&#xf276;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100">Metamask ID</span>
                <input className="input100" type="text" name="metamaskid" placeholder="Type your metamask ID"
                  onChange={this.changemetamaskid} value={this.state.metamaskid} autoComplete="off" disabled required />
                {/* Validation left */}
                <span className="focus-input100" data-symbol="&#xf10c;"></span>
              </div>


              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100">Organ name</span>
                <input className="input100" type="text" name="orgname" placeholder="Type the organ name"
                  onChange={this.changeorgname} value={this.state.orgname} autoComplete="off" required />
                <span className="focus-input100" data-symbol="&#xf276;"></span>

              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Username is reauired">
                <span className="label-input100">Certificate Image</span><br></br><br></br>
                <input className="input100" type="file" name="image"
                  onChange={this.changeselectedFile} placeholder="Submit your certificate" autoComplete="off" required />

              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="state is reauired">
                <span class="label-input100">State</span>
                <select className="input100" name="state" id="role" onChange={this.changestate} value={this.state.state1} required >
                  {/* for(var i=0;i<formData.getState.length;i++)
                   */}
                  {AllState.map(state3 => (
                    <option value={state3}>{state3}</option>
                  ))}
                </select>
                {/* <input class="input100" type="text" name="state" placeholder="Enter state" autoComplete="off"
                  onChange={this.changestate} value={this.state.state} required /> */}
                <span class="focus-input100" data-symbol="&#xf10c;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="district is reauired">
                <span class="label-input100">District</span>
                <select className="input100" name="district" id="role" onChange={this.changedistrict} value={this.state.district} required >
                  {/* for(var i=0;i<formData.getState.length;i++)
                   */}
                  {AllDistrict.map(state3 => (
                    <option value={state3}>{state3}</option>
                  ))}
                </select>

                {/* <input class="input100" type="text" name="district" placeholder="Enter district" autoComplete="off"
                  onChange={this.changedistrict} value={this.state.district} required /> */}
                <span class="focus-input100" data-symbol="&#xf10c;"></span>
              </div>

              <div class="wrap-input100 validate-input m-b-23" data-validate="city is reauired">
                <span class="label-input100">City</span>
                <input class="input100" type="text" name="city" placeholder="Enter city name" autoComplete="off"
                  onChange={this.changecity} value={this.state.city} required />
                <span class="focus-input100" data-symbol="&#xf10c;"></span>
              </div>

              <div className="wrap-input100 validate-input m-b-23" data-validate="Hospital is reauired">
                <span className="label-input100">Select Hospital</span>
                <select className="input100" name="hospitals" id="role" onChange={this.changeselecthospital} value={this.state.selecthospital} required >
                  {/* for(var i=0;i<formData.getState.length;i++)
                   */}
                  {hospitalvalue.map(state3 => (
                    <option value={state3}>{state3}</option>
                  ))}
                </select>
                {/* <input className="input100" type="text" name="username" placeholder="Type your username" 
                 onChange={this.changeselecthospital} value={this.state.selecthospital} autoComplete="off" required /> */}
                <span className="focus-input100" data-symbol="&#xf206;"></span>
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" type="submit" name="submit" value="Login">
                    Submit
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    );
  }
}