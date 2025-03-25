
import React, { useState, useEffect } from 'react';

// Simulações de dados
const news = [
  { id: 1, title: 'Novas tecnologias de plantio aumentam produtividade em 30%', source: 'Portal Agro', time: '1h atrás' },
  { id: 2, title: 'Exportações de soja batem recorde no primeiro trimestre', source: 'Agro News', time: '3h atrás' },
  { id: 3, title: 'Clima favorável deve impulsionar safra de milho', source: 'Info Rural', time: '5h atrás' },
];

const events = [
  { id: 1, title: 'Feira Agropecuária de São Paulo', date: '28/03/2025', location: 'São Paulo, SP' },
  { id: 2, title: 'Workshop de Irrigação Sustentável', date: '15/04/2025', location: 'Ribeirão Preto, SP' },
  { id: 3, title: 'Congresso de Inovação no Agro', date: '10/05/2025', location: 'Campinas, SP' },
];

const AgriNetApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [activeTab, setActiveTab] = useState('feed');

  useEffect(() => {
    const user = localStorage.getItem('agrinetUser');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setShowLogin(true);
    }
  }, []);

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
              <input name="email" type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="Email" className="w-full p-2 mb-3 border rounded" />
              <input name="password" type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Senha" className="w-full p-2 mb-3 border rounded" />
              {loginError && <p className="text-red-600 text-sm mb-3">{loginError}</p>}
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Entrar</button>
            </form>
            <p className="text-center mt-4">Não tem uma conta? <button onClick={switchToRegister} className="text-green-600 font-medium">Cadastre-se</button></p>
          </div>
        )}
        {showRegister && (
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Cadastro</h2>
            <form onSubmit={handleRegister}>
              <input name="name" type="text" value={registerForm.name} onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} placeholder="Nome completo" className="w-full p-2 mb-3 border rounded" />
              <input name="email" type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} placeholder="Email" className="w-full p-2 mb-3 border rounded" />
              <input name="password" type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} placeholder="Senha" className="w-full p-2 mb-3 border rounded" />
              <input name="confirmPassword" type="password" value={registerForm.confirmPassword} onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })} placeholder="Confirmar Senha" className="w-full p-2 mb-3 border rounded" />
              {registerError && <p className="text-red-600 text-sm mb-3">{registerError}</p>}
              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Cadastrar</button>
            </form>
            <p className="text-center mt-4">Já tem uma conta? <button onClick={switchToLogin} className="text-green-600 font-medium">Fazer login</button></p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">AgriNet</h1>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Sair</button>
        </div>
        <div className="mb-6">
          <button onClick={() => setActiveTab('feed')} className={`mr-4 ${activeTab === 'feed' ? 'font-bold' : ''}`}>Feed</button>
          <button onClick={() => setActiveTab('events')} className={`mr-4 ${activeTab === 'events' ? 'font-bold' : ''}`}>Eventos</button>
          <button onClick={() => setActiveTab('profile')} className={`${activeTab === 'profile' ? 'font-bold' : ''}`}>Perfil</button>
        </div>
          <button onClick={() => setActiveTab('feed')} className={`mr-4 ${activeTab === 'feed' ? 'font-bold' : ''}`}>Feed</button>
          <button onClick={() => setActiveTab('events')} className={`${activeTab === 'events' ? 'font-bold' : ''}`}>Eventos</button>
        </div>
        {activeTab === 'feed' && (
          <div>
            <h2 className="text-xl font-bold mb-3">Últimas Notícias</h2>
            {news.map((item) => (
              <div key={item.id} className="mb-3 p-3 border rounded bg-green-50">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.source} • {item.time}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-xl font-bold mb-3">Próximos Eventos</h2>
            {events.map((event) => (
              <div key={event.id} className="mb-3 p-3 border rounded bg-green-50">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-bold mb-3">Meu Perfil</h2>
            <p><strong>Nome:</strong> {JSON.parse(localStorage.getItem('agrinetUser'))?.name || 'Nome não informado'}</p>
            <p><strong>Email:</strong> {JSON.parse(localStorage.getItem('agrinetUser'))?.email || 'Email não informado'}</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default AgriNetApp;
