import React, { Fragment } from "react"
import { useAuth0 } from "@auth0/auth0-react"

import Hero from "../components/Hero"

const Home = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  if (!isAuthenticated) {
    return (
      <Fragment>
        <hr />
        <Hero />
      </Fragment>
    )
  }
  return (
    <Fragment>
      <hr />
      <p>Logged in!</p>
      <h3>See the dashboard for existing pages or create a new page</h3>
    </Fragment>
  )
}

export default Home
