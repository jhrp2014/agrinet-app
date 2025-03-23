
import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const RegisterForm = ({ onRegisterSuccess, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Produtor Rural',
    location: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const userData = { name, email };
    localStorage.setItem('agrinetUser', JSON.stringify(userData));
    onRegisterSuccess();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Criar Conta</h2>
      <p className="text-gray-600 text-center mb-8">Junte-se ao agro digital</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Nome completo</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 p-2.5 w-full border rounded-lg bg-gray-50"
              placeholder="Seu nome completo"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">E-mail</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 p-2.5 w-full border rounded-lg bg-gray-50"
              placeholder="seu@email.com"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="p-2.5 w-full border rounded-lg bg-gray-50"
            placeholder="********"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Confirmar Senha</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-2.5 w-full border rounded-lg bg-gray-50"
            placeholder="********"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-gray-700 mb-1">Área de atuação</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="p-2.5 w-full border rounded-lg bg-gray-50"
          >
            <option value="Produtor Rural">Produtor Rural</option>
            <option value="Consultor">Consultor</option>
            <option value="Fornecedor">Fornecedor</option>
            <option value="Pesquisador">Pesquisador</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-1">Estado</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="p-2.5 w-full border rounded-lg bg-gray-50"
          >
            <option value="">Selecione um estado</option>
            <option value="SP">São Paulo</option>
            <option value="MT">Mato Grosso</option>
            <option value="GO">Goiás</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="BA">Bahia</option>
            <option value="MG">Minas Gerais</option>
            <option value="PR">Paraná</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center"
        >
          Criar Conta <ArrowRight size={16} className="ml-2" />
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Já tem uma conta?{' '}
          <button onClick={switchToLogin} className="text-green-600 hover:text-green-800 font-medium">
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
