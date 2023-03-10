import React from "react"
import { Router, Route, Switch } from "react-router-dom"
import { Container } from "reactstrap"

import Loading from "./components/Loading"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Newpage from "./views/Newpage"
import ViewPage from "./views/ViewPage"
import PingAPI from "./views/PingAPI"
import { useAuth0 } from "@auth0/auth0-react"
import history from "./utils/history"

// styles
import "./App.css"

// fontawesome
import initFontAwesome from "./utils/initFontAwesome"
import DashPage from "./views/DashPage"
initFontAwesome()

const App = () => {
  const { isLoading, error } = useAuth0()

  if (error) {
    return <div>Oops... {error.message}</div>
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        {!window.location.pathname.startsWith("/view/") ? <NavBar /> : <></>}
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/view/:page" component={ViewPage} />
            <Route path="/" exact component={Home} />
            <Route path="/ping" exact component={PingAPI} />
            <Route path="/profile" component={Profile} />
            <Route path="/new-page" component={Newpage} />
            <Route path="/dash/:page" component={DashPage} />
          </Switch>
        </Container>
        {!window.location.pathname.startsWith("/view/") ? <Footer /> : <></>}
      </div>
    </Router>
  )
}

export default App
