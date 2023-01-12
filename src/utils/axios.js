import axios from "axios"
const BASE_URL = "https://resume-1549107421.us-east-1.elb.amazonaws.com/"

export default axios.create({
  baseURL: BASE_URL,
})
