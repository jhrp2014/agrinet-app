import React, { useState, useEffect } from 'react';

const AgriNetApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [loginError, setLoginError] = useState('');
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
    setLoginError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setRegisterError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      localStorage.setItem('agrinetUser', JSON.stringify(loginForm));
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setLoginError('Preencha todos os campos.');
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
    localStorage.setItem('agrinetUser', JSON.stringify(registerForm));
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('agrinetUser');
    setIsAuthenticated(false);
    setShowLogin(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {showLogin && (
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>
            <form onSubmit={handleLogin}>
              <input
                name="email"
                type="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Senha"
                className="w-full p-2 mb-3 border rounded"
              />
              {loginError && <p className="text-red-600 text-sm mb-3">{loginError}</p>}
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Entrar</button>
            </form>
            <p className="text-center mt-4">
              Não tem uma conta?{' '}
              <button onClick={switchToRegister} className="text-green-600 font-medium">Cadastre-se</button>
            </p>
          </div>
        )}

        {showRegister && (
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Cadastro</h2>
            <form onSubmit={handleRegister}>
              <input
                name="name"
                type="text"
                value={registerForm.name}
                onChange={handleRegisterChange}
                placeholder="Nome completo"
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                placeholder="Email"
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                placeholder="Senha"
                className="w-full p-2 mb-3 border rounded"
              />
              <input
                name="confirmPassword"
                type="password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                placeholder="Confirmar Senha"
                className="w-full p-2 mb-3 border rounded"
              />
              {registerError && <p className="text-red-600 text-sm mb-3">{registerError}</p>}
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Cadastrar</button>
            </form>
            <p className="text-center mt-4">
              Já tem uma conta?{' '}
              <button onClick={switchToLogin} className="text-green-600 font-medium">Fazer login</button>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Bem-vindo à AgriNet!</h1>
        <p className="mb-4">Você está autenticado. Aqui ficará o feed do agronegócio.</p>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
      </div>
    </div>
  );
};

export default AgriNetApp;
