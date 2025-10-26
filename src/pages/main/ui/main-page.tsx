import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Layout } from './layout';
import { useBuisness } from '../hooks/use-buisness';
import { useUserClick } from '../hooks/use-user-click';
import { Avatar } from './avatar';

export function MainPage() {
	const { canvaHeight, canvaWidth, userData, lineData } = useBuisness();
	const { canvasRef, handleUserClick } = useUserClick(userData);

	return (
		<Layout>
			<TransformWrapper
				ref={canvasRef}
				limitToBounds={false}
				minScale={0.015}
				maxScale={2}
				initialPositionX={0}
				initialPositionY={0}
				initialScale={1}
				doubleClick={{ disabled: true }}
				wheel={{ step: 1 }}
				panning={{ excluded: ['excluded-item'] }}
			>
				<TransformComponent
					contentStyle={{ height: canvaHeight, width: canvaWidth }}
					contentClass='bg-[#ffffff] relative'
				>
					<svg
						viewBox={`0 0 ${canvaWidth} ${canvaHeight}`}
						className='w-full h-full'
						xmlns='http://www.w3.org/2000/svg'
					>
						{lineData.map(data => {
							return (
								<line
									x1={data.x1}
									y1={data.y1}
									x2={data.x2}
									y2={data.y2}
									stroke='black'
									strokeWidth={10}
									key={data.id}
								/>
							);
						})}
					</svg>
					{userData.map((data, i) => {
						return (
							<Avatar
								style={{
									left: data.left,
									top: data.top,
								}}
								onClick={() => handleUserClick(i)}
								key={data.id}
								src={data.avaSrc}
								alt='avatar'
							/>
						);
					})}
				</TransformComponent>
			</TransformWrapper>
		</Layout>
	);
}
