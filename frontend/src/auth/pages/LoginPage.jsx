import { useContext, useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { login as loginUser } from '../services/authService';

export const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useContext( AuthContext );
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const lastPath = localStorage.getItem('lastPath') || '/';
    //const lastPath = '/tasks';
    
    try {
      const data = await loginUser({ email, password });

      if (data === 'Invalid email or password') {
        setError(data);
        setSuccess('');
        return;
        
      }
      
      setSuccess('Login exitoso');
      setError('');
      login( data.user.name, data.user.id, data.token );
      
      navigate( lastPath, {
        replace: true
      });
      console.log('Token recibido:', data.token); // Manejar token
      console.log('User logueado:', data.user.name);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleLogin} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary m-1">Login</button>
        <Link to={`/login/register`}>
          Register User       
        </Link>
      </form>
    </div>
  )
}
