import { Button } from "react-bootstrap";
import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import './Login.css'
import { loginContext } from "../../App";
import { firebaseInitialize, handleCreateUser, handleExistingUser, handleFbBtn, handleGoogleBtn } from "./Firebase";
import { useHistory, useLocation } from "react-router";


firebaseInitialize();
const Login = () => {
  const [userData, setUserData] = useContext(loginContext);
  const [errorMsg, setErrorMsg] = useState("")
  const [newUser, setNewUser] = useState(true);
  //react hook form
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  //handle set or get data
  const handleSetData = (res) => {
    setUserData(res)
    setErrorMsg(res.message)
    res.name && history.replace(from);
  }
  //google
  const handleGoogleSignUp = () => {
    handleGoogleBtn()
      .then(res => handleSetData(res))
  }

  //facebook
  const handleFacebookSignUp = () => {
    handleFbBtn()
      .then(res => handleSetData(res))
  }

  //form
  const onSubmit = data => {
    if (!newUser) {
      const email = data.email;
      const userPassword = data.password;
      handleExistingUser(email, userPassword)
        .then(res => handleSetData(res))
    }
    if (newUser) {
      const email = data.email;
      const userPassword = data.password;
      handleCreateUser(email, userPassword)
        .then(res => handleSetData(res))
    }
  };
  //once a user create an account he/she will be redirected 
  //to destination page and doesn't have to log in again.

  return (
    <div className="login-page">

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>{newUser ? "Create an account" : "Log in your account"}</h4>
        {
          newUser && <input name="name" type="text" placeholder="your name" ref={register({
            required: true,
            maxLength: 20
          })} />
        }
        <br />

        <input name="email" type="email" placeholder="your email" ref={register({
          pattern: /\S+@\S+\.\S+/,
          required: true
        })} />
        <br />

        <input name="password" type="password" placeholder="password" ref={register({
          required: true, minLength: {
            value: 6,
            message: "Password must have at least 6 characters"
          }
        })} />
        {errors.password && <em>{errors.password.message}</em>}
        <br />

        {!newUser && <div style={{ textAlign: 'end' }}><Button variant="link">forgot password</Button></div>}

        {newUser && <input
          name="password_repeat"
          type="password"
          placeholder="confirm password"
          ref={register({
            required: true,
            validate: value =>
              value === password.current || "The passwords do not match"
          })}
        />}
        {errors.password_repeat && <em>{errors.password_repeat.message}</em>}
        <br />

        <input type="submit" />
        <p>{newUser ? "Already have an account?" : "Don't have an account?"}<Button onClick={() => setNewUser(!newUser)} variant="link">{newUser ? "Login" : "Create one"}</Button></p>
      </form>

      <div className="others-login">
        <h1 style={{ textAlign: 'center' }}><Button variant="light" onClick={handleGoogleSignUp}><FontAwesomeIcon size="2x" icon={faGoogle} /></Button>
          <Button onClick={handleFacebookSignUp} variant="light"><FontAwesomeIcon size="2x" icon={faFacebook} /></Button></h1>
        {userData.isSuccess ? <h4 style={{ color: 'green' }}>"you've successfully logged in"</h4> :
          <h5 style={{ color: 'red' }}> {errorMsg}</h5>}
      </div>
    </div>
  );
}

export default Login;