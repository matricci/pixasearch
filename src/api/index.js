import axios from "axios";

const key = localStorage.getItem("key");
const safeSearch = localStorage.getItem("safesearch");
console.log(safeSearch)
if (safeSearch == undefined) {
  localStorage.setItem("safesearch", true);
}
const api = axios.create({
  baseURL: `https://pixabay.com/api/?key=${key}&safesearch=${safeSearch}&per_page=20`,
});

export default api;
