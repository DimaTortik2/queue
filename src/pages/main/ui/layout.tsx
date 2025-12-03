export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className='w-screen h-screen bg-[#212121] overflow-hidden relative touch-none'>
			{children}
		</main>
	);
}
