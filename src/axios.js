import customAxios from 'axios';


const BASE_URL_SERVER = 'https://golden-own-test-backend.onrender.com';

const axios = customAxios.create({
  baseURL: BASE_URL_SERVER,
});


export default axios;