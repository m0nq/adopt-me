import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { lazy } from 'react';
import { useState } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import AdoptedPetContext from './AdoptedPetContext';

const DetailsErrorBoundary = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

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
    <div>
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={
              <div className="loading-pane">
                <h2 className="loader">🐶</h2>
              </div>
            }>
              <header>
                <Link to="/">Adopt Me!</Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<DetailsErrorBoundary/>}/>
                <Route path="/" element={<SearchParams/>}/>
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App/>);
