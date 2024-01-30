import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import AdoptedPetContext from './AdoptedPetContext';
import DetailsErrorBoundary from './Details';
import SearchParams from './SearchParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div className="m-0 p-0" style={{ background: 'url(https://pets-images.dev-apis.com/pets/wallpaperB.jpg)' }}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500">
              <Link to={'/'} className="text-6xl text-white hover:text-gray-200">Adopt Me!</Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<DetailsErrorBoundary/>}/>
              <Route path="/" element={<SearchParams/>}/>
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App/>);
