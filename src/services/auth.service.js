import axios from "axios";

const API_URL = "http://localhost:4000/";  // change to hosted API link

class AuthService {
    login(role, username, password) {

        const loginval = {
            role: this.state.role,
            email: this.state.email,
            // metamaskid: this.state.metamaskid,
            password: this.state.password,
        }

        return axios.post(API_URL + "login", loginval)
            .then(res => {

                if (!res.data.message) {
                    if (res.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                    }
                    if (loginval.role === 'users') {
                        window.location = '/user'
                    }
                    if (loginval.role === 'Hospitals') {
                        window.location = '/HDashboard' //#endregion
                    }
                    return res.data;
                } else {
                    return res.message;
                }
                return res;
            })
            .catch(err => {
                console.log(err);
                return { error: err, message: "server is crashed" };
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    userregister(regdata) {
        return axios.post(API_URL + "ur", regdata);
    }

    hospitalregister(regdata) {
        return axios.post(API_URL + "hr", regdata);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();