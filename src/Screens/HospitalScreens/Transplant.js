import React, { useState, useEffect } from "react";
import Axios from 'axios'
import Hypnosis from "../loader";
import { Table, Button } from 'react-bootstrap';
import AuthService from "../../services/auth.service";
import instance from "../../Etherium/contrctInstance";
import web3 from "../../Etherium/web";
import Modal from './Transplant_Model';
var isdone = false;
var index = null;

export function Transplant() {
    const [data, setData] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [datafetched, setdatafetched] = useState(false);
    const [user, setUser] = useState({});
    const [donardata, setDonarData] = useState([]);
    useEffect(async () => {
        require("../../styles/bootstrap.min.css");
        require("../../styles/tooplate.css");
        // debugger;
        var cnt = 0;

        const accounts = await web3.eth.getAccounts();
        const tmpUser = await AuthService.getCurrentUser()
        setUser(tmpUser);
        console.log(tmpUser)
        console.log(accounts[0]);
        if (accounts[0] && tmpUser) {
            // const len=await instance.methods.getDonorcount().call();
            var addData = [];
            // console.log(len);
            // for(var i=0; i<len; i++)
            // {
            //     const donorid=await instance.methods.donorarr(i).call();
            //     const DonarInfo =await instance.methods.Donors(donorid).call();
            //     console.log(DonarInfo);
            //     if(DonarInfo['hospitalid']===accounts[0]){
            //         if(DonarInfo['added']==true){
            //             Axios.get("http://localhost:4000/getrequest?hid="+DonarInfo['hospitalid'])
            //             .then(result => {
            //                 addData.push(result.data[0])
            //                 setData(addData);
            //                 isdone = false;
            //                 cnt++;
            //                 // console.log(addData);
            //                 // setdatafetched(true);
            //             });
            //             // addData.push(DonarInfo);
            //             // setData(addData);
            //         }
            //     }
            // }

            const len1 = await instance.methods.getrecipientcount().call();
            console.log(len1);
            for (var i = 0; i < len1; i++) {
                const donorid = await instance.methods.recipientarr(i).call();
                const DonarInfo = await instance.methods.Recipients(donorid).call();
                console.log(DonarInfo);
                if (DonarInfo['hospitalid'] === accounts[0]) {
                    if (DonarInfo['added'] == true) {
                        Axios.get("http://localhost:4000/getrequest?hid=" + DonarInfo['hospitalid'] + "&userrole=seeker")
                            .then(result => {
                                addData.push(result.data[0])
                                setData(addData);
                                isdone = false;
                                cnt++;
                                // console.log(addData);
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
        if (cnt == 0) {
            isdone = true;
            setdatafetched(true);
        }
        setdatafetched(true);

    }, []);

    function logout() {
        AuthService.logout();
    }

    async function toggleModal(metaid,id) {
        setdatafetched(false);

        var abs = await instance.methods.transplantmatch(metaid).call();
        Axios.get("http://localhost:4000/getrequest?hid=" + abs + "&userrole=Donar")
            .then(result => {
                // .push(result.data[0])
                setDonarData(result.data[0]);
                setdatafetched(true);

            });
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
                        <div className="col-xl-12 col-lg-12 tm-md-12 tm-sm-12 tm-col">
                            <div className="bg-white tm-block h-100">
                                <div className="row">
                                    <div className="col-md-8 col-sm-12">
                                        <h2 className="tm-block-title d-inline-block"> Transplant </h2>

                                    </div>
                                    <div className="col-md-4 col-sm-12 text-right">
                                        <a href="/HDashboard" className="btn btn-small btn-primary space">Back</a>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped tm-table-striped-even mt-3">
                                        <thead>
                                            <tr className="tm-bg-gray">
                                                <th scope="col">sr no</th>
                                                <th scope="col">Seeker Name</th>
                                                <th scope="col" className="text-center">Organ</th>
                                                <th scope="col">Find Donar</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {data.map((item, index) => {
                                                return <tr>
                                                    <th scope="row">{index}.</th>
                                                    <td>{item.fullName}</td>
                                                    <td>{item.orgname}</td>
                                                    <td>
                                                        <Button variant="info" onClick={() => toggleModal(item.metamaskid,index)} >
                                                            <span style='font-size:100px;'>&#10144;</span>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            })}

                                        </tbody>
                                    </table>
                                    {isdone === true ? <div className="isdone">No More To Do Transplant</div> : <div></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={isOpen}
                    onClose={() => toggleModal({ index })} metamaskid={donardata[index] ? donardata[index].metamaskid : ''}>
                    <Table className="table">
                        <tbody>

                            <tr>
                                <th>Hospital Name </th><td> {donardata[index] ? donardata[index].fullName : ''}</td>
                            </tr>
                            <tr>
                                <th>Email Id  </th><td> {donardata[index] ? donardata[index].email : ''}</td>
                            </tr>
                            <tr>
                                <th>Mobile No  </th><td> {donardata[index] ? donardata[index].mobileno : ''}</td>
                            </tr>
                            <tr>
                                <th>Blood Group </th><td> {data[index] ? data[index].bloodgroup : ''}</td>
                            </tr>
                            <tr>
                                <th>Organ Name </th><td> {data[index] ? data[index].orgname : ''}</td>
                            </tr>
                            <tr>
                                <th>State  </th><td> {donardata[index] ? donardata[index].state : ''}</td>
                            </tr>
                            <tr>
                                <th>District  </th><td> {donardata[index] ? donardata[index].district : ''}</td>
                            </tr>
                            <tr>
                                <th>City  </th><td> {donardata[index] ? donardata[index].city : ''}</td>
                            </tr>
                        </tbody>
                    </Table>

                </Modal>
            </div>

        );
    }
}
// }