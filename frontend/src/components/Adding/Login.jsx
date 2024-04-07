import React, { useState,useContext } from 'react';
import { AdminContext } from "../Context/AdminProvider";
import './Login.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate=useNavigate();
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { setIsAdmin } = useContext(AdminContext);

  const handleChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else if (event.target.name === 'confirmPassword') {
      setConfirmPassword(event.target.value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signIn) {
      try {
        const response = await fetch('https://viral-buzz-api.vercel.app/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);
        if (data.isAdmin===true) {
          setIsAdmin(true);
          navigate("/admin")
        } else {
          setIsAdmin(false);
         navigate("/")
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      try {
        const response = await fetch('https://viral-buzz-api.vercel.app/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        // const data = await response.json();
        console.log(response);
        navigate("/")
       
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  }

  const handleToggle = () => {
    setSignIn(!signIn);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the App!</h1>
      </header>
      <main>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="input"
          />
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="input"
          />
          {!signIn &&
            <>
              <label htmlFor="confirmPassword" className="label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                className="input"
              />
            </>
          }
          <button type="submit" className="button">{signIn ? 'Sign In' : 'Sign Up'}</button>
        </form>
        <p className="link" onClick={handleToggle}>
          {signIn
            ? 'Don\'t have an account?'
            : 'Already have an account?'
          }
        </p>
      </main>
    </div>
  );
}

export default Login;