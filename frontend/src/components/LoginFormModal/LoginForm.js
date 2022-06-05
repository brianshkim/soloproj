import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginform.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div>
      <br></br>
      <form className="loginformclass" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="username">
          Username or Email
          <br></br>
          </label>
          <input className="usernameinput"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

        <br></br>
        <br></br>
        <label className= "username">
          Password
          <br></br>
      </label>
          <input
          className="usernameinput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <br></br>
      <br></br>
        <button class="loginbuttonform" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginForm;
