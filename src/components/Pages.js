import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../utils/axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Loading from "./Loading"

function Dashboard() {
  const [pages, setPages] = useState(["1", "2", "3"])
  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0()

  useEffect(() => {
    async function fetchData() {
      try {
        const accessToken = await getAccessTokenSilently()
        const res = await axios.get("/pages", {
          headers: { authorization: "Bearer " + accessToken },
        })
        setPages(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Existing pages</h1>
      {pages.map(function (page, idx) {
        return (
          <div key={idx}>
            <Link to={"/dash/" + page.page}>{page.page}</Link>
          </div>
        )
      })}
    </div>
  )
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
})
