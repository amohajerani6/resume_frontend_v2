import axios from "axios"
const BASE_URL = "https://3wqz33ka05.execute-api.us-east-1.amazonaws.com/"

export default axios.create({
  baseURL: BASE_URL,
})
