import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../shared/loader/page-loader';
import { usePreventZoom } from '../shared/hooks/use-prevent-zoom';

export default function Layout() {
	usePreventZoom();
	return (
		<main className='w-screen h-screen bg-[#212121] overflow-hidden relative touch-none'>
			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>
		</main>
	);
}
