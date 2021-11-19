
import React, { useState, useEffect } from "react";
import Axios from 'axios'
import AuthService from "../../services/auth.service";
export default function DashBoard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
        const user = AuthService.getCurrentUser();
        console.log("user");
        if(user.roles == "Admin") {
            Axios
            .get("http://localhost:4000/gethosrequest?hid=")
            .then(result => setData(result.data));
        console.log(data);
        } else {
            alert("You are not allowed to access this page");
            var link = '/login'
            window.location.href = link;

        }
        // debugger;
    }, []);

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
                                    <a href="#" class="btn btn-small btn-primary">Logout</a>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover table-striped tm-table-striped-even mt-3">
                                    <thead>
                                        <tr class="tm-bg-gray">
                                            <th scope="col">sr no</th>
                                            <th scope="col">Hospital Name</th>
                                            <th scope="col">Request Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">

                                                1.
                                            </th>
                                            <td class="tm-product-name">S K S </td>

                                            <td>2021-11-28</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">
                                                {/* <!-- <input type="checkbox" aria-label="Checkbox"> --> */}
                                                2.
                                            </th>
                                            <td class="tm-product-name">W K S</td>

                                            <td>2021-11-24</td>
                                            {/* <!-- <td><i class="fas fa-trash-alt tm-trash-icon"></i></td> --> */}
                                        </tr>

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
        // }