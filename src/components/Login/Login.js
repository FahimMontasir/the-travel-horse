import React, { useRef } from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const onSubmit = data => console.log(data);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create an account</h1>
        <input name="firstName" type="text" placeholder="your name" ref={register({
          required: true,
          maxLength: 20
        })} />
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
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <input
          name="password_repeat"
          type="password"
          ref={register({
            validate: value =>
              value === password.current || "The passwords do not match"
          })}
        />
        {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
        <br />
        <input type="submit" />
        <h5>Already have an account? <span>login</span></h5>
      </form>
      <div className="others-login">
        <p>_______________OR_______________</p>
        <h1>facebook icon and google icon</h1>
      </div>
    </div>
  );
}

export default Login;