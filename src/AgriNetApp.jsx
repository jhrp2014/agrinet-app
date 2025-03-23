import React, { useState, useEffect } from 'react';
import {
  Mail, Lock, Eye, EyeOff, ArrowRight
} from 'lucide-react';

const AgriNetApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const news = [
    { id: 1, title: 'Novas tecnologias de plantio aumentam produtividade em 30%', source: 'Portal Agro', time: '1h atrás' },
    { id: 2, title: 'Exportações de soja batem recorde no primeiro trimestre', source: 'Agro News', time: '3h atrás' },
    { id: 3, title: 'Clima favorável deve impulsionar safra de milho', source: 'Info Rural', time: '5h atrás' }
  ];

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      const userData = { email: loginForm.email, name: 'Usuário AgriNet' };
      localStorage.setItem('agrinetUser', JSON.stringify(userData));
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setLoginError('Preencha todos os campos para fazer login.');
    }
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

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Entrar na AgriNet</h2>
          <p className="text-gray-600 text-center mb-8">A rede social para o agronegócio</p>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{loginError}</span>
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                  placeholder="seu@email.com"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5"
                  placeholder="********"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
            >
              Entrar
              <ArrowRight size={16} className="ml-2" />
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <button onClick={switchToRegister} className="text-green-600 hover:text-green-800 font-medium">
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AgriNet</h1>
          <button onClick={handleLogout} className="text-sm bg-white text-green-700 px-3 py-1 rounded-lg">
            Sair
          </button>
        </div>
      </header>
      <main className="flex-grow p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Feed de Notícias</h2>
        {news.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 mb-4">
            <h3 className="font-bold text-green-800">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.source} • {item.time}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default AgriNetApp;
