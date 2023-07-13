import axios from "axios";

const Api = axios.create({
    baseURL: `https://luka-api-lukasl0.vercel.app/`
})

export default Api;