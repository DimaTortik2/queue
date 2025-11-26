import { useEffect, useRef } from 'react';
import { Text, Group } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import Konva from 'konva';
import { COLORS, KONVA, USER_ID_TEMP } from '../../app/config/consts';
import { useAtomValue } from 'jotai';
import { selectedUserAtom } from '../../app/strore/atoms';
import { KonvaDiv } from './konva-div';
import { KonvaVerticalStack } from './konva-vertical-stack';
import { ButtonKanva } from './button-kanva';
import { splitUsername } from '../lib/helpers/split-username';

interface IProps extends KonvaProps {
	isVisible: boolean;
	isLeft: boolean;
}

export function UserPopUp({ x, y, isVisible, isLeft }: IProps) {
	if (!isVisible) return;

	console.log('render PopUp');

	const selectedUser = useAtomValue(selectedUserAtom);

	const userName: string =
		selectedUser?.id === USER_ID_TEMP ? 'Вы' : selectedUser?.name || ' ';

	const { firstName, secondName } = splitUsername(userName);

	const UserNameFontSize = KONVA.font.size * 2;
	const placeFontSize = KONVA.font.size / 1.3;
	const positionFontSize = KONVA.font.size;

	const buttonPadding = 45;

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
		<KonvaDiv ref={groupRef} x={x} y={y} centerY EndX={!isLeft}>
			<KonvaVerticalStack gap={KONVA.font.size / 6}>
				<Text
					text={firstName}
					listening={false}
					fill={COLORS.text78}
					fontSize={UserNameFontSize}
					heightInStack={UserNameFontSize}
				/>

				{secondName && (
					<Text
						text={secondName}
						listening={false}
						fill={COLORS.text70}
						fontSize={UserNameFontSize / 3}
					/>
				)}

				<Group
					heightInStack={
						Math.max(positionFontSize, placeFontSize) + buttonPadding / 2
					}
				>
					<Text
						text='Место'
						y={positionFontSize - placeFontSize}
						fontSize={placeFontSize}
						fill={COLORS.text70}
						align='center'
						listening={false}
					/>
					<Text
						text={String(selectedUser ? selectedUser?.index + 1 : 0)}
						x={320}
						fontSize={positionFontSize}
						fill={COLORS.text}
						align='center'
						listening={false}
					/>
				</Group>
				<ButtonKanva
					onClick={() => console.log('hello World')}
					bgColor={COLORS.bg.leave}
					color={COLORS.text}
					fontSize={KONVA.font.size / 1.5}
					cornerRadius={60}
					padding={buttonPadding}
				>
					Покинуть очередь
				</ButtonKanva>
			</KonvaVerticalStack>
		</KonvaDiv>
	);
}
