import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { Auth0Provider } from "@auth0/auth0-react"
import history from "./utils/history"
import { getConfig } from "./config"

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  )
}

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
const config = getConfig()

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  redirectUri: window.location.origin,
  onRedirectCallback,
}

ReactDOM.render(
  <Auth0Provider
    domain="dev-xy0rbu4evnjwlphn.us.auth0.com"
    clientId="EnTQMw6jHpxGeSYL5yl0jYZvgAxZ6at4"
    redirectUri={window.location.origin}
    audience="https://dev-xy0rbu4evnjwlphn.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
