import React, { useState, useEffect } from "react";
import Axios from 'axios'
import pic from "../../Images/admin.png";
import Hypnosis from "../loader";
import Modal from '../../services/Model';
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
import web3 from "../../Etherium/web";
var isdone = false;
var index = null;

export function DashBoard() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [datafetched, setdatafetched] = useState(false);
    const [user, setUser] = useState({});

    useEffect( async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
        var cnt = 0;

        const accounts= await web3.eth.getAccounts();
        const tmpUser = await AuthService.getCurrentUser()
        setUser(tmpUser);
        console.log(tmpUser)
        console.log(accounts[0]);
        if(accounts[0] && tmpUser){
            const len=await instance.methods.getDonorcount().call();
            var addData = [];
            console.log(len);
            for(var i=0; i<len; i++)
            {
                const donorid=await instance.methods.donorarr(i).call();
                const DonarInfo =await instance.methods.Donors(donorid).call();
                console.log(DonarInfo);
                if(DonarInfo['hospitalid']===accounts[0]){
                    console.log("Hello")
                    if(DonarInfo['added']==false){
                        Axios.get("http://localhost:4000/getrequest?hid="+DonarInfo['hospitalid']+"&userrole=Donar")
                        .then(result => {
                            addData.push(result.data[0])
                            setData(addData);
                            isdone = false;
                            cnt++;
                            console.log(result);
                            // setdatafetched(true);
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                        // addData.push(DonarInfo);
                        // setData(addData);
                    }
                }
            }
        }
        // Axios
        //     .get("http://localhost:2345/Api/employee/DemoData")
        //     .then(result => setData(result.data));
        // console.log(data);
        // debugger;
        if (cnt == 0) {
            isdone = true;
            setdatafetched(true);
        }
        setdatafetched(true);

    }, []);

    function logout() {
        AuthService.logout();
    }
    function toggleModal(id) {
        index = id;
        setisOpen(!isOpen);
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
                                    <div className="col-md-6 col-sm-12">
                                        <h2 className="tm-block-title d-inline-block"> Requests </h2>

                                    </div>
                                    <div className="col-md-6 col-sm-12 text-right">
                                        <a href="Transplant" className="btn btn-small btn-primary space">Transplant</a>
                                        <Button variant="info" className="btn btn-small btn-primary space" onClick={() => logout(index)} >
                                            Logout
                                        </Button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped tm-table-striped-even mt-3">
                                        <thead>
                                            <tr className="tm-bg-gray">
                                                <th scope="col">sr no</th>
                                                <th scope="col">Donar Name</th>
                                                <th scope="col" className="text-center">Organ</th>
                                                <th scope="col">Request Date</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        {data.map((item, index) => {
                                                return <tr>
                                                    <th scope="row">{index}.</th>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.orgname}</td>
                                                    <td>{item.date}</td>
                                                    <td>
                                                        <Button variant="info" onClick={() => toggleModal(index)} >
                                                            Details
                                                        </Button>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                    {isdone === true ? <div className="isdone">No Current Request in Inbox</div> : <div></div>}
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
                                <h2 className="tm-block-title">{user.fullName}</h2>
                                <div className="tm-block-title">
                                    <img src={pic} alt="Profile Image" />
                                </div>
                                <h5 className="info">Mobile No - {user.mobileno}</h5>
                                <h5 className="info">Email id - {user.email}</h5>
                                <h5 className="info">Addres - {user.address} </h5>
                            </div>
                        </div>

                    </div>
                </div>

                <Modal show={isOpen}
                    onClose={() => toggleModal({ index })} metamaskid={data[index] ? data[index].metamaskid : ''}>
                    <Table className="table">
                        <tbody>

                            <tr>
                                <th>Hospital Name </th><td> {data[index] ? data[index].fullName : ''}</td>
                            </tr>
                            
                            <tr>
                                <th>Blood Group </th><td> {data[index] ? data[index].bloodgroup : ''}</td>
                            </tr>
                            <tr>
                                <th>Organ Name </th><td> {data[index] ? data[index].orgname : ''}</td>
                            </tr>
                            <tr>
                                <th>Email Id  </th><td> {data[index] ? data[index].email : ''}</td>
                            </tr>
                            <tr>
                                <th>Mobile No  </th><td> {data[index] ? data[index].mobileno : ''}</td>
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