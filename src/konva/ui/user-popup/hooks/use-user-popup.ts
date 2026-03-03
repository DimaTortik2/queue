import Konva from 'konva';
import { identifyUser } from '../helpers/identifyUser';
import { useEffect, useRef } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import {
	currentUserAtom,
	isLocalRenamingModalVisibleAtom,
	isSwithUsersModalVisibleAtom,
	selectedUserAtom,
} from '../../../../app/strore/atoms';
import { splitUsername } from '../../../lib/helpers/split-username';
import { KONVA } from '../../../../app/config/consts';

export function useUserPopUp(isVisible: boolean) {
	const setIsSwithUsersModalVisible = useSetAtom(isSwithUsersModalVisibleAtom);
	const setIsLocalRenamingModalVisible = useSetAtom(
		isLocalRenamingModalVisibleAtom
	);
	const currentUser = useAtomValue(currentUserAtom);

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

	const userIdentifity = identifyUser({
		ownUserId: currentUser?.id,
		selectedUserId: selectedUser?.id,
	});

	const userName: string =
		userIdentifity === 'me' ? 'Вы' : selectedUser?.name || ' ';

	const { firstName, secondName } = splitUsername(userName);

	const UserNameFontSize = KONVA.font.size * 2;
	const placeFontSize = KONVA.font.size / 1.3;
	const positionFontSize = KONVA.font.size;

	const buttonPadding = 45;

	const positionText = String(selectedUser ? selectedUser?.position : 0);

	const handleLocalRenaming = () => {
		setIsLocalRenamingModalVisible(true);
	};

	return {
		setIsSwithUsersModalVisible,
		firstName,
		secondName,
		UserNameFontSize,
		placeFontSize,
		positionFontSize,
		buttonPadding,
		groupRef,
		userIdentifity,
		positionText,
		handleLocalRenaming,
	};
}
