import React, { useState, useEffect, useCallback } from 'react';
import type { ShopperProfile, Lookbook } from './types';
import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import CreateLookbook from './views/CreateLookbook';
import LookbookClientView from './views/LookbookClientView';
import Login from './views/Login';
import Register from './views/Register';
import { Logo, DashboardIcon, SettingsIcon, LogoutIcon } from './components/icons';

export const API_BASE_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [profile, setProfile] = useState<ShopperProfile | null>(null);
  const [lookbooks, setLookbooks] = useState<Lookbook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [activeLookbookId, setActiveLookbookId] = useState<string | null>(null);

  const getAuthHeader = useCallback(() => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);

  const logout = () => {
    setToken(null);
    setProfile(null);
    setLookbooks([]);
    localStorage.removeItem('token');
    window.location.hash = 'login';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const [profileRes, lookbooksRes] = await Promise.all([
          fetch(`${API_BASE_URL}/profile`, { headers: getAuthHeader() }),
          fetch(`${API_BASE_URL}/lookbooks`, { headers: getAuthHeader() }),
        ]);

        if (profileRes.status === 401 || profileRes.status === 403) {
            logout();
            return;
        }

        const profileData = await profileRes.json();
        const lookbooksData = await lookbooksRes.json();
        setProfile(profileData);
        setLookbooks(lookbooksData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, getAuthHeader]);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.startsWith('lookbook/')) {
      const id = hash.split('/')[1];
      setActiveLookbookId(id);
      setCurrentView('client-view');
    } else if (['login', 'register'].includes(hash) && token) {
        window.location.hash = 'dashboard';
    } else {
      setActiveLookbookId(null);
      setCurrentView(hash || (token ? 'dashboard' : 'login'));
    }
  }, [token]);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [handleHashChange]);

  const navigate = (view: string) => {
    window.location.hash = view;
  };

  const updateProfile = async (newProfile: ShopperProfile) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
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
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify(lookbook),
      });
      const newLookbook = await response.json();
      setLookbooks(prevLookbooks => [newLookbook, ...prevLookbooks]);
    } catch (error) {
      console.error('Failed to create lookbook:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }
  
  if (currentView === 'client-view' && activeLookbookId) {
      return <LookbookClientView lookbookId={activeLookbookId} />;
  }

  if (!token) {
    if (currentView === 'register') {
        return <Register navigate={navigate} />
    }
    return <Login setToken={setToken} navigate={navigate} />
  }

  if (!profile) {
      return <div className="flex items-center justify-center min-h-screen">Carregando perfil...</div>;
  }

  const isSettingsIncomplete = !profile.name || !profile.whatsappNumber;

  return (
    <div className="min-h-screen flex">
      <nav className="w-64 bg-brand-dark-green text-white flex flex-col p-4 justify-between">
        <div>
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
        </div>
        <div>
           <button onClick={logout} className={`flex items-center w-full text-left p-3 rounded-lg transition-colors hover:bg-brand-teal-green/50`}>
              <LogoutIcon className="mr-3" />
              Sair
            </button>
        </div>
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

export default App;