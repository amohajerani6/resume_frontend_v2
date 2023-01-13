import axios from "axios"
const BASE_URL = "https://4ifjn614cg.execute-api.us-east-1.amazonaws.com/"

export default axios.create({
  baseURL: BASE_URL,
})
