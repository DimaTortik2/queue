import Konva from 'konva';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Circle, Group } from 'react-konva';
import { AVATAR, COLORS } from '../../app/config/consts';
import { UserPopUp } from './userPopUp';
import type { IUser } from '../../pages/(main)/interfaces';
import type { Vector2d } from 'konva/lib/types';

interface IImageConfig {
	offset: Vector2d;
	scale: Vector2d;
}

interface IProps extends Konva.NodeConfig {
	isLeft: boolean;
	isSelected: boolean;
	imageObj: HTMLImageElement;
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
		imageObj,
		...props
	}: IProps) => {
		const mainGroupRef = useRef<Konva.Group>(null);
		const cachedGroupRef = useRef<Konva.Group>(null);

		useEffect(() => {
			if (mainGroupRef.current) {
				onRegister(mainGroupRef.current, userId);
			}
			return () => {
				onRegister(null, userId);
			};
		}, [userId, onRegister]);

		const [isLoaded, setIsLoaded] = useState<boolean>(imageObj.complete);

		// на загрузку картинки : обозначаем , что она загружена
		useEffect(() => {
			if (!imageObj.complete) {
				const onLoad = () => setIsLoaded(true);

				imageObj.addEventListener('load', onLoad);

				return () => imageObj.removeEventListener('load', onLoad);
			} else {
				setIsLoaded(true);
			}
		}, [imageObj]);

		const imageConfig: IImageConfig = useMemo((): IImageConfig => {
			// Если не загрузили иконку, то ниче не смещаем , ниче не масштабируем
			if (!isLoaded || !imageObj)
				return { scale: { x: 1, y: 1 }, offset: { x: 0, y: 0 } };
			// Тут тактика такая:
			// Нам надо вместить картинку допустим 100x300 в наш квадрат 250x250
			// Мы выржем квадрат по минимальной стороне ( в данном случае 100x100 )
			// Потом центрируем его ( в нашем примере высоты на 200 пикселей больше.
			// У нас есть способ при вырезании нашего квадрата 100x100 отступить сверху
			// сколько мы захотим ( свойство offsetY : положишь 50 - кадрат начнет вырезаться на 50 ниже).
			// Вот мы оступим половину оставшегося пространства и тогда наш квадрат как бы отцентруется по игрику.
			// Хорошо, мы имеем квадрат 100x100 по центру изображения (часть по высоте вылазит за пределы квдарата сверху
			// и снизу, но она "лишняя", её никак не всунуть никуда, чтобы не растягивать и не деформировать изображение - жертвуем.
			//
			// Теперь мы этот квадрат 100x100 должны впихнуть в квадрат аватраки - 250x250. Т.е. применим scale в 2.5 раза и будет то, что надо.
			// Так мы и отскейлим и отцентруем фотку в нашем кружке 250x250, например.

			const minSideLenght = Math.min(imageObj.width, imageObj.height);

			const scale = (AVATAR.radius * 2) / minSideLenght;

			const offsetX = (imageObj.width - minSideLenght) / 2;
			const offsetY = (imageObj.height - minSideLenght) / 2;

			return {
				offset: { x: offsetX, y: offsetY },
				scale: { x: scale, y: scale },
			};
		}, [imageObj, isLoaded]);

		// // кэширование автарки
		useEffect(() => {
			const cachedGroup = cachedGroupRef.current;
			if (isLoaded && cachedGroup) {
				const R = AVATAR.radius + AVATAR.border.width + 5;
				cachedGroup.cache({
					x: -R,
					y: -R,
					height: 2 * R,
					width: 2 * R,
					pixelRatio: window.devicePixelRatio || 1,
				});
			}
		}, [isLoaded]);

		if (x === undefined || y === undefined) return null;

		const popUpX = isLeft ? AVATAR.radius * 2 : -AVATAR.radius * 1.5;
		const popUpY = 0;

		const handleAvatarClick = () => {
			console.log('avatar was clicked');
			onAvatarClick({ selectedUserId: userId, selectedUserIndex: userIndex });
		};

		return (
			// группа, что двигается и склеивает всё
			<Group x={x} y={y} ref={mainGroupRef} {...props}>
				{/* Кэшируемая группа */}
				<Group ref={cachedGroupRef} x={0} y={0}>
					<Circle
						x={0}
						y={0}
						radius={AVATAR.radius}
						stroke={COLORS.avatar.border.normal}
						strokeWidth={AVATAR.border.width}
						fillPatternImage={imageObj}
						fillPatternOffset={imageConfig.offset}
						fillPatternScale={imageConfig.scale}
						fillPatternX={-AVATAR.radius}
						fillPatternY={-AVATAR.radius}
						// для оптимизаций это отлключим, это отрабатывает хитбокс-круг ниже в коде
						listening={false}
						perfectDrawEnabled={false}
						shadowForStrokeEnabled={false}
					/>
					{/* Прозрачный "хитбокс" для нажатий */}
					<Circle
						x={0}
						y={0}
						radius={AVATAR.radius}
						onClick={handleAvatarClick}
						onTap={handleAvatarClick}
					/>
				</Group>
				{/* / Кэшируемая группа */}

				{/* Он независим от кэширования , но находится в общей группе для синзронного движения */}
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
