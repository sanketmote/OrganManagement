import axios from "axios";

const API_URL = "http://localhost:4000/";  // change to hosted API link

class AuthService {
    async login(loginval) {
        return await axios.post(API_URL + "login", loginval)
            .then(res => {
                if (!res.data.message) {
                    if (res.data.accessToken) {
                        console.log(res.data);
                        localStorage.setItem("user", JSON.stringify(res.data));
                        console.log(JSON.parse(localStorage.getItem('user')));
                    }
                    if (loginval.role === 'users') {
                        window.location = '/user'
                    }
                    if (loginval.role === 'Hospitals') {
                        window.location = '/HDashboard' //#endregion
                    }
                    if (loginval.isAdmin=== 'Admin') {
                        window.location = '/ADashboard' //#endregion
                    }
                    return res.data;
                } else {
                    return res.data;
                }
            })
            .catch(err => {
                console.log(err);
                return { error: err, message: "server is crashed" };
            });
    }

    logout() {
        localStorage.removeItem("user");
        window.location = '/'
    }

    userregister(regdata) {
        return axios.post(API_URL + "ur", regdata);
    }

    hospitalregister(regdata) {
        return axios.post(API_URL + "hr", regdata);
    }

    async getCurrentUser() {
        // console.log(JSON.parse(localStorage.getItem('user')))
        return await JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();