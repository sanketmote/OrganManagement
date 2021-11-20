import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  // Link,
} from "react-router-dom";

import React from 'react'
import { Login, DRegister, HRegister, UDashboard} from "./Screens/index";
import HomePage from './Screens/HomePage'
import User from "./user"
import Huser from "./Huser"
import Donar from './Screens/donar'
import AuthService from "./services/auth.service"
import DashBoard from './Screens/HospitalScreens/DashBoard'
import ADashboard from './Screens/Admin/ADashboard'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      hospitals: false,
      users: false,
      isAdmin:false,
      currentUser: undefined,
      isloggedIn: false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isloggedIn: user !== undefined ? true : false,
        isAdmin: user.isAdmin === true ? true : false,
        users: user.roles === "users" ? true : false,
        hospitals: user.roles === "Hospitals" ? true : false,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {

    const { isloggedIn, users, hospitals , isAdmin} = this.state;
    // alert(isloggedIn, users, hospitals);
    return (
      <div>
        <Router>
          <div>

            <Switch>
              <Route path="/login">
                {isloggedIn && users ? <Redirect to='/user' /> : (hospitals ? <Redirect to='/huser' /> : <Login />)}
              </Route>

              <Route exact path="/user">
                {isloggedIn && users ? <User /> : <Redirect to="/login" />}
              </Route>

              <Route path="/huser">
                {isloggedIn && hospitals ? <Huser /> : <Redirect to="/login" />}
              </Route>

              <Route path="/DRegister">
                {isloggedIn && users ? <Redirect to='/user' /> : (hospitals ? <Redirect to='/huser' /> : <DRegister />)}
              </Route>

              <Route path="/HRegister">
                {isloggedIn && users ? <Redirect to='/user' /> : (hospitals ? <Redirect to='/huser' /> : <HRegister />)}
              </Route>

              <Route path="/HDashboard">
                {/* <DashBoard /> */}
                {/* {isloggedIn && hospitals ? <DashBoard /> : <Redirect to="/login" />} */}
                <DashBoard />
              </Route>

              <Route path="/ADashboard">
                {isloggedIn && isAdmin ? <ADashboard /> : <Redirect to="/login" />}
                <ADashboard />
              </Route>
              
              <Route path="/donar">
                {/* {isloggedIn && users ? <Donar /> : <Redirect to="/login" />}
                 */}
                 <Donar />
              </Route>

              <Route path="/admin">
                {isloggedIn && isAdmin ? <Redirect to='/ADashboard' /> : <Redirect to='/' /> }
              </Route>

              <Route path="/udashboard">
                {/* {isloggedIn && users ? <Redirect to='/udashboard' /> : <Redirect to='/udashboard' /> }
                 */}
                 <UDashboard />
              </Route>

              <Route path="/">
                {isloggedIn && users ? <Redirect to='/UDashboard' /> : (hospitals ? <Redirect to='/HDashboard' /> : <HomePage />)}
              </Route>


            </Switch>
          </div>
        </Router>
      </div>
    )
  }

}
