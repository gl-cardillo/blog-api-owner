import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        console.log(err)
        setErrror(err.response.data.message);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
      {error !== '' ? <p>{error}</p> : ''}
    </div>
  );
}
