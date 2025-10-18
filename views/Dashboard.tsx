
import React, { useState } from 'react';
import type { Lookbook, ShopperProfile } from '../types';
import { PlusIcon, LinkIcon } from '../components/icons';

interface DashboardProps {
  lookbooks: Lookbook[];
  navigate: (view: string) => void;
  profile: ShopperProfile;
}

const LookbookCard: React.FC<{ lookbook: Lookbook, onShare: () => void, isSharingDisabled: boolean }> = ({ lookbook, onShare, isSharingDisabled }) => {
  const itemCount = lookbook.items.length;
  const coverImage = lookbook.items[0]?.imageUrl || 'https://picsum.photos/400/300';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={coverImage} alt={lookbook.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{lookbook.title}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{lookbook.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</span>
          <button
            onClick={onShare}
            disabled={isSharingDisabled}
            className="flex items-center bg-brand-teal-green text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-brand-dark-green transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <LinkIcon className="mr-2" />
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ lookbooks, navigate, profile }) => {
    const [copiedLink, setCopiedLink] = useState('');
    
    const handleShare = (lookbookId: string) => {
        const url = `${window.location.origin}${window.location.pathname}#lookbook/${lookbookId}`;
        navigator.clipboard.writeText(url).then(() => {
            setCopiedLink(lookbookId);
            setTimeout(() => setCopiedLink(''), 2000); // Reset after 2 seconds
        });
    };

    const isSharingDisabled = !profile.name || !profile.whatsappNumber;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Seus Lookbooks</h1>
        <button onClick={() => navigate('create')} className="flex items-center bg-brand-teal-green text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors">
          <PlusIcon className="mr-2" />
          Criar Novo Lookbook
        </button>
      </div>

      {copiedLink && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p>Link copiado para a área de transferência!</p>
        </div>
      )}

      {lookbooks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">Você ainda não criou nenhum lookbook.</p>
            <p className="text-gray-500 mt-2">Clique em "Criar Novo Lookbook" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {lookbooks.map(lb => (
            <LookbookCard 
                key={lb.id} 
                lookbook={lb} 
                onShare={() => handleShare(lb.id)}
                isSharingDisabled={isSharingDisabled}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
