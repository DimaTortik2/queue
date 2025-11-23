import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MainPage } from './pages/main/ui/main-page';
import { ROUTES } from './app/routes/routes';
import { TestPage } from './pages/main/test';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.mainPage} element={<MainPage />} />
				<Route path={'/test'} element={<TestPage />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
