import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
} from "react-router-dom";

import React from 'react'
import { Login, DRegister,HRegister } from "./Screens/index";
import HomePage from './Screens/HomePage'
import User from "./user"
import Huser from "./Huser"
import Donar from './Screens/donar'
import AuthService from "./services/auth.service"
import DashBoard from './Screens/HospitalScreens/DashBoard'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      hospitals: false,
      users: false,
      currentUser: undefined,
      id: 1
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        users: user.role.includes("users"),
        hospitals: user.role.includes("Hospitals"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }
  render() {

    const { id , currentUser, users, hospitals } = this.state;

    return (
      <div>
        <Router>
          <div>
  
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              
              <Route path="/user">
              { id && <User />}
                {/* <User /> */}
              </Route>
              <Route path="/huser">
                <Huser />
              </Route>
              <Route path="/DRegister">
                <DRegister />
              </Route>
              <Route path="/HRegister">
                <HRegister />
              </Route>
              <Route path="/HDashboard">
                <DashBoard />
              </Route>
              <Route path="/donar">
                <Donar />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
  
}
