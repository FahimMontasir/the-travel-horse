import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

//firebase initialize
export const firebaseInitialize = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}
//google sign in method
export const handleGoogleBtn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { displayName, email } = result.user;
      const validUser = { name: displayName, email: email, isSuccess: true };
      return validUser;
    })
    .catch((error) => {
      return error;
    });

}
//facebook sign in method
export const handleFbBtn = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const { displayName, email } = result.user;
      const validUser = { name: displayName, email: email, isSuccess: true };
      return validUser;
    })
    .catch((error) => {
      return error;
    });
}
// log in with form
export const handleExistingUser = (email, userPassword) => {
  return firebase.auth().signInWithEmailAndPassword(email, userPassword)
    .then((result) => {
      const { email } = result.user;
      const validUser = { name: email, email: email, isSuccess: true };
      return validUser;
    })
    .catch((error) => {
      return error;
    });
}
//create new account
export const handleCreateUser = (email, userPassword) => {
  return firebase.auth().createUserWithEmailAndPassword(email, userPassword)
    .then((result) => {
      const { email } = result.user;
      const validUser = { name: email, email: email, isSuccess: true };
      return validUser;
    })
    .catch((error) => {
      return error;
    });

}