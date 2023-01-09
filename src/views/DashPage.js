import React, { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { Button } from "reactstrap"
import { useForm } from "react-hook-form"
import axios from "../utils/axios"
import TrafficTable from "../components/TrafficTable"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Loading from "../components/Loading"

function DashPage() {
  const { getAccessTokenSilently, loginWithPopup, getAccessTokenWithPopup } =
    useAuth0()
  const { register, handleSubmit } = useForm()
  const [accessToken, setAccessToken] = useState("")
  let { page } = useParams()
  const [pageTraffic, setPageTraffic] = useState([])

  useEffect(() => {
    async function fetchData() {
      const accessTokenTmp = await getAccessTokenSilently()
      setAccessToken(accessTokenTmp)

      const res = await axios.get("/dash/" + page, {
        headers: { authorization: "Bearer " + accessTokenTmp },
      })
      setPageTraffic(res.data.traffic)
    }
    fetchData()
  }, [])
  const history = useHistory()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("page", page)
    axios
      .post("/create-page", formData, {
        headers: {
          authorization: "Bearer " + accessToken,
          "Content-type": "multipart/form-data",
        },
      })
      .then(function (response) {
        if (response.data.created) {
          history.push("/dashboard")
        } else {
          alert("try again")
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  async function DeletePage() {
    const accessToken = await getAccessTokenSilently()
    if (window.confirm("Are you sure?")) {
      axios
        .delete("/dash/" + page, {
          headers: {
            authorization: "Bearer " + accessToken,
          },
        })
        .then(function (response) {
          history.push("/dashboard")
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <div>
        <h1 style={{ marginBottom: "4%" }}>{page}</h1>
        <hr />
        <h3>Manage the page</h3>

        <Link to={"/view/" + page}>
          <Button className="mt-5" color="primary">
            View the page
          </Button>
        </Link>
      </div>
      <div>
        <Button
          className="mt-5"
          color="primary"
          style={{ marginBottom: "2%" }}
          onClick={DeletePage}
        >
          Delete page
        </Button>
      </div>
      <div>
        <p>Update the file: </p>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="file" name="file" {...register("file")} />
          <button type="submit">Submit the file</button>
        </form>
      </div>
      <hr />
      <h3 style={{ marginBottom: "1%" }}>Traffic</h3>
      <TrafficTable data={pageTraffic}></TrafficTable>
    </div>
  )
}
export default withAuthenticationRequired(DashPage, {
  onRedirecting: () => <Loading />,
})
