import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Layout } from './layout';
import { useBuisness } from '../hooks/use-buisness';
import { useUserClick } from '../hooks/use-user-click';
import { Avatar } from './avatar';
import { Line } from './line';
import { Layer, Stage } from 'react-konva';
import type { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';
import { useAnimations } from '../hooks/use-animations';

// export function MainPage() {
// 	const {
// 		canvaHeight,
// 		canvaWidth,
// 		users,
// 		initialLines,
// 		lines,
// 		shiftOtherUsers,
// 		resetUserData,
// 		initailWrapperX,
// 		initionalTransformState,
// 	} = useBuisness();
// 	const { canvasRef, handleUserClick, resetUserClick } = useUserClick({
// 		users,
// 		shiftOtherUsers,
// 		resetUserData,
// 		initailWrapperX,
// 		initionalTransformState,
// 	});

// 	return (
// 		<Layout>
// 			<TransformWrapper
// 				ref={canvasRef}
// 				limitToBounds={false}
// 				minScale={0.04}
// 				maxScale={1.5}
// 				initialPositionX={initionalTransformState.x}
// 				initialPositionY={initionalTransformState.y}
// 				initialScale={initionalTransformState.scale}
// 				doubleClick={{ disabled: true }}
// 				wheel={{ step: 1 }}
// 				smooth

// 			>
// 				<TransformComponent
// 					contentStyle={{ height: canvaHeight, width: canvaWidth }}
// 					contentClass='bg-[#ffffff] relative'
// 					contentProps={{ onClick: resetUserClick }}
// 				>
// 					<svg
// 						viewBox={`0 0 ${canvaWidth} ${canvaHeight}`}
// 						className='w-full h-full'
// 						xmlns='http://www.w3.org/2000/svg'
// 					>
// 						{lines.map((line, i) => {
// 							return (
// 								<Line
// 									initX1={initialLines[i].x1}
// 									initY1={initialLines[i].y1}
// 									initX2={initialLines[i].x2}
// 									initY2={initialLines[i].y2}
// 									x1={line.x1}
// 									y1={line.y1}
// 									x2={line.x2}
// 									y2={line.y2}
// 									stroke='black'
// 									strokeWidth={10}
// 									key={line.id}
// 									className={String(line.id)}
// 								/>
// 							);
// 						})}
// 					</svg>
// 					{users.map((user, i) => {
// 						return (
// 							<Avatar
// 								style={{
// 									left: user.left,
// 									top: user.top,
// 									transform: `translateY(${user.translateY}px)`,
// 								}}
// 								onClick={() =>
// 									handleUserClick({
// 										selectedUserId: user.id,
// 										selectedUserIndex: i,
// 									})
// 								}
// 								key={user.id}
// 								src={user.avaSrc}
// 								alt='avatar'
// 								className='transition-transform duration-1000'
// 							/>
// 						);
// 					})}
// 				</TransformComponent>
// 			</TransformWrapper>
// 		</Layout>
// 	);
// }

export function MainPage() {
	const {
		canvaHeight,
		canvaWidth,
		users,
		initialLines,
		lines,
		shiftOtherUsers,
		resetUserData,
		initailWrapperX,
		initionalStage,
		setStage,
		stageRef,
	} = useBuisness();
	const { handleUserClick, resetUserClick } = useUserClick({
		users,
		shiftOtherUsers,
		resetUserData,
		initailWrapperX,
		setStage,
	});

	const { userSprings, AnimatedCircle } = useAnimations({
		users,
	});

	return (
		<Layout>
			<Stage
				ref={stageRef}
				width={window.innerWidth}
				height={window.innerHeight}
				x={initionalStage.x}
				y={initionalStage.y}
				scaleX={initionalStage.scale}
				scaleY={initionalStage.scale}
				draggable
				onPointerClick={(
					e: KonvaEventObject<PointerEvent, Node<NodeConfig>>
				) => {
					if (e.target === e.currentTarget) {
						resetUserClick();
					}
				}}
				// minScale={0.04}
				// maxScale={1.5}
				// initialPositionX={initionalTransformState.x}
				// initialPositionY={initionalTransformState.y}
				// initialScale={initionalTransformState.scale}
				// doubleClick={{ disabled: true }}
				// wheel={{ step: 1 }}
				// smooth
			>
				<Layer>
					{userSprings.map(({ x, y }, i) => (
						<AnimatedCircle
							x={x}
							y={y}
							radius={250}
							fill={'#550000'}
							onPointerClick={() => {
								handleUserClick({
									selectedUserId: users[i].id,
									selectedUserIndex: i,
								});
							}}
							key={users[i].id}
						/>
					))}
				</Layer>
			</Stage>

			{/* <svg
						viewBox={`0 0 ${canvaWidth} ${canvaHeight}`}
						className='w-full h-full'
						xmlns='http://www.w3.org/2000/svg'
					>
						{lines.map((line, i) => {
							return (
								<Line
									initX1={initialLines[i].x1}
									initY1={initialLines[i].y1}
									initX2={initialLines[i].x2}
									initY2={initialLines[i].y2}
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
					</svg> */}
			{/* {users.map((user, i) => {
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
								className='transition-transform duration-1000'
							/>
						);
					})} */}
		</Layout>
	);
}
