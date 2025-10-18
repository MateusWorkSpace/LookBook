import React, { useState, useEffect } from 'react';
import type { Lookbook } from '../types';
import { API_BASE_URL } from '../App';
import { ShareIcon, EditIcon, DeleteIcon } from '../components/icons';

interface DashboardProps {
  navigate: (view: string, id?: string) => void;
  token: string;
}

const Dashboard: React.FC<DashboardProps> = ({ navigate, token }) => {
  const [lookbooks, setLookbooks] = useState<Lookbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showShareModal, setShowShareModal] = useState<Lookbook | null>(null);

  useEffect(() => {
    const fetchLookbooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/lookbooks`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          throw new Error('Falha ao buscar lookbooks');
        }
        const data = await response.json();
        setLookbooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro');
      } finally {
        setLoading(false);
      }
    };

    fetchLookbooks();
  }, [token]);
  
  const deleteLookbook = async (id: string) => {
    if (window.confirm('Tem certeza que deseja deletar este lookbook?')) {
        try {
            const response = await fetch(`${API_BASE_URL}/lookbooks/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) {
                throw new Error('Falha ao deletar lookbook');
            }
            setLookbooks(prev => prev.filter(lb => lb.id !== id));
        } catch (err) {
            alert(err instanceof Error ? err.message : 'Ocorreu um erro');
        }
    }
  }

  const handleShare = (lookbook: Lookbook) => {
    const shareableLink = `${window.location.origin}/lookbook/${lookbook.id}`;
    setShowShareModal({ ...lookbook, shareableLink });
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link copiado para a área de transferência!');
    }, (err) => {
        console.error('Could not copy text: ', err);
        alert('Não foi possível copiar o link.');
    });
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Seus Lookbooks</h1>
        <button
          onClick={() => navigate('create')}
          className="bg-brand-teal-green text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors"
        >
          Criar Novo Lookbook
        </button>
      </div>

      {lookbooks.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">Você ainda não criou nenhum lookbook.</p>
          <p className="text-gray-500 mt-2">Clique em "Criar Novo Lookbook" para começar.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lookbooks.map(lookbook => (
            <div key={lookbook.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
                <img src={lookbook.items[0]?.imageUrl || 'https://via.placeholder.com/400x300'} alt={lookbook.title} className="w-full h-48 object-cover"/>
                <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 truncate">{lookbook.title}</h2>
                    <p className="text-sm text-gray-500 mb-4 flex-grow">{lookbook.description || 'Sem descrição'}</p>
                    <div className="flex justify-end items-center space-x-2 mt-auto pt-2 border-t border-gray-100">
                        <button onClick={() => handleShare(lookbook)} title="Compartilhar" className="p-2 text-gray-500 hover:text-brand-teal-green hover:bg-gray-100 rounded-full"><ShareIcon /></button>
                        <button onClick={() => navigate('edit', lookbook.id)} title="Editar" className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full"><EditIcon /></button>
                        <button onClick={() => deleteLookbook(lookbook.id)} title="Deletar" className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full"><DeleteIcon /></button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}
      
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowShareModal(null)}>
            <div className="bg-white p-6 rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-bold mb-4">Compartilhar Lookbook</h3>
                <p className="mb-2">Copie e compartilhe este link:</p>
                <input
                    type="text"
                    readOnly
                    value={showShareModal.shareableLink}
                    className="w-full bg-gray-100 p-2 border rounded-md"
                    onFocus={(e) => e.target.select()}
                />
                <div className="mt-4 flex justify-end space-x-2">
                    <button onClick={() => setShowShareModal(null)} className="px-4 py-2 bg-gray-200 rounded-md">Fechar</button>
                    <button onClick={() => copyToClipboard(showShareModal.shareableLink!)} className="px-4 py-2 bg-brand-teal-green text-white rounded-md">Copiar</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
