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
  return <h2>logged in</h2>
}

export default Home
