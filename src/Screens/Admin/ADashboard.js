import pic from "../../Images/admin.png";
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Modal from '../../services/Model';
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
var user = {};
// var isOpen = false;
var index = null;
export default function DashBoard() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    useEffect(async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
        user = await AuthService.getCurrentUser();
        console.log(user)
        if (user) {
            if (user.roles == "Admin") {
                const len = await instance.methods.gethospitalcount().call();
                // console.log(len);
                const adddata = [];
                for (var i = 0; i < len; i++) {
                    const hid = await instance.methods.hospitalarr(i).call();
                    const hinfo = await instance.methods.hospital(hid).call();
                    // console.log(hinfo['added'])
                    if (hinfo['added'] == false) {
                        Axios
                            .get("http://localhost:4000/verifyhospital?hid=" + hid)
                            .then(result => {
                                adddata.push(result.data[0])
                                console.log(result.data[0])
                                setData(adddata);
                            });
                    }
                }
            } else {
                alert("You are not allowed to access this page");
                var link = '/login'
                window.location.href = link;

            }
        } else {
            var link = '/login'
            window.location.href = link;
        }
        // debugger;
    }, []);

    function toggleModal(id) {
        index = id;
        setisOpen(!isOpen);
        console.log('toggleModal called', isOpen);
    }
    function logout() {
        console.log('logout called');
        AuthService.logout();
    }
    // s = () => {
    //     require("../../styles/bootstrap.min.css");
    //     require("../../styles/tooplate.css");
    // }

    // render(){
    // this.s();
    return (
        <div class="" id="home">
            <div class="container">
                <div class="row tm-content-row tm-mt-big">
                    <div class="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col">
                        <div class="bg-white tm-block h-100">
                            <div class="row">
                                <div class="col-md-8 col-sm-12">
                                    <h2 class="tm-block-title d-inline-block"> Requests </h2>

                                </div>
                                <div class="col-md-4 col-sm-12 text-right">
                                    <Button variant="info" className="btn btn-small btn-primary" onClick={() => logout(index)} >
                                        Logout
                                    </Button>

                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-striped tm-table-striped-even mt-3">
                                    <thead>
                                        <tr class="tm-bg-gray">
                                            <th scope="col">sr no</th>
                                            <th scope="col">Hospital Name</th>
                                            <th scope="col">Request Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => {
                                            return <tr>
                                                <th scope="row">{index}.</th>
                                                <td>{item.hosname}</td>
                                                <td>{item.date}</td>
                                                <td>
                                                    <Button variant="info" onClick={() => toggleModal(index)} >
                                                        Details
                                                    </Button>
                                                </td>
                                                {/* <td onClick={openDropDown} >verifyhospital</td>
                                                {open === true ? openList : null} */}
                                            </tr>
                                        })}

                                    </tbody>
                                </table>


                            </div>

                            {/* <div class="tm-table-mt tm-table-actions-row">

                                <div class="tm-table-actions-col-right">
                                    <span class="tm-pagination-label">Page</span>
                                    <nav aria-label="Page navigation" class="d-inline-block">
                                        <ul class="pagination tm-pagination">
                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item">
                                                <span class="tm-dots d-block">...</span>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">13</a></li>
                                            <li class="page-item"><a class="page-link" href="#">14</a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-12 tm-md-12 tm-sm-12 tm-col">

                        <div class="bg-white tm-block">
                            <h2 class="tm-block-title">Profile Image</h2>
                            <div class="tm-block-title">
                                <img src={pic} alt="Profile Image" />
                            </div>
                            <h2 class="tm-block-title">{user.fullName}</h2>
                            <h5 class="info">Mobile No - {user.mobileno}</h5>
                            <h5 class="info">Email id - {user.email}</h5>
                        </div>
                    </div>

                </div>
            </div>

            <Modal show={isOpen}
                onClose={() => toggleModal({ index })} metamaskid={data[index] ? data[index].metamaskid : ''}>
                <Table className="table">
                    <tbody>

                        <tr>
                            <th>Hospital Name </th><td> {data[index] ? data[index].hosname : ''}</td>
                        </tr>
                        <tr>
                            <th>Email Id  </th><td> {data[index] ? data[index].email : ''}</td>
                        </tr>
                        <tr>
                            <th>Mobile No  </th><td> {data[index] ? data[index].mobileno : ''}</td>
                        </tr>
                        <tr>
                            <th>Address  </th><td> {data[index] ? data[index].address : ''}</td>
                        </tr>
                        <tr>
                            <th>Country  </th><td> {data[index] ? data[index].country : ''}</td>
                        </tr>
                        <tr>
                            <th>State  </th><td> {data[index] ? data[index].state : ''}</td>
                        </tr>
                        <tr>
                            <th>District  </th><td> {data[index] ? data[index].district : ''}</td>
                        </tr>
                        <tr>
                            <th>City  </th><td> {data[index] ? data[index].city : ''}</td>
                        </tr>
                    </tbody>
                </Table>

            </Modal>
        </div>

    );
}
        // }