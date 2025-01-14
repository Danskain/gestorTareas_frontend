import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(userData);
      setSuccess('Registro exitoso');
      setError('');
      console.log('Usuario registrado:', data);

      
      setTimeout(navigate('/login'), 5000);
      
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registro</h1>
      <hr />
      <form onSubmit={handleRegister} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};