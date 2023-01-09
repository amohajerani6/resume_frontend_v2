import axios from "axios"
const BASE_URL = "http://localhost:3002" //"https://api.thegagali.com"

export default axios.create({
  baseURL: BASE_URL,
})
