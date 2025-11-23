import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Circle } from 'react-konva';
import { AVATAR, COLORS, KONVA, USER_ID_TEMP } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import type { ISelectedUser } from '../../pages/main/interfaces';
import { ButtonKanva } from './button-kanva';

interface IProps extends Konva.NodeConfig {
	initialX: number;
	initialY: number;
	isLeft: boolean;
	isPopUpVisible: boolean;
	selectedUser: ISelectedUser | null;
}

export function UserAvatar({
	x,
	y,
	initialX,
	initialY,
	selectedUser,
	isLeft,
	isPopUpVisible,
	...props
}: IProps) {
	if (x === undefined || y === undefined) return;

	console.log('rerender Avatar');

	const circleRef = useRef<Konva.Circle>(null);

	useEffect(() => {
		const circle = circleRef.current;

		if (!circle) return;
		circle.to({
			duration: 0.5,
			x: x,
			y: y,
			easing: Konva.Easings.EaseInOut,
		});
	}, [x, y]);

	const popUpX = isLeft
		? x + AVATAR.radius * 2
		: x - KONVA.size.userPopUp.width - AVATAR.radius * 2;
	const popUpY = y - KONVA.size.userPopUp.height / 3 - AVATAR.radius / 2;

	return (
		<>
			<Circle
				ref={circleRef}
				x={initialX}
				y={initialY}
				radius={AVATAR.radius}
				fill={'#550000'}
				{...props}
			/>
			<UserPopUp
				width={KONVA.size.userPopUp.width}
				height={KONVA.size.userPopUp.height}
				x={popUpX}
				y={popUpY}
				isVisible={isPopUpVisible}
				userName={
					selectedUser && selectedUser?.id === USER_ID_TEMP
						? 'Вы'
						: selectedUser?.name
				}
				positionInQueue={selectedUser ? selectedUser?.index + 1 : 0}
				actionButton={
					<ButtonKanva
						width={KONVA.size.userPopUp.width}
						height={KONVA.size.userPopUpButton.height}
						localGroupX={0}
						localGroupY={KONVA.size.userPopUp.height}
						onClick={() => console.log('hello World')}
						bgColor={COLORS.bg.leave}
						color={COLORS.text}
						fontSize={KONVA.font.size / 1.5}
						cornerRadius={60}
					>
						Покинуть очередь
					</ButtonKanva>
				}
			/>
		</>
	);
}
