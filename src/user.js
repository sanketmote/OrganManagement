// import './App.css'
// import React from "react";
// import "./styles/Registration-login.scss";
// import { Login, Register } from "./Screens/index";

// export default class user extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     isLogginActive: true
//   //   };
//   // }

//   render() {
//     // const { isLogginActive } = this.state;
//     // const current = isLogginActive ? "Register" : "Login";
//     return (
//       <div className="App">
//         {/* <div className="login">
//           <div className="container" ref={ref => (this.container = ref)}>
//             {isLogginActive && (
//               <Login containerRef={ref => (this.current = ref)} />
//             )}
//             {!isLogginActive && (
//               <Register containerRef={ref => (this.current = ref)} />
//             )}
//           </div>
//         </div> */}
//         <p>hello</p>
//         console.log(working);
//       </div>
//     );
//   }
// }
import instance from './Etherium/contrctInstance';
import web3 from './Etherium/web';
import React from 'react';
import Navigationbar from './Screens/User/navigationPage'
export default function User() {
  async function fetch(){
      const len = await instance.methods.getDonorcount().call();
    console.log(len);
  }
  return (
    <div>
      <Navigationbar />
      this is user page 🤟
      <button onClick={fetch}>fetchData </button>
    </div>
  )
}
