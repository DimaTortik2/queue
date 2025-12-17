import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { PageLoader } from '../shared/loader/page-loader';

export default function Layout() {
	return (
		<main className='w-screen h-screen bg-[#212121] overflow-hidden relative touch-none'>
			<Suspense fallback={<PageLoader />}>
				<Outlet />
			</Suspense>
		</main>
	);
}
