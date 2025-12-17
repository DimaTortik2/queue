import { useEffect, useRef } from 'react';
import { Text, Group } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import Konva from 'konva';
import { AVATAR, COLORS, KONVA, USER_ID_TEMP } from '../../app/config/consts';
import { useAtomValue } from 'jotai';
import { selectedUserAtom } from '../../app/strore/atoms';
import { KonvaDiv } from './konva-div';
import { KonvaVerticalStack } from './konva-vertical-stack';
import { ButtonKanva } from './button-kanva';
import { splitUsername } from '../lib/helpers/split-username';
import type { IUser } from '../../pages/(main)/interfaces';
import { EditAvatarButton } from './edit-avatar-button';
import { KonvaHorizontalStack } from './konva-horizontal-stack';

interface IProps extends KonvaProps {
	isVisible: boolean;
	isLeft: boolean;
}

const getTextWidth = (text: string, fontSize: number, fontFamily = 'Arial') => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (context) {
		context.font = `${fontSize}px ${fontFamily}`;
		return context.measureText(text).width;
	}
	return text.length * fontSize * 0.6; // Фоллбэк, если канвас недоступен
};

type TIdentifity = 'me' | 'stranger';

const identifyUser = ({
	ownUserId,
	selectedUserId,
}: {
	selectedUserId?: IUser['id'];
	ownUserId: IUser['id'];
}): TIdentifity => {
	if (ownUserId === selectedUserId) {
		return 'me';
	} else {
		return 'stranger';
	}
};

const getButtonProps = (identify: TIdentifity) => {
	if (identify === 'me') {
		return {
			bgColor: COLORS.userActionButtons.leave.bg.passive,
			color: COLORS.userActionButtons.leave.text,
			bgColorHover: COLORS.userActionButtons.leave.bg.active,
			children: 'Покинуть очередь',
			onClick: () => console.log('Покинуть очередь'),
		};
	} else {
		return {
			bgColor: COLORS.userActionButtons.exchange.bg.passive,
			bgColorHover: COLORS.userActionButtons.exchange.bg.active,
			color: COLORS.userActionButtons.exchange.text,
			children: 'Поменяться',
			onClick: () => console.log('Поменяться'),
		};
	}
};

export function UserPopUp({ x, y, isVisible, isLeft }: IProps) {
	const selectedUser = useAtomValue(selectedUserAtom);
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

	if (!isVisible) return;

	console.log('render PopUp');

	const userIdentifity = identifyUser({
		ownUserId: USER_ID_TEMP,
		selectedUserId: selectedUser?.id,
	});

	const userName: string =
		userIdentifity === 'me' ? 'Вы' : selectedUser?.name || ' ';

	const { firstName, secondName } = splitUsername(userName);

	const UserNameFontSize = KONVA.font.size * 2;
	const placeFontSize = KONVA.font.size / 1.3;
	const positionFontSize = KONVA.font.size;

	const buttonPadding = 45;

	return (
		<KonvaDiv ref={groupRef} x={x} y={y} centerY EndX={!isLeft}>
			<KonvaVerticalStack gap={KONVA.font.size / 6}>
				<KonvaHorizontalStack
					height={UserNameFontSize}
					gap={UserNameFontSize / 4}
				>
					<Text
						text={firstName}
						listening={false}
						fill={COLORS.text78}
						fontSize={UserNameFontSize}
						heightInStack={UserNameFontSize}
						width={getTextWidth(firstName, UserNameFontSize)}
					/>
					{userIdentifity === 'stranger' && (
						<EditAvatarButton
							onClick={() => console.log('edit')}
							x={200}
							y={(UserNameFontSize - AVATAR.radius / 3) / 2}
							w={AVATAR.radius / 3}
							h={AVATAR.radius / 3}
						/>
					)}
				</KonvaHorizontalStack>
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
					<KonvaHorizontalStack gap={KONVA.font.size / 2}>
						<Text
							text='Место'
							y={positionFontSize - placeFontSize}
							fontSize={placeFontSize}
							fill={COLORS.text70}
							align='center'
							width={getTextWidth('Место', placeFontSize)}
							listening={false}
						/>
						<Text
							text={String(selectedUser ? selectedUser?.index + 1 : 0)}
							fontSize={positionFontSize}
							fill={COLORS.text.unimportant}
							align='center'
							listening={false}
						/>
					</KonvaHorizontalStack>
				</Group>
				<ButtonKanva
					{...getButtonProps(userIdentifity)}
					fontSize={KONVA.font.size / 1.5}
					cornerRadius={60}
					padding={buttonPadding}
				/>
			</KonvaVerticalStack>
		</KonvaDiv>
	);
}
