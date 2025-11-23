import { useEffect, useRef, type ReactNode } from 'react';
import { Rect, Text, Group } from 'react-konva';
import type { IReactKonvaUiProps } from '../interfaces/kanva.interface';
import Konva from 'konva';
import { COLORS, KONVA, USER_ID_TEMP } from '../../app/config/consts';
import { useAtomValue } from 'jotai';
import { selectedUserAtom } from '../../app/strore/atoms';

interface IProps extends IReactKonvaUiProps {
	actionButton?: ReactNode;
	isVisible: boolean;
}

export function UserPopUp({
	width,
	actionButton,
	height,
	x,
	y,
	paddingTop,
	paddingLeft,
	isVisible,
	color,
}: IProps) {
	if (!isVisible) return;

	const selectedUser = useAtomValue(selectedUserAtom);

	const userName =
		selectedUser?.id === USER_ID_TEMP ? 'Вы' : selectedUser?.name;

	const UserNameFontSize = KONVA.font.size * 2;
	const placeFontSize = KONVA.font.size / 1.3;
	const placeY = (paddingTop ? paddingTop : 0) + UserNameFontSize + 40;
	const positionFontSize = KONVA.font.size;
	const positionY = placeY - (positionFontSize - placeFontSize);

	const groupRef = useRef<Konva.Group>(null);

	useEffect(() => {
		const popUp = groupRef.current;
		if (!popUp) return;

		popUp.opacity(0);
		popUp.scale({ x: 0.95, y: 0.95 });

		const tween = new Konva.Tween({
			node: popUp,
			duration: 0.3,
			opacity: 1,
			scaleX: 1,
			scaleY: 1,
			easing: Konva.Easings.EaseInOut,
		});
		tween.play();
	}, [isVisible]);

	return (
		<Group ref={groupRef} x={x} y={y} opacity={0}>
			<Rect x={0} y={0} width={width} height={height} cornerRadius={5} />
			<Text
				padding={5}
				fontSize={UserNameFontSize}
				text={userName}
				x={paddingLeft ? paddingLeft : 0}
				y={paddingTop ? paddingTop : 0}
				fill={color ? color : COLORS.text78}
				align='center'
				listening={false}
			/>
			<Text
				padding={5}
				text='Место'
				x={paddingLeft ? paddingLeft : 0}
				y={placeY}
				fontSize={placeFontSize}
				fill={color ? color : COLORS.text70}
				align='center'
				listening={false}
			/>
			<Text
				padding={5}
				text={String(selectedUser ? selectedUser?.index + 1 : 0)}
				x={paddingLeft ? paddingLeft : 320}
				y={positionY}
				fontSize={positionFontSize}
				fill={color ? color : COLORS.text}
				align='center'
				listening={false}
			/>
			{actionButton}
		</Group>
	);
}
