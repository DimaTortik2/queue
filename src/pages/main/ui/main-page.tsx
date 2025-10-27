import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Layout } from './layout';
import { useBuisness } from '../hooks/use-buisness';
import { useUserClick } from '../hooks/use-user-click';
import { Avatar } from './avatar';
import { Line } from './line';

export function MainPage() {
	const {
		canvaHeight,
		canvaWidth,
		userData,
		lineData,
		shiftOtherUsers,
		initialLineData,
	} = useBuisness();
	const { canvasRef, handleUserClick } = useUserClick(
		userData,
		shiftOtherUsers
	);

	return (
		<Layout>
			<TransformWrapper
				ref={canvasRef}
				limitToBounds={false}
				minScale={0.015}
				maxScale={2}
				initialPositionX={0}
				initialPositionY={0}
				initialScale={0.25}
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
						{lineData.map((line, i) => {
							return (
								<Line
									initX1={initialLineData[i].x1}
									initY1={initialLineData[i].y1}
									initX2={initialLineData[i].x2}
									initY2={initialLineData[i].y2}
									x1={line.x1}
									y1={line.y1}
									x2={line.x2}
									y2={line.y2}
									stroke='black'
									strokeWidth={10}
									key={line.id}
									className={String(line.id)}
								/>
							);
						})}
					</svg>
					{userData.map((user, i) => {
						return (
							<Avatar
								style={{
									left: user.left,
									top: user.top,
									transform: `translateY(${user.translateY}px)`,
								}}
								onClick={() =>
									handleUserClick({
										selectedUserId: user.id,
										selectedUserIndex: i,
									})
								}
								key={user.id}
								src={user.avaSrc}
								alt='avatar'
								className='excluded-item transition-transform duration-1000'
							/>
						);
					})}
				</TransformComponent>
			</TransformWrapper>
		</Layout>
	);
}
