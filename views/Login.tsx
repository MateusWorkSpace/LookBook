import React, { useState } from 'react';
import { API_BASE_URL } from '../App';
import { Logo } from '../components/icons';

interface LoginProps {
  setToken: (token: string) => void;
  navigate: (view: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha no login');
      }
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg-gray">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
            <Logo />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Acesse sua conta</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green"
              required
            />
          </div>
          <button type="submit" className="w-full bg-brand-teal-green text-white py-2 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors">
            Entrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Não tem uma conta?{' '}
          <button onClick={() => navigate('register')} className="font-semibold text-brand-teal-green hover:underline">
            Cadastre-se
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;