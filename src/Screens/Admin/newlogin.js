import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    // Link,
  } from "react-router-dom";
  
  import React, { useState, useEffect } from "react";
  import { Login, DRegister, HRegister, UDashboard, CDashboard } from "./Screens/index";
  import HomePage from './Screens/HomePage'
  import User from "./user"
  import Huser from "./Huser"
  import Donar from './Screens/donar'
  import AuthService from "./services/auth.service"
  import DashBoard from './Screens/HospitalScreens/DashBoard'
  import ADashboard from './Screens/Admin/ADashboard'
  
  export default function App() {
    // export default class App extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.logOut = this.logOut.bind(this);
  
    //   this.state = {
    //     hospitals: false,
    //     users: false,
    //     isAdmin:false,
    //     currentUser: undefined,
    //     isloggedIn: false,
    //   };
    // }
    const [hospitals, sethospital] = useState(false);
    const [users, setusers] = useState(false);
    const [isAdmin, setisAdmin] = useState(false);
    const [currentUser, setcurrentUser] = useState(false);
    const [isloggedIn, setisloggedIn] = useState(false);
    useEffect(async () => {
      const user = await AuthService.getCurrentUser();
      console.log(user);
      if (user) {
        currentUser: setcurrentUser(user);
        user !== undefined ? setisloggedIn(true) : setisloggedIn(false);
        user.roles === "Admin" ? setisAdmin(true) : setisAdmin(false);
        user.roles === "users" ? setusers(true) : setusers(false);
        user.roles === "Hospitals" ? sethospital(true) : sethospital(false);
      }
    }, []);
  
  
  
    function logOut() {
      AuthService.logout();
    }
    // render() {
  
    // const { isloggedIn, users, hospitals, isAdmin } = this.state;
    // alert(isloggedIn, users, hospitals);
    console.log(isloggedIn, isAdmin)
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
              </Route>
  
              <Route path="/donar">
                {/* {isloggedIn && users ? <Donar /> : <Redirect to="/login" />}
                   */}
                <Donar />
              </Route>
  
              <Route path="/admin">
                {isloggedIn && isAdmin ? <Redirect to='/ADashboard' /> : <Redirect to='/' />}
              </Route>
  
              <Route path="/udashboard">
                {/* {isloggedIn && users ? <Redirect to='/udashboard' /> : <Redirect to='/udashboard' /> }
                   */}
                <UDashboard />
              </Route>

              <Route path="/CDashboard">
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
    // }
  
  }
  