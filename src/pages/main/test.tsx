import './test.css';

export function TestPage() {
	return (
		<div className='w-screen h-screen bg-[#212121] flex justify-center items-center perspective-container'>
			<div className='flex flex-col justify-center items-center'>
				<svg
					viewBox='0 0 200 200'
					className='w-[calc((1vh+1vw)*15)] h-[calc((1vh+1vw)*15)] text-blue-400'
					stroke='currentColor'
				>
					<circle
						cx='100'
						cy='100'
						r='80'
						fill='none'
						strokeWidth='4'
						className='circle-loader'
					/>
				</svg>
				<p className='text-center text-[#ffffff25] font-semibold text-xl'>
					Всё настраиваем...
				</p>
			</div>
		</div>
	);
}

// import React from 'react';
// import './test.css';

// export const TestPage: React.FC = () => {
// 	return (
// 		<div className='gooey-container'>
// 			<svg
// 				viewBox='0 0 200 200'
// 				className='w-64 h-64'
// 				// color-matrix фильтр работает с прозрачностью, поэтому цвет задаем заливкой
// 			>
// 				<defs>
// 					{/* Магия здесь */}
// 					<filter id='goo'>
// 						{/* 1. Размываем всё в кашу */}
// 						<feGaussianBlur
// 							in='SourceGraphic'
// 							stdDeviation='10'
// 							result='blur'
// 						/>

// 						{/* 2. Жестко повышаем контраст альфа-канала */}
// 						{/* Это превращает размытые края в четкие границы */}
// 						<feColorMatrix
// 							in='blur'
// 							mode='matrix'
// 							values='1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 18 -7'
// 							result='goo'
// 						/>
// 						{/* values="... 18 -7" — это формула: alpha * 18 - 7.
//                 Всё, что было полупрозрачным, становится либо видимым, либо исчезает. */}
// 					</filter>
// 				</defs>

// 				{/* Группа с фильтром. Всё внутри будет "слипаться" */}
// 				<g filter='url(#goo)' fill='white'>
// 					{/* Центральный шар (Мамка) */}
// 					<circle cx='100' cy='100' r='30' />

// 					{/* Шарик 1 (вылетает вверх-влево) */}
// 					<circle cx='100' cy='100' r='25' className='blob-1' />

// 					{/* Шарик 2 (вылетает вниз-вправо) */}
// 					<circle cx='100' cy='100' r='25' className='blob-2' />

// 					{/* Шарик 3 (вылетает просто вбок) */}
// 					<circle cx='100' cy='100' r='20' className='blob-3' />
// 				</g>
// 			</svg>
// 		</div>
// 	);
// };
