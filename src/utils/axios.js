import axios from "axios"
const BASE_URL = "https://epe5gfqw17.execute-api.us-east-1.amazonaws.com"

export default axios.create({
  baseURL: BASE_URL,
})
