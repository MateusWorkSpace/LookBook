import React, { useState } from 'react';
import { API_BASE_URL } from '../App';
import { Logo } from '../components/icons';

interface RegisterProps {
  navigate: (view: string) => void;
}

const Register: React.FC<RegisterProps> = ({ navigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsappNumber: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Falha no cadastro');
      }
      setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      setTimeout(() => navigate('login'), 2000);
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
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crie sua conta</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
        {success && <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" type="text" placeholder="Nome Completo" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green" />
          <input name="whatsappNumber" type="text" placeholder="Número do WhatsApp (Ex: 974...)" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green" />
          <input name="password" type="password" placeholder="Senha" onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green" />
          <button type="submit" className="w-full bg-brand-teal-green text-white py-2 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors">
            Cadastrar
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem uma conta?{' '}
          <button onClick={() => navigate('login')} className="font-semibold text-brand-teal-green hover:underline">
            Acesse aqui
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;