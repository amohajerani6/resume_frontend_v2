import React, { useState, useEffect } from "react"
import axios from "../utils/axios"

const PingAPI = () => {
  const [APIResponse, setAPIResponse] = useState("")
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/")
        setAPIResponse(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <>{APIResponse}</>
    </div>
  )
}

export default PingAPI
