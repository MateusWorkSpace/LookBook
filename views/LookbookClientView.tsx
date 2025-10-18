import React, { useState, useEffect } from 'react';
import type { Lookbook, ShopperProfile, LookbookItem } from '../types';
import { API_BASE_URL } from '../App';
import { Logo } from '../components/icons';
// FIX: Import GoogleGenAI from @google/genai
import { GoogleGenAI } from '@google/genai';

interface LookbookClientViewProps {
  lookbookId: string | null;
}

const LookbookClientView: React.FC<LookbookClientViewProps> = ({ lookbookId }) => {
  const [lookbook, setLookbook] = useState<Lookbook | null>(null);
  const [profile, setProfile] = useState<ShopperProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');

  useEffect(() => {
    const fetchLookbook = async () => {
      if (!lookbookId) {
        setError("ID do Lookbook não fornecido.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/lookbooks/public/${lookbookId}`);
        if (!response.ok) {
          throw new Error('Lookbook não encontrado ou falha ao carregar.');
        }
        const data = await response.json();
        setLookbook(data.lookbook);
        setProfile(data.profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro');
      } finally {
        setLoading(false);
      }
    };

    fetchLookbook();
  }, [lookbookId]);

  const handleItemSelection = (item: LookbookItem) => {
    setSelectedItem(prev => (prev?.id === item.id ? null : item));
    setGeneratedMessage('');
  };

  const generateMessage = async () => {
    if (!selectedItem || !profile || !lookbook) return;

    setIsGenerating(true);
    setGeneratedMessage('');

    try {
        // FIX: Update to use the recommended API initialization and method call
        const ai = new GoogleGenAI({apiKey: process.env.API_KEY!});
        
        const prompt = `Gere uma mensagem curta e amigável em Português para um cliente interessado no item "${selectedItem.name}" do lookbook "${lookbook.title}" da loja de ${profile.name}. O preço é ${selectedItem.price || 'a consultar'}. A mensagem deve ser para iniciar uma conversa no WhatsApp para finalizar a compra.`;
        
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text;
        
        const whatsappLink = `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(text + `\n\nEstou interessado(a) neste item: ${selectedItem.imageUrl}`)}`;
        setGeneratedMessage(whatsappLink);

    } catch (err) {
        console.error("Error generating message:", err);
        alert("Falha ao gerar a mensagem. Tente novamente.");
    } finally {
        setIsGenerating(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando Lookbook...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  if (!lookbook || !profile) return <div className="min-h-screen flex items-center justify-center">Lookbook não encontrado.</div>;

  return (
    <div className="min-h-screen bg-brand-bg-gray font-sans">
      <header className="bg-white p-4 shadow-md text-center">
        <div className="flex items-center justify-center space-x-3">
          <Logo />
          <h1 className="text-2xl font-bold text-gray-800">{lookbook.title}</h1>
        </div>
        <p className="text-gray-600 mt-1">por {profile.name}</p>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        {lookbook.description && <p className="text-center text-lg text-gray-700 mb-8">{lookbook.description}</p>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lookbook.items.map(item => (
            <div key={item.id} className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-300 ${selectedItem?.id === item.id ? 'ring-4 ring-brand-teal-green' : ''}`} onClick={() => handleItemSelection(item)}>
              <img src={item.imageUrl} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{item.name}</h3>
                {item.price && <p className="text-gray-600">{item.price}</p>}
              </div>
            </div>
          ))}
        </div>
        
        {selectedItem && (
          <div className="mt-10 p-6 bg-white rounded-xl shadow-lg text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Tenho interesse!</h2>
            <p className="mb-4 text-gray-700">Gostou do item "{selectedItem.name}"? Clique no botão abaixo para gerar uma mensagem e iniciar uma conversa no WhatsApp para finalizar sua compra.</p>
            <button onClick={generateMessage} disabled={isGenerating} className="bg-brand-teal-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors disabled:bg-gray-400">
              {isGenerating ? 'Gerando mensagem...' : 'Falar com Vendedor(a)'}
            </button>
            {generatedMessage && (
              <div className="mt-4 text-left p-4 bg-gray-100 rounded-md">
                <p className="mb-2">Mensagem gerada! Clique no link para abrir no WhatsApp:</p>
                <a href={generatedMessage} target="_blank" rel="noopener noreferrer" className="text-brand-teal-green font-bold break-all hover:underline">{generatedMessage}</a>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>Powered by Lookbook Creator</p>
      </footer>
    </div>
  );
};

export default LookbookClientView;
