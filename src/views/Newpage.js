import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "../utils/axios"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import Loading from "../components/Loading"

function NewPage() {
  const { getAccessTokenSilently } = useAuth0()
  const history = useHistory()

  const { register, handleSubmit } = useForm()
  const [pageName, setPageName] = useState("")

  function onChangeFunc(event) {
    setPageName(event.target.value)
  }

  const onSubmit = async (data) => {
    const accessToken = await getAccessTokenSilently()
    const formData = new FormData()
    formData.append("file", data.file[0])
    formData.append("page", pageName)
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
  return (
    <>
      <div>
        <h1>Create page</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="page"
            type="text"
            placeholder="page name"
            className="userInput"
            onChange={onChangeFunc}
          />
          <input type="file" name="file" {...register("file")} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
export default withAuthenticationRequired(NewPage, {
  onRedirecting: () => <Loading />,
})
