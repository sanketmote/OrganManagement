import React, { useState, useEffect } from "react";
import Axios from 'axios'
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
        const accounts=web3.eth.getAccounts();
        if(accounts[0]){
            const len=await instance.methods.getDonorcount().call();
            var addData = [];
            for(var i=0; i<len; i++)
            {
                const donorid=await instance.methods.donorarr(i).call();
                const DonarInfo =await instance.methods.Donars(donorid).call();
                if(DonarInfo['hospitalid']===accounts[0]){
                    if(DonarInfo['added']==false){
                        addData.push(DonarInfo);
                        setData(addData);
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
                                        <a href="#" class="btn btn-small btn-primary">Recipents</a>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped tm-table-striped-even mt-3">
                                        <thead>
                                            <tr class="tm-bg-gray">
                                                <th scope="col">sr no</th>
                                                <th scope="col">Donar Name</th>
                                                <th scope="col" class="text-center">Organ</th>
                                                <th scope="col">Request Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        {data.map((item, index) => {
                                                return <tr>
                                                    <th scope="row">{index}.</th>
                                                    <td>{item.hosname}</td>
                                                    <td>hello</td>
                                                    <td>{item.date}</td>
                                                    {/* <td onClick={openDropDown} >verifyhospital</td>
                                                    {open === true ? openList : null} */}
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                </div>

                                <div class="tm-table-mt tm-table-actions-row">

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
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-4 col-lg-12 tm-md-12 tm-sm-12 tm-col">

                            <div class="bg-white tm-block">
                                <h2 class="tm-block-title">Hospital Name</h2>

                                <h2 class="tm-block-title">Profile Image</h2>
                                <div class="tm-block-title">
                                    <img src="img/profile-image.png" alt="Profile Image" />
                                </div>


                                <h5 class="info">Addres - WCE sangli</h5>
                                <h5 class="info">Meta Mask ID - </h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}
// }