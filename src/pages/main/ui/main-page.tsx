import { Layout } from './layout';
import { useBuisness } from '../hooks/use-buisness';
import { useUserClick } from '../hooks/use-user-click';
// import { Avatar } from './avatar';
// import { Line } from './line';
import { Layer, Stage } from 'react-konva';
import { useAnimations } from '../hooks/use-animations';
import { useStage } from '../hooks/use-stage';
import { User } from './user';
import { STAGE } from '../consts';

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
		users,
		initialLines,
		lines,
		initionalStage,
		shiftOtherUsers,
		resetUserData,
		initailWrapperX,
		initialUsers,
		stageRef,
	} = useBuisness();

	// console.log(initialUsers);

	const { zoomTo } = useAnimations({
		stageRef,
	});

	const { handleUserClick, onPointerClick } = useUserClick({
		users,
		shiftOtherUsers,
		resetUserData,
		initailWrapperX,
		stageRef,
		zoomTo,
		initionalStage,
	});

	const { handleTouchEnd, handleTouchMove, handleWheel } = useStage({
		stageRef,
		maxScale: STAGE.maxScale,
		minScale: STAGE.minScale,
	});

	return (
		<Layout>
			<Stage
				ref={stageRef}
				width={window.innerWidth}
				height={window.innerHeight}
				scaleX={initionalStage.scale}
				scaleY={initionalStage.scale}
				x={initionalStage.x}
				y={initionalStage.y}
				draggable
				onPointerClick={onPointerClick}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onWheel={handleWheel}
			>
				<Layer>
					{users.map((user, i) => (
						<User
							initialX={initialUsers[i].x}
							initialY={initialUsers[i].y}
							x={user.x}
							y={user.y}
							radius={250}
							fill={'#550000'}
							onPointerClick={() => {
								handleUserClick({
									selectedUserId: user.id,
									selectedUserIndex: i,
								});
							}}
							key={user.id}
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
