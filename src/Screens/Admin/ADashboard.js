import pic from "../../Images/admin.png";
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Modal from '../../services/Model';
// import { Hypnosis } from "react-cssfx-loading";
import Hypnosis from "../loader";
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
// var isOpen = false;
var isdone = false;
const user ={}
var index = null;
export function ADashboard() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [datafetched, setdatafetched] = useState(false);
    const [user, setUser] = useState({});
    useEffect(async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
        const tmpUser = await AuthService.getCurrentUser()
        setUser(tmpUser);
        console.log(tmpUser)
        if (tmpUser) {
            if (tmpUser.roles == "Admin") {
                const len = await instance.methods.gethospitalcount().call();
                var cnt =0;
                const adddata = [];
                for (var i = 0; i < len; i++) {
                    const hid = await instance.methods.hospitalarr(i).call();
                    const hinfo = await instance.methods.hospital(hid).call();
                    if (hinfo['added'] == false) {
                        cnt++;
                        Axios
                            .get("http://localhost:4000/verifyhospital?hid=" + hid)
                            .then(result => {
                                adddata.push(result.data[0])
                                setData(adddata);
                                setdatafetched(true);
                                isdone = false;
                            });
                    }
                }
                if(cnt == 0) {
                    isdone = true;
                    setdatafetched(true);
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
    }
    function logout() {
        AuthService.logout();
    }

    if (!datafetched) {
        return (
            <Hypnosis />
        )
    } else {
        return (
            <div className="" id="home">
                <div className="container">
                    <div className="row tm-content-row tm-mt-big">
                        <div className="col-xl-8 col-lg-12 tm-md-12 tm-sm-12 tm-col">
                            <div className="bg-white tm-block h-100">
                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <h2 className="tm-block-title d-inline-block"> Requests </h2>

                                    </div>
                                    <div className="col-md-4 col-sm-12 text-right">
                                        <Button variant="info" className="btn btn-small btn-primary" onClick={() => logout(index)} >
                                            Logout
                                        </Button>

                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped tm-table-striped-even mt-3">
                                        <thead>
                                            <tr className="tm-bg-gray">
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
                                    {isdone === true ? <div className="isdone">No Current Request in Inbox</div>: <div></div>}

                                </div>

                                {/* <div className="tm-table-mt tm-table-actions-row">
    
                                    <div className="tm-table-actions-col-right">
                                        <span className="tm-pagination-label">Page</span>
                                        <nav aria-label="Page navigation" className="d-inline-block">
                                            <ul className="pagination tm-pagination">
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item">
                                                    <span className="tm-dots d-block">...</span>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">13</a></li>
                                                <li className="page-item"><a className="page-link" href="#">14</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-12 tm-md-12 tm-sm-12 tm-col">

                            <div className="bg-white tm-block">
                                <h2 className="tm-block-title">Profile Image</h2>
                                <div className="tm-block-title">
                                    <img src={pic} alt="Profile Image" />
                                </div>
                                <h2 className="tm-block-title">{user.fullName}</h2>
                                <h5 className="info">Mobile No - {user.mobileno}</h5>
                                <h5 className="info">Email id - {user.email}</h5>
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

}
        // }