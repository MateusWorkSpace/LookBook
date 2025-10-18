import React, { useState, useEffect } from 'react';
import type { Lookbook, LookbookItem } from '../types';
import { API_BASE_URL } from '../App';
import { BackIcon } from '../components/icons';

interface EditLookbookProps {
  lookbookId: string | null;
  navigate: (view: string) => void;
  token: string;
}

const EditLookbook: React.FC<EditLookbookProps> = ({ lookbookId, navigate, token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<LookbookItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchLookbook = async () => {
      if (!lookbookId) {
        navigate('dashboard');
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/lookbooks/${lookbookId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch lookbook data');
        const data: Lookbook = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setItems(data.items);
      } catch (error) {
        console.error(error);
        alert('Could not load lookbook for editing.');
        navigate('dashboard');
      } finally {
        setIsFetching(false);
      }
    };
    fetchLookbook();
  }, [lookbookId, navigate, token]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIsLoading(true);
      const files = Array.from(e.target.files);
      const newItemsPromises = files.map(file => {
        return new Promise<LookbookItem>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: `new_${Date.now()}_${Math.random()}`, // temp id for new items
              imageUrl: event.target?.result as string,
              name: '',
              price: '',
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });
      try {
        const newItems = await Promise.all(newItemsPromises);
        setItems(prev => [...prev, ...newItems]);
      } catch (error) {
        console.error("Error reading files:", error);
        alert("Houve um erro ao carregar as imagens.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const updateItem = (index: number, field: 'name' | 'price', value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };
  
  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || items.length === 0) {
        alert("Por favor, adicione um título e pelo menos uma imagem.");
        return;
    }
    
    const lookbookData = {
        title,
        description,
        items: items.map(({ id, ...rest }) => ({
            ...rest,
            // if id is not from the db, it's a new item without id
            ...(id.startsWith('new_') ? {} : { id }),
        }))
    };

    try {
        const response = await fetch(`${API_BASE_URL}/lookbooks/${lookbookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(lookbookData)
        });

        if (!response.ok) {
            throw new Error('Failed to update lookbook');
        }

        navigate('dashboard');
    } catch (error) {
        console.error(error);
        alert('Error updating lookbook');
    }
  };

  if (isFetching) {
    return <div>Carregando editor...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('dashboard')} className="p-2 rounded-full hover:bg-gray-200 mr-4">
          <BackIcon />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Editar Lookbook</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Detalhes do Lookbook</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Título</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Nova Coleção Dior" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green" required />
            </div>
            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descrição (Opcional)</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Ex: Peças exclusivas para a primavera" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal-green"></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Itens do Lookbook</h2>
            <div>
              <label htmlFor="image-upload" className="w-full cursor-pointer bg-brand-light-gray border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 text-center hover:bg-gray-100 transition-colors">
                <span className="text-brand-teal-green font-semibold">Clique para adicionar mais imagens</span>
                <span className="text-sm text-gray-500 mt-1">PNG, JPG, GIF até 10MB</span>
                <input id="image-upload" type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {isLoading && <p className="text-center mt-4">Carregando imagens...</p>}
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3 relative">
                        <button type="button" onClick={() => removeItem(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">&times;</button>
                        <img src={item.imageUrl} alt="preview" className="w-full h-40 object-cover rounded-md"/>
                        <input type="text" placeholder="Nome do item" value={item.name} onChange={(e) => updateItem(index, 'name', e.target.value)} className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md" required/>
                        <input type="text" placeholder="Preço (opcional)" value={item.price} onChange={(e) => updateItem(index, 'price', e.target.value)} className="w-full text-sm px-2 py-1 border border-gray-300 rounded-md" />
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="bg-brand-teal-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-dark-green transition-colors disabled:bg-gray-400" disabled={isLoading || isFetching}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLookbook;
