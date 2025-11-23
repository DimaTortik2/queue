import Konva from 'konva';
import { forwardRef, memo, useEffect, useRef } from 'react';
import { Circle, Group } from 'react-konva';
import { AVATAR, COLORS, KONVA } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import { ButtonKanva } from './button-kanva';
import type { IUser } from '../../pages/main/interfaces';

interface IProps extends Konva.NodeConfig {
	initialX: number;
	initialY: number;
	isLeft: boolean;
	isSelected: boolean;
	onRegister: (node: Konva.Group | null, userId: IUser['id']) => void;
	onAvatarClick: ({
		selectedUserId,
		selectedUserIndex,
	}: {
		selectedUserId: number;
		selectedUserIndex: number;
	}) => void;

	selectedUserId: IUser['id'];
	selectedUserIndex: number;
	userId: IUser['id'];
}

export const UserAvatar = memo(
	({
		x,
		y,
		initialX,
		initialY,
		isSelected,
		isLeft,
		onAvatarClick,
		selectedUserId,
		selectedUserIndex,
		onRegister,
		userId,
		...props
	}: IProps) => {
		if (x === undefined || y === undefined) return null;

		const popUpX = isLeft
			? AVATAR.radius * 2
			: -KONVA.size.userPopUp.width - AVATAR.radius * 2;
		const popUpY = -KONVA.size.userPopUp.height / 3 - AVATAR.radius / 2;

		const handleAvatarClick = () => {
			onAvatarClick({ selectedUserId, selectedUserIndex });
		};

		const avatarRef = useRef<Konva.Group>(null);

		useEffect(() => {
			if (avatarRef.current) {
				onRegister(avatarRef.current, userId);
			}
			return () => {
				onRegister(null, userId);
			};
		}, [userId, onRegister]);

		return (
			<Group x={initialX} y={initialY} ref={avatarRef}>
				<Circle
					x={0}
					y={0}
					radius={AVATAR.radius}
					fill={'#550000'}
					onPointerClick={handleAvatarClick}
					{...props}
				/>
				<UserPopUp
					width={KONVA.size.userPopUp.width}
					height={KONVA.size.userPopUp.height}
					x={popUpX}
					y={popUpY}
					isVisible={isSelected}
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
			</Group>
		);
	}
);
