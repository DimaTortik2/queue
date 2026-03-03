import './page-loader.css';

export function PageLoader() {
	return (
		<div className='full-page-wrapper perspective-container'>
			<div className='loader-container'>
				<svg viewBox='0 0 200 200' stroke='currentColor'>
					<circle
						cx='100'
						cy='100'
						r='80'
						fill='none'
						stroke-width='4'
						className='circle-loader'
					/>
				</svg>
				<p className='loader-label'>Грузимся...</p>
			</div>
		</div>
	);
}
