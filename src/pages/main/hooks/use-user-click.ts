import { useAtom } from 'jotai';
import { selectedUserAtom } from '../../../app/strore/atoms';
import type { IStage, IUser } from '../interfaces';
import { getTransformStateYToCenterSelectedUser } from '../helpers/get-transform-state-y-to-center-selected-user';
import type { Stage } from 'konva/lib/Stage';
import { useCallback, useRef } from 'react';
import { AVATAR, DEVICE, STAGE } from '../consts';
import type { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';
import { getStageXToCenterQueue } from '../helpers/get-stage-x-to-center-queue';

interface IProps {
	users: IUser[];
	shiftOtherUsers: (idAndIndex: {
		selectedUserId: IUser['id'];
		selectedUserIndex: number;
	}) => void;
	resetUserData: () => void;
	initailWrapperX: number;
	stageRef: React.RefObject<Stage | null>;
	zoomTo: (stage: IStage) => void;
	initionalStage: IStage;
}

export function useUserClick({
	resetUserData,
	shiftOtherUsers,
	users,
	initailWrapperX,
	stageRef,
	zoomTo,
	initionalStage,
}: IProps) {
	const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

	const resetUserClick = useCallback(() => {
		if (!stageRef.current) return;
		if (selectedUser !== null) {
			// unzoom

			if (!DEVICE.isMobile) {
				const x = initailWrapperX;
				const y = getTransformStateYToCenterSelectedUser(
					STAGE.initial.scale,
					selectedUser.y
				);

				const scale = STAGE.initial.scale;

				zoomTo({ x, y, scale });
			}

			resetUserData();

			setSelectedUser(null);
		}
	}, [
		selectedUser,
		initailWrapperX,
		zoomTo,
		resetUserData,
		setSelectedUser,
		stageRef,
	]);

	const handleUserClick = useCallback(
		({
			selectedUserId,
			selectedUserIndex,
		}: {
			selectedUserId: IUser['id'];
			selectedUserIndex: number;
		}) => {
			if (!stageRef.current) return;
			// reset if toggled
			resetUserClick();

			if (selectedUser === null) {
				const selectedUser = users[selectedUserIndex];

				// set current user
				setSelectedUser({ ...selectedUser, index: selectedUserIndex });

				// zoom to User
				const isLeft = selectedUserIndex % 2 === 0;
				const scale = DEVICE.isMobile
					? DEVICE.mobile.selectedScale
					: DEVICE.pc.selectedScale;

				const avatarMarginX = DEVICE.isMobile
					? DEVICE.mobile.selectedMargin.x
					: DEVICE.pc.selectedMargin.x;

				const shiftToLeftX = isLeft
					? scale * users[0].x - avatarMarginX - (AVATAR.radius / 2) * scale
					: scale * users[1].x +
					  avatarMarginX -
					  window.innerWidth +
					  (AVATAR.radius / 2) * scale;

				const shiftToCenterY = getTransformStateYToCenterSelectedUser(
					scale,
					selectedUser.y
				);

				const x = -shiftToLeftX;

				const y = shiftToCenterY;

				zoomTo({ x, y, scale });

				// shift others
				shiftOtherUsers({ selectedUserId, selectedUserIndex });
			}
		},
		[
			resetUserClick,
			selectedUser,
			users,
			setSelectedUser,
			zoomTo,
			shiftOtherUsers,
			stageRef,
		]
	);

	const clickTimeout = useRef<NodeJS.Timeout | null>(null);
	const CLICK_DELAY = 180;

	function onPointerClick(e: KonvaEventObject<PointerEvent, Node<NodeConfig>>) {
		if (e.target === e.currentTarget) {
			if (clickTimeout.current) {
				clearTimeout(clickTimeout.current);
				clickTimeout.current = null;
				//логика двойного клика
				resetUserClick();
				zoomTo({
					x: getStageXToCenterQueue(0.1),
					y: initionalStage.y,
					scale: 0.1,
				});

				return;
			}

			clickTimeout.current = setTimeout(() => {
				clickTimeout.current = null;
				//логика одиночного клика
				resetUserClick();
			}, CLICK_DELAY);
		}
	}

	return { onPointerClick, handleUserClick };
}
