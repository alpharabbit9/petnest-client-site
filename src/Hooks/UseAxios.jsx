import axios from "axios";


const AxiosSecure = axios.create({
    baseURL:'https://petnest-server-site.vercel.app'
})

const UseAxios = () => {
    return AxiosSecure ;
};

export default UseAxios;