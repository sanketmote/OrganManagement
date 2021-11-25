import React from 'react';
import ReactDOM from 'react-dom';
import "../styles/Registration-login.scss";
import axios from 'axios';

export class UDashboard extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        users: [
           { id: '', username: '', bloodGroup: '', Recipient: '', organ : '', city:'', district:'', state:'', country:''},
        ]
     }
  }
  

  renderTableHeader() {
     let header = Object.keys(this.state.users[0])
     return header.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
     });
  }



  renderTableData() {
     return this.state.users.map((user, index) => {
        const { id, username, bloodGroup, Recipient, organ, city, district, state, country } = user //destructuring
        return (
           <tr key={id}>
              <td>{id}</td>
              <td>{username}</td>
              <td>{bloodGroup}</td>
              <td>{Recipient}</td>
              <td>{organ}</td>
              <td>{city}</td>
              <td>{district}</td>
              <td>{state}</td>
              <td>{country}</td>
           </tr>
        )
     });
  }

  render() {
     return (
        <div className="limiter reglog">
        <div className="container-login100 background-image">
          <div className="wrap-login100 dash p-l-55 p-r-55 p-t-55 p-b-54">
        
           <h1  className="login100-form-title p-b-49">Dashboard</h1>
           <table id='users'>
              <tbody>
                 <tr>{this.renderTableHeader()}</tr>
                 {this.renderTableData()}
              </tbody>
           </table>
        </div>
        </div>
        </div>
     );
  }
}




