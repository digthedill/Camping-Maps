import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
const config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
}

firebase.initializeApp(config)
// firebase.analytics()
firebase.auth()

const db = firebase.firestore()

export { config as default, db }
