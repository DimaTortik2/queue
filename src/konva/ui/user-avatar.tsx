import Konva from 'konva';
import { memo, useEffect, useRef } from 'react';
import { Circle, Group, Image } from 'react-konva';
import { AVATAR, COLORS } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import type { IUser } from '../../pages/main/interfaces';
import useImage from 'use-image';
import myAvatar from '../../assets/ava.png?format=webp&quality=80';

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

		const [image] = useImage(myAvatar, 'anonymous');

		return (
			<Group x={x} y={y} ref={avatarRef}>
				<Group
					clipFunc={ctx => {
						// Делает клиппинг в виде круга
						ctx.arc(0, 0, AVATAR.radius, 0, Math.PI * 2, false);
					}}
				>
					<Image
						image={image}
						width={AVATAR.radius * 2}
						height={AVATAR.radius * 2}
						x={-AVATAR.radius}
						y={-AVATAR.radius}
						onPointerClick={handleAvatarClick}
						{...props}
					/>

					<Circle
						x={0}
						y={0}
						radius={AVATAR.radius}
						stroke={COLORS.avatar.border.normal}
						strokeWidth={AVATAR.border.width}
						listening={false}
					/>
				</Group>
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
