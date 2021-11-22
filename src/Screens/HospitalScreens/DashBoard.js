import React, { useState, useEffect } from "react";
import Axios from 'axios'
import pic from "../../Images/admin.png";
import Hypnosis from "../loader";
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
import web3 from "../../Etherium/web";
export function DashBoard() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [datafetched, setdatafetched] = useState(false);
    const [user, setUser] = useState({});

    useEffect(async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
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
                    if(DonarInfo['added']==false){
                        Axios.get("http://localhost:4000/getrequest?hid="+DonarInfo['hospitalid'])
                        .then(result => {
                            addData.push(result.data[0])
                            setData(addData);
                            console.log(addData);
                            // setdatafetched(true);
                        });
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
        setdatafetched(true);

    }, []);

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
                                        <a href="#" className="btn btn-small btn-primary">Recipents</a>
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        {data.map((item, index) => {
                                                return <tr>
                                                    <th scope="row">{index}.</th>
                                                    <td>{item.selecthospital}</td>
                                                    <td>{item.orgname}</td>
                                                    <td>{item.date}</td>
                                                    {/* <td onClick={openDropDown} >verifyhospital</td>
                                                    {open === true ? openList : null} */}
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
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
            </div>

        );
    }
}
// }