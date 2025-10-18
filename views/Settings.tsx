import React, { useState, useEffect } from 'react';
import type { ShopperProfile } from '../types';

interface SettingsProps {
  profile: ShopperProfile;
  setProfile: (profile: ShopperProfile) => Promise<void>;
}

const Settings: React.FC<SettingsProps> = ({ profile, setProfile }) => {
  const [formData, setFormData] = useState<ShopperProfile>(profile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await setProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configurações</h1>
      <div className="max-w-lg bg-white p-8 rounded-xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Seu Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: Maria Santos"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="whatsappNumber" className="block text-gray-700 font-semibold mb-2">Número do WhatsApp</label>
            <input
              type="text"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              placeholder="Ex: 974XXXXXXXX (incluindo código do país)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Use o formato internacional sem '+' ou '00'. Exemplo para o Catar: 97433123456</p>
          </div>
          <button type="submit" className="w-full bg-brand-teal-green text-white py-2 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors">
            Salvar Alterações
          </button>
        </form>
        {isSaved && <p className="text-center mt-4 text-green-600">Configurações salvas com sucesso!</p>}
      </div>
    </div>
  );
};

export default Settings;
