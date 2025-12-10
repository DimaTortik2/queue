import Konva from 'konva';
import { memo, useEffect, useRef, useMemo } from 'react';
import { Circle, Group } from 'react-konva'; // <--- Image больше не нужен внутри Group
import { AVATAR, COLORS } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import type { IUser } from '../../pages/main/interfaces';
import useImage from 'use-image';

interface IProps extends Konva.NodeConfig {
	isLeft: boolean;
	isSelected: boolean;
	userIndex: number;
	userId: IUser['id'];
	avatarSrc: string;
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
		avatarSrc,
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

		const [image] = useImage(avatarSrc, 'anonymous');

		// Рассчитываем параметры для "заливки" картинкой (аналог object-fit: cover)
		const patternConfig = useMemo(() => {
			if (!image) return { scale: { x: 1, y: 1 }, offset: { x: 0, y: 0 } };

			// 1. Находим меньшую сторону картинки
			const minSide = Math.min(image.width, image.height);

			// 2. Считаем коэффициент масштабирования.
			// Нам нужно, чтобы вырезанный квадрат (minSide) растянулся до диаметра круга
			const scale = (AVATAR.radius * 2) / minSide;

			// 3. Считаем смещение (offset), чтобы взять центр картинки
			const cx = (image.width - minSide) / 2;
			const cy = (image.height - minSide) / 2;

			return {
				scale: { x: scale, y: scale },
				offset: { x: cx, y: cy },
			};
		}, [image]);

		return (
			<Group x={x} y={y} ref={avatarRef}>
				{/* Основной круг с картинкой-заливкой */}
				<Circle
					radius={AVATAR.radius}
					fillPatternImage={image}
					// Смещаем начало текстуры в вычисленную точку
					fillPatternOffset={patternConfig.offset}
					// Масштабируем текстуру
					fillPatternScale={patternConfig.scale}
					// Важно: по умолчанию паттерн начинается от x,y круга.
					// Чтобы центрировать его относительно центра круга (0,0 локальных координат),
					// нужно сдвинуть точку начала отрисовки.
					// Но Circle в Konva рисуется от центра.
					// Для fillPattern часто нужно подбирать fillPatternX/Y
					// Этот трюк центрирует паттерн относительно центра круга:
					fillPatternX={-AVATAR.radius}
					fillPatternY={-AVATAR.radius}
					onPointerClick={handleAvatarClick}
					// Рисуем обводку прямо на этом же круге (оптимизация кол-ва нод)
					stroke={COLORS.avatar.border.normal}
					strokeWidth={AVATAR.border.width}
					perfectDrawEnabled={false}
					shadowForStrokeEnabled={false}
					{...props}
				/>

				{isSelected && (
					<UserPopUp
						isLeft={isLeft}
						x={popUpX}
						y={popUpY}
						isVisible={isSelected}
					/>
				)}
			</Group>
		);
	}
);
