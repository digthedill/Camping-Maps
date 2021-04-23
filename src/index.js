import React from "react"
import ReactDOM from "react-dom"
import "./firebase/firebaseIndex"
import firebase from "firebase/app"
import { FirebaseAuthProvider } from "@react-firebase/auth"
import "./styles/index.css"
import App from "./App"
import config from "./firebase/firebaseIndex"

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <App />
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
