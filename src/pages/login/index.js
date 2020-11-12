import React, {useState} from 'react';
import './styles.css';
import api from '../../services/api'
import {useHistory} from 'react-router-dom'

function Login() { 

  const[username, setUsername] = useState();
  const[password, setPassword] = useState();
  const grant_type = "password";
  const client_id = "IZxlM5Zq6bhWT3r6LPgnMcLyb4WS71ycMhShUw59";
  const client_secret = "y5J7tiB58f1oNxWHqg4yS2sQHqrzkFbqVmQiI2DlQxRcLKWCIAMXGkwowYCddv2AgkPjUdY7XrCvmW8iiaT0cmQgkbin60fmOYNHMpFJmR6oHnsBhQpKpHLnVFYN4CNj";
  const history = useHistory();
  async function handleLogin(e) {
    e.preventDefault();
    const data = {
      grant_type,
      client_id,
      client_secret,
      username,
      password
    }
    try{
      const response = await api.post('/api/v1/oauth/token/', data, {
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded",
          
        },
      });
      localStorage.setItem('expires_in', response.data.expires_in);
      localStorage.setItem('access_token', 'Bearer ' + response.data.access_token);
      localStorage.setItem('refresh_token', 'Bearer ' + response.data.refresh_token)
      history.push('/home')
    }catch(err){
      alert('Falha no login!')
    }
  }
  return (
      <div className="container">
        <div className="content">
          <form onSubmit={handleLogin}>
            <h1>Faça seu login</h1>
              <input 
                placeholder="Nome de Usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button className="button" type="submit">Enviar</button>
            </form>
        </div>
      </div>
  );
}
export default Login;