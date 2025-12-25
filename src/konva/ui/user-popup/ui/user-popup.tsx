import { Text, Group } from 'react-konva';
import type { KonvaProps } from '../../../interfaces/kanva.interface';
import { AVATAR, COLORS, KONVA } from '../../../../app/config/consts';
import { KonvaDiv } from '../../konva-div';
import { KonvaVerticalStack } from '../../konva-vertical-stack';
import { ButtonKanva } from '../../button-kanva';
import { EditAvatarButton } from '../../edit-avatar-button';
import { KonvaHorizontalStack } from '../../konva-horizontal-stack';
import { getMainButtonProps } from '../helpers/get-main-buttom-props';
import { useUserPopUp } from '../hooks/use-user-popup';
import { getTextWidth } from '../helpers/get-text-width';

interface IProps extends KonvaProps {
	isVisible: boolean;
	isLeft: boolean;
}

export function UserPopUp({ x, y, isVisible, isLeft }: IProps) {
	const {
		UserNameFontSize,
		buttonPadding,
		firstName,
		placeFontSize,
		positionFontSize,
		secondName,
		setIsSwithUsersModalVisible,
		groupRef,
		userIdentifity,
		positionText,
		handleLocalRenaming,
	} = useUserPopUp(isVisible);

	if (!isVisible) return;

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
							onClick={handleLocalRenaming}
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
							text={positionText}
							fontSize={positionFontSize}
							fill={COLORS.text.unimportant}
							align='center'
							listening={false}
						/>
					</KonvaHorizontalStack>
				</Group>
				<ButtonKanva
					{...getMainButtonProps({
						identify: userIdentifity,
						onSwitchUsers: () => setIsSwithUsersModalVisible(true),
					})}
					fontSize={KONVA.font.size / 1.5}
					cornerRadius={60}
					padding={buttonPadding}
				/>
			</KonvaVerticalStack>
		</KonvaDiv>
	);
}
