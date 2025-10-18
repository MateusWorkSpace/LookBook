import React, { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import type { Lookbook, ShopperProfile } from './types';

import Dashboard from './views/Dashboard';
import Settings from './views/Settings';
import CreateLookbook from './views/CreateLookbook';
import EditLookbook from './views/EditLookbook';
import LookbookClientView from './views/LookbookClientView';
import Login from './views/Login';
import Register from './views/Register';
import Landing from './views/Landing';

export const API_BASE_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  const [view, setView] = useState('landing'); // e.g., 'dashboard', 'settings', 'create', 'edit/:id', 'view/:id'
  const [currentLookbookId, setCurrentLookbookId] = useState<string | null>(null);
  const [token, setToken] = useLocalStorage<string | null>('token', null);
  const [profile, setProfile] = useState<ShopperProfile | null>(null);

  const navigate = (newView: string, id: string | null = null) => {
    setCurrentLookbookId(id);
    setView(newView);
  };

  const handleLogout = useCallback(() => {
    setToken(null);
    setProfile(null);
    navigate('login');
  }, [setToken]);
  
  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.status === 401) {
        handleLogout();
        return;
      }
      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      handleLogout();
    }
  }, [token, handleLogout]);

  const updateProfile = async (newProfile: ShopperProfile) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newProfile),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addLookbook = async (lookbook: Omit<Lookbook, 'id' | 'createdAt' | 'shareableLink'>) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/lookbooks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(lookbook),
      });
      if (!response.ok) {
        throw new Error('Failed to create lookbook');
      }
      // No need to do anything with the response, dashboard will refetch.
    } catch (error) {
      console.error(error);
      alert('Error creating lookbook');
    }
  }

  useEffect(() => {
    const path = window.location.pathname;
    if (path.startsWith('/lookbook/')) {
        const id = path.split('/')[2];
        navigate('view', id);
    } else if (token) {
        if (!profile) fetchProfile();
        if (['landing', 'login', 'register'].includes(view)) {
          navigate('dashboard');
        }
    } else {
        const publicViews = ['landing', 'login', 'register'];
        if (!publicViews.includes(view) && !view.startsWith('view')) {
            navigate('landing');
        }
    }
  }, [token, profile, view, fetchProfile]);

  if (view.startsWith('view')) {
    return <LookbookClientView lookbookId={currentLookbookId} />;
  }

  if (!token) {
    switch (view) {
        case 'landing':
            return <Landing navigate={navigate} />;
        case 'register':
            return <Register navigate={navigate} />;
        case 'login':
            return <Login setToken={setToken} navigate={navigate} />;
        default:
            return <Landing navigate={navigate} />;
    }
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }
  
  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard navigate={navigate} token={token} />;
      case 'settings':
        return <Settings profile={profile} setProfile={updateProfile} />;
      case 'create':
        return <CreateLookbook navigate={navigate} addLookbook={addLookbook} />;
      case 'edit':
        return <EditLookbook lookbookId={currentLookbookId} navigate={navigate} token={token} />;
      default:
        return <Dashboard navigate={navigate} token={token} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-gray text-gray-800 font-sans">
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <h1 className="text-xl font-bold text-brand-teal-green">Lookbook Creator</h1>
                <div>
                    <button onClick={() => navigate('dashboard')} className="px-4 py-2 text-gray-600 hover:text-brand-teal-green rounded-md font-medium">Dashboard</button>
                    <button onClick={() => navigate('settings')} className="px-4 py-2 text-gray-600 hover:text-brand-teal-green rounded-md font-medium">Configurações</button>
                    <button onClick={handleLogout} className="px-4 py-2 text-gray-600 hover:text-brand-teal-green rounded-md font-medium">Sair</button>
                </div>
            </nav>
        </header>
        <main className="container mx-auto px-6 py-8">
            {renderView()}
        </main>
    </div>
  );
};

export default App;