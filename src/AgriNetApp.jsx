
import React, { useState, useEffect } from 'react';
import {
  Search, Calendar, MessageCircle, Bell, UserPlus,
  BarChart2, Briefcase, Users, Menu, X, Mail,
  Lock, User, ArrowRight, Eye, EyeOff
} from 'lucide-react';

const AgriNetApp = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Produtor Rural',
    location: ''
  });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const events = [
    { id: 1, title: 'Feira Agropecuária de São Paulo', date: '28/03/2025', location: 'São Paulo, SP', type: 'Feira' },
    { id: 2, title: 'Workshop de Irrigação Sustentável', date: '15/04/2025', location: 'Ribeirão Preto, SP', type: 'Workshop' },
    { id: 3, title: 'Congresso de Inovação no Agro', date: '10/05/2025', location: 'Campinas, SP', type: 'Congresso' }
  ];

  const news = [
    { id: 1, title: 'Novas tecnologias de plantio aumentam produtividade em 30%', source: 'Portal Agro', time: '1h atrás' },
    { id: 2, title: 'Exportações de soja batem recorde no primeiro trimestre', source: 'Agro News', time: '3h atrás' },
    { id: 3, title: 'Clima favorável deve impulsionar safra de milho', source: 'Info Rural', time: '5h atrás' }
  ];

  const connections = [
    { id: 1, name: 'Ana Silva', role: 'Produtora Rural - Soja', location: 'Mato Grosso' },
    { id: 2, name: 'Carlos Mendes', role: 'Consultor em Irrigação', location: 'Goiás' },
    { id: 3, name: 'Empresa Agro Tech', role: 'Tecnologia Agrícola', location: 'São Paulo' }
  ];

  const marketData = [
    { product: 'Soja', price: 'R$ 150,25/saca', variation: '+1,2%' },
    { product: 'Milho', price: 'R$ 75,40/saca', variation: '-0,5%' },
    { product: 'Café', price: 'R$ 1.250,00/saca', variation: '+2,1%' }
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
      const userData = { email: loginForm.email, name: 'Usuário AgriNet' };
      localStorage.setItem('agrinetUser', JSON.stringify(userData));
      setIsAuthenticated(true);
      setShowLogin(false);
    } else {
      setLoginError('Preencha todos os campos para fazer login.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('As senhas não coincidem.');
      return;
    }
    const userData = { email: registerForm.email, name: registerForm.name };
    localStorage.setItem('agrinetUser', JSON.stringify(userData));
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

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <h1 className="text-3xl font-bold text-green-800">AgriNetApp online e funcionando 🚀</h1>
    </div>
  );
};

export default AgriNetApp;
