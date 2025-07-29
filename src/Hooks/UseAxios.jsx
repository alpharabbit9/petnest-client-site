import axios from "axios";


const AxiosSecure = axios.create({
    baseURL:'http://localhost:5000'
})

const UseAxios = () => {
    return AxiosSecure ;
};

export default UseAxios;