import './login.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';

export function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setErrror] = useState('');

  const login = () => {
    axios
      .post('/users/login', {
        username,
        password,
      })
      .then((res) => {
        setIsAuth(true);

        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/home', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setErrror(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="nav-bar">
        <h1>The Blog</h1>
      </div>
      <div className="login-section">
        <h2>
          <BiLogIn /> Login
        </h2>
        <h3>Enter for post something to The Blog</h3>
        <div className="label-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="label-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={login}>Login</button>
        {error !== '' ? <p>{error}</p> : ''}
      </div>
      <footer>
        <a
          href="https://github.com/gl-cardillo"
          target="_blank"
          rel="noreferrer"
        >
          <p>
            <FaGithub style={{ fontSize: '25px' }} /> Made by Luca Cardillo
          </p>
        </a>
      </footer>
    </div>
  );
}
