export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className='w-screen h-screen bg-[#1a1a1a] overflow-hidden relative touch-none'>
			{children}
		</main>
	);
}
