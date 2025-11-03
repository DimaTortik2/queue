import { Layout } from './layout';
import { useBuisness } from '../hooks/use-buisness';
import { useUserClick } from '../hooks/use-user-click';
// import { Avatar } from './avatar';
// import { Line } from './line';
import { Layer, Stage } from 'react-konva';
import { useAnimations } from '../hooks/use-animations';
import { useStage } from '../hooks/use-stage';
import { User } from './user';
import { AVATAR, COLORS, KANVA, STAGE } from '../consts';
import { UserPopUp } from './userPopUp';
import { selectedUserAtom, userIdAtom } from '../../../app/strore/atoms';
import { useAtomValue } from 'jotai';
import { ButtonKanva } from './button-kanva';
import { UserLine } from './kanvaLine';

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

	const selectedUser = useAtomValue(selectedUserAtom);
	const userId = useAtomValue(userIdAtom);


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
					{lines.map((line, i) => {
	
						return (
							<UserLine
								initialX1={initialLines[i].x1}
								initialY1={initialLines[i].y1}
								initialX2={initialLines[i].x2}
								initialY2={initialLines[i].y2}
								x1={line.x1}
								y1={line.y1}
								x2={line.x2}
								y2={line.y2}
								key={line.id}
							/>
						);
					})}
					{users.map((user, i) => {
						const isLeft = i % 2 === 0;
						const popUpX = isLeft
							? user.x + AVATAR.radius * 2
							: user.x - KANVA.size.userPopUp.width - AVATAR.radius * 2;
						const popUpY =
							user.y - KANVA.size.userPopUp.height / 3 - AVATAR.radius / 2;



						return (
							<User
								initialX={initialUsers[i].x}
								initialY={initialUsers[i].y}
								x={user.x}
								y={user.y}
								radius={AVATAR.radius}
								fill={'#550000'}
								onPointerClick={() => {
									handleUserClick({
										selectedUserId: user.id,
										selectedUserIndex: i,
									});
								}}
								key={user.id}
								userPopup={
									<UserPopUp
										width={KANVA.size.userPopUp.width}
										height={KANVA.size.userPopUp.height}
										x={popUpX}
										y={popUpY}
										isVisible={i === selectedUser?.index}
										userName={
											selectedUser && selectedUser?.id === userId
												? 'Вы'
												: selectedUser?.name
										}
										positionInQueue={selectedUser ? selectedUser?.index + 1 : 0}
										actionButton={
											<ButtonKanva
												width={KANVA.size.userPopUp.width}
												height={KANVA.size.userPopUpButton.height}
												localGroupX={0}
												localGroupY={KANVA.size.userPopUp.height}
												onClick={() => console.log('hello World')}
												bgColor={COLORS.bg.leave}
												color={COLORS.text}
												fontSize={KANVA.font.size / 1.5}
												cornerRadius={60}
											>
												Покинуть очередь
											</ButtonKanva>
										}
									/>
								}
							/>
						);
					})}
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
