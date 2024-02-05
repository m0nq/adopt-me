import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import { lazy } from 'react';
import { useState } from 'react';
import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';

import AdoptedPetContext from './AdoptedPetContext';
import { Pet } from './APIResponse.type';
import { createRoot } from 'react-dom/client';

const DetailsErrorBoundary = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * (60 * 1000), // 5mins
			gcTime: 10 * (60 * 1000) // 10mins
		}
	}
});

const App = (): ReactElement => {
	const adoptedPet = useState({} as Pet);

	return (
		<div>
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
		</div>
	);
};

export default App;

const container = document.querySelector('#root');
if (!container) throw new Error('No container to render to');
const root = createRoot(container);
root.render(<App/>);
