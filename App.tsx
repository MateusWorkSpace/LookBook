import React, { useState, useEffect, useCallback } from 'react';
import type { ShopperProfile, Lookbook } from './types';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import CreateLookbook from './views/CreateLookbook';
import LookbookClientView from './views/LookbookClientView';
import { Logo, DashboardIcon, SettingsIcon } from './components/icons';

const API_BASE_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  const [profile, setProfile] = useState<ShopperProfile>({ name: '', whatsappNumber: '' });
  const [lookbooks, setLookbooks] = useState<Lookbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeLookbookId, setActiveLookbookId] = useState<string | null>(null);

  // Fetch initial data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileRes, lookbooksRes] = await Promise.all([
          fetch(`${API_BASE_URL}/profile`),
          fetch(`${API_BASE_URL}/lookbooks`),
        ]);
        const profileData = await profileRes.json();
        const lookbooksData = await lookbooksRes.json();
        setProfile(profileData);
        setLookbooks(lookbooksData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('lookbook/')) {
      const id = hash.split('/')[1];
      setActiveLookbookId(id);
      setCurrentView('client-view');
    } else {
      setActiveLookbookId(null);
      setCurrentView(hash || 'dashboard');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [handleHashChange]);

  const navigate = (view: string) => {
    window.location.hash = view;
  };

  const updateProfile = async (newProfile: ShopperProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfile),
      });
      const updatedProfile = await response.json();
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const addLookbook = async (lookbook: Omit<Lookbook, 'id' | 'createdAt'>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/lookbooks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lookbook),
      });
      const newLookbook = await response.json();
      setLookbooks(prevLookbooks => [newLookbook, ...prevLookbooks]);
    } catch (error) {
      console.error('Failed to create lookbook:', error);
    }
  };

  const renderShopperView = () => {
    const isSettingsIncomplete = !profile.name || !profile.whatsappNumber;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Carregando...</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex">
        <nav className="w-64 bg-brand-dark-green text-white flex flex-col p-4">
          <div className="mb-10">
            <Logo />
          </div>
          <ul>
            <li>
              <button onClick={() => navigate('dashboard')} className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${currentView === 'dashboard' ? 'bg-brand-teal-green' : 'hover:bg-brand-teal-green/50'}`}>
                <DashboardIcon className="mr-3" />
                Dashboard
              </button>
            </li>
            <li className="mt-2">
              <button onClick={() => navigate('settings')} className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${currentView === 'settings' ? 'bg-brand-teal-green' : 'hover:bg-brand-teal-green/50'}`}>
                <SettingsIcon className="mr-3" />
                Configurações
              </button>
            </li>
          </ul>
        </nav>
        <main className="flex-1 p-8 overflow-y-auto">
          {isSettingsIncomplete && currentView !== 'settings' && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p className="font-bold">Perfil Incompleto</p>
              <p>Por favor, complete seu nome e número do WhatsApp na página de <button onClick={() => navigate('settings')} className="font-bold underline">Configurações</button> para poder compartilhar seus lookbooks.</p>
            </div>
          )}
          {currentView === 'dashboard' && <Dashboard lookbooks={lookbooks} navigate={navigate} profile={profile} />}
          {currentView === 'settings' && <Settings profile={profile} setProfile={updateProfile} />}
          {currentView === 'create' && <CreateLookbook addLookbook={addLookbook} navigate={navigate} />}
        </main>
      </div>
    );
  };
  
  const renderClientView = () => {
    if (activeLookbookId) {
      return <LookbookClientView lookbookId={activeLookbookId} />;
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mt-2">Lookbook não encontrado.</p>
        </div>
      </div>
    );
  };

  return currentView === 'client-view' ? renderClientView() : renderShopperView();
};

export default App;
