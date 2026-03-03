import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../shared/loader/page-loader';
import { usePreventZoom } from '../shared/hooks/use-prevent-zoom';
import { useSetColors } from '../app/hooks/useSetColors';

export default function Layout() {
	usePreventZoom();
	useSetColors();

	return (
		<main className='w-screen h-screen bg-bg overflow-hidden relative touch-none'>
			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>
		</main>
	);
}
