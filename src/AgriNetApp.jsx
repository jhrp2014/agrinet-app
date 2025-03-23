import React, { useState, useEffect } from 'react';

const AgriNetApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    location: ''
  });
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('agrinetUser');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setShowLogin(true);
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setRegisterError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      localStorage.setItem('agrinetUser', JSON.stringify({ email: loginForm.email }));
      setIsAuthenticated(true);
      setShowLogin(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Preencha todos os campos.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('As senhas não coincidem.');
      return;
    }
    localStorage.setItem('agrinetUser', JSON.stringify({ email: registerForm.email, name: registerForm.name }));
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('agrinetUser');
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        {showLogin && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Entrar na AgriNet</h2>
            <form onSubmit={handleLogin}>
              <input name="email" type="email" value={loginForm.email} onChange={handleLoginChange} placeholder="Email" className="w-full p-2 mb-4 border rounded" />
              <input name="password" type="password" value={loginForm.password} onChange={handleLoginChange} placeholder="Senha" className="w-full p-2 mb-4 border rounded" />
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Entrar</button>
            </form>
            <p className="text-center mt-4">Não tem uma conta? <button onClick={switchToRegister} className="text-green-600">Cadastre-se</button></p>
          </div>
        )}

        {showRegister && (
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Criar Conta</h2>
            {registerError && <p className="text-red-500 mb-2 text-center">{registerError}</p>}
            <form onSubmit={handleRegister}>
              <input name="name" type="text" value={registerForm.name} onChange={handleRegisterChange} placeholder="Nome completo" className="w-full p-2 mb-3 border rounded" />
              <input name="email" type="email" value={registerForm.email} onChange={handleRegisterChange} placeholder="Email" className="w-full p-2 mb-3 border rounded" />
              <input name="password" type="password" value={registerForm.password} onChange={handleRegisterChange} placeholder="Senha" className="w-full p-2 mb-3 border rounded" />
              <input name="confirmPassword" type="password" value={registerForm.confirmPassword} onChange={handleRegisterChange} placeholder="Confirmar Senha" className
