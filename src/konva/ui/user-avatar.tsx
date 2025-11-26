import Konva from 'konva';
import { memo, useEffect, useRef } from 'react';
import { Circle, Group } from 'react-konva';
import { AVATAR } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import type { IUser } from '../../pages/main/interfaces';

interface IProps extends Konva.NodeConfig {
	isLeft: boolean;
	isSelected: boolean;
	userIndex: number;
	userId: IUser['id'];
	onRegister: (node: Konva.Group | null, userId: IUser['id']) => void;
	onAvatarClick: ({
		selectedUserId,
		selectedUserIndex,
	}: {
		selectedUserId: number;
		selectedUserIndex: number;
	}) => void;
}

export const UserAvatar = memo(
	({
		x,
		y,
		isSelected,
		isLeft,
		onAvatarClick,
		onRegister,
		userId,
		userIndex,
		...props
	}: IProps) => {
		if (x === undefined || y === undefined) return null;

		const popUpX = isLeft ? AVATAR.radius * 2 : -AVATAR.radius * 1.5;
		const popUpY = 0;

		const handleAvatarClick = () => {
			onAvatarClick({ selectedUserId: userId, selectedUserIndex: userIndex });
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
			<Group x={x} y={y} ref={avatarRef}>
				<Circle
					x={0}
					y={0}
					radius={AVATAR.radius}
					fill={'#550000'}
					onPointerClick={handleAvatarClick}
					{...props}
				/>
				<UserPopUp
					isLeft={isLeft}
					x={popUpX}
					y={popUpY}
					isVisible={isSelected}
				/>
			</Group>
		);
	}
);
