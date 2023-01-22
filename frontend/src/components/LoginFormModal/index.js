import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  return (
    <div className='form-container'>
      <h1 className='form-h1'>Log In</h1>
      <form onSubmit={handleSubmit} className='form'>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className='errors'>{error}</li>
          ))}
        </ul>
        <label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeHolder='Username or Email'
            className='top-input'
          />
        </label>
        <label>
          <input

            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeHolder='Password'
            className='bottom-input'
          />
        </label>
        <button
          type="submit"
          className='LogIn-button'>
          Log In
        </button>
        <button
          className='demo-user-button'
          type='submit'
          onClick={() => {
            setCredential('Demo-lition');
            setPassword('password')
          }}>
          Demo User </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
