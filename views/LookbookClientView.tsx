import React, { useState, useEffect } from 'react';
import type { Lookbook, ShopperProfile } from '../types';
import { WhatsAppIcon } from '../components/icons';

const API_BASE_URL = 'http://localhost:3001/api';

interface LookbookClientViewProps {
  lookbookId: string;
}

const ItemCard: React.FC<{
    imageUrl: string;
    name: string;
    price?: string;
    whatsappLink: string;
}> = ({ imageUrl, name, price, whatsappLink }) => {
    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
                <img src={imageUrl} alt={name} className="w-full h-80 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 flex items-center bg-brand-light-green text-white font-bold py-3 px-5 rounded-full">
                        <WhatsAppIcon className="w-6 h-6 mr-2" />
                        Tenho interesse
                    </div>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{name || "Item sem nome"}</h3>
                {price && <p className="text-md text-gray-600 mt-1">{price}</p>}
            </div>
        </a>
    );
}

const LookbookClientView: React.FC<LookbookClientViewProps> = ({ lookbookId }) => {
  const [lookbook, setLookbook] = useState<Lookbook | null>(null);
  const [shopperProfile, setShopperProfile] = useState<ShopperProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLookbookData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/lookbook-details/${lookbookId}`);
        if (!response.ok) {
          throw new Error('Lookbook not found');
        }
        const { lookbook, shopperProfile } = await response.json();
        setLookbook(lookbook);
        setShopperProfile(shopperProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (lookbookId) {
      fetchLookbookData();
    }
  }, [lookbookId]);


  const generateWhatsAppLink = (itemName: string) => {
    if (!shopperProfile || !lookbook) return '#';
    const message = `Olá, tenho interesse neste item: ${itemName} da coleção '${lookbook.title}'.`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${shopperProfile.whatsappNumber}?text=${encodedMessage}`;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen"><p>Carregando Lookbook...</p></div>;
  }

  if (error || !lookbook || !shopperProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mt-2">Lookbook não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">
      <header className="bg-white shadow-md p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-dark-green tracking-tight">{lookbook.title}</h1>
          {lookbook.description && <p className="text-lg text-gray-600 mt-2">{lookbook.description}</p>}
          <p className="text-sm text-gray-500 mt-4">Apresentado por: <span className="font-semibold">{shopperProfile.name || 'Seu Personal Shopper'}</span></p>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        {lookbook.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookbook.items.map(item => (
              <ItemCard 
                key={item.id} 
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                whatsappLink={generateWhatsAppLink(item.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Este lookbook ainda não possui itens.</p>
          </div>
        )}
      </main>
      <footer className="text-center p-6 text-gray-400 text-sm">
        <p>Powered by LuxeLink</p>
      </footer>
    </div>
  );
};

export default LookbookClientView;
