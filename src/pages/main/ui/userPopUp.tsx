import { useEffect, useRef, type ReactNode } from 'react';
import { Rect, Text, Group } from 'react-konva';
import type { IReactKonvaUiProps } from './kanva.ui';
import { COLORS, KANVA } from '../consts';
import Konva from 'konva';

interface IProps extends IReactKonvaUiProps {
	userName?: string;
	positionInQueue: number;
	actionButton?: ReactNode;
	isVisible: boolean;
}

export function UserPopUp({
	width,
	userName,
	positionInQueue,
	actionButton,
	height,
	x,
	y,
	paddingTop,
	paddingLeft,
	isVisible,
	color,
}: IProps) {
	const UserNameFontSize = KANVA.font.size * 2;
	const placeFontSize = KANVA.font.size / 1.3;
	const placeY = (paddingTop ? paddingTop : 0) + UserNameFontSize + 40;
	const positionFontSize = KANVA.font.size;
	const positionY = placeY - (positionFontSize - placeFontSize);

	const groupRef = useRef<Konva.Group>(null);

	useEffect(() => {
		const popUp = groupRef.current;
		if (!popUp) return;

		if (isVisible) {
			popUp.visible(true);
			new Konva.Tween({
				node: popUp,
				duration: 0.5,
				opacity: 1,
				easing: Konva.Easings.EaseInOut,
			}).play();
		} else {
			new Konva.Tween({
				node: popUp,
				duration: 0.2,
				opacity: 0,
				easing: Konva.Easings.EaseInOut,
				onFinish: () => {
					popUp.visible(false);
				},
			}).play();
		}
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
			/>
			<Text
				padding={5}
				text='Место'
				x={paddingLeft ? paddingLeft : 0}
				y={placeY}
				fontSize={placeFontSize}
				fill={color ? color : COLORS.text70}
				align='center'
			/>
			<Text
				padding={5}
				text={String(positionInQueue)}
				x={paddingLeft ? paddingLeft : 320}
				y={positionY}
				fontSize={positionFontSize}
				fill={color ? color : COLORS.text}
				align='center'
			/>
			{actionButton}
		</Group>
	);
}
