import axios from "axios"

const key = localStorage.getItem('key')
const api = axios.create({
    baseURL: `https://pixabay.com/api/?key=${key}&per_page=20`
  });
  
  export default api;