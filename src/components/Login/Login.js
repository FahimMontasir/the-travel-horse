import { Button } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import './Login.css'
const Login = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = data => console.log(data);
  const [newUser, setNewUser] = useState(true);
  return (
    <div className="login-page">

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h4>{newUser ? "Create an account" : "Log in your account"}</h4>
        {
          newUser && <input name="firstName" type="text" placeholder="your name" ref={register({
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
        <h1><Button variant="light"><FontAwesomeIcon size="2x" icon={faGoogle} /></Button> <Button variant="light"><FontAwesomeIcon size="2x" icon={faFacebook} /></Button></h1>
      </div>
    </div>
  );
}

export default Login;