import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from './pages/main/main-page';
import { ROUTES } from './app/routes/routes';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.mainPage} element={<MainPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
