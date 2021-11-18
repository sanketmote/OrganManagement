import axios from "axios";

const API_URL = "http://localhost:4000/";


export default new class GetData {
    async getHospitals(state1,district,city) {
        try {
            await axios.get(API_URL + "getHospital?state="+state1+"&district="+district+"&city="+city)
            .then(res => {
                console.log(JSON.stringify(res.data))
                return res.data
            })
            .catch(err => {
                console.log(err);
                return []
            });
        } catch(err) {
            return [];
        }
    }
}
