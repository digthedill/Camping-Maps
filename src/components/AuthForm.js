import firebase from "firebase/app"
import authStyles from "../styles/forms.module.css"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  // signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/signedIn",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
}

const AuthForm = () => {
  return (
    <div className={authStyles.logInContainer}>
      <h1>Sign In</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  )
}

export default AuthForm
