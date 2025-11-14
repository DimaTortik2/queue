import { useAtom } from 'jotai';
import { selectedUserAtom } from '../../../app/strore/atoms';
import type { IUser } from '../interfaces';
import type { Stage } from 'konva/lib/Stage';
import { useCallback, useRef } from 'react';
import { DEVICE, STAGE } from '../../../app/config/consts';
import type { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';
import { setStageSmooth } from '../../../konva/lib/set-stage-smooth';
import { getTransformStateYToCenterSelectedUser } from '../../../konva/lib/helpers/get-transform-state-y-to-center-selected-user';
import { getTransformStateXToCenterSelectedUser } from '../../../konva/lib/helpers/get-transform-state-x-to-center-selected-user';
import { getStageXToCenterQueue } from '../../../konva/lib/helpers/get-stage-x-to-center-queue';

interface IProps {
	initialUsers: IUser[];
	users: IUser[];
	stageRef: React.RefObject<Stage | null>;
	setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

export function useUserClick({
	initialUsers,
	users,
	setUsers,
	stageRef,
}: IProps) {
	const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

	const shiftOtherUsers = ({
		selectedUserId,
		selectedUserIndex,
	}: {
		selectedUserId: IUser['id'];
		selectedUserIndex: number;
	}) => {
		const shiftY = window.innerHeight / 2;

		const newUsers = users.map((user, i) => {
			if (selectedUserId !== user.id) {
				// to above users
				if (i < selectedUserIndex) {
					return { ...user, y: user.y - shiftY };
				}
				// to below users
				else if (i > selectedUserIndex) {
					return { ...user, y: user.y + shiftY };
				}
			}
			return user;
		});

		setUsers(newUsers);
	};

	const resetAvatarClick = useCallback(() => {
		// если пользователь не выделен, то нечего и ресетать
		if (!stageRef.current || selectedUser === null) return;

		// на телефоне более свободное поведение (только центровка)
		if (DEVICE.isMobile) {
			const scale = stageRef.current.scaleX();
			const x = getStageXToCenterQueue(scale);
			const y = stageRef.current.y();
			setStageSmooth({ newStage: { x, y, scale }, stageRef });
		} else {
			// на пк четкое отдаление
			const scale = STAGE.initial.scale;
			const x = STAGE.initial.x;
			const y = getTransformStateYToCenterSelectedUser(scale, selectedUser.y);
			setStageSmooth({ newStage: { x, y, scale }, stageRef });
		}

		setUsers(initialUsers);
		setSelectedUser(null);
	}, [selectedUser, setStageSmooth, setSelectedUser, stageRef]);

	const handleAvatarClick = useCallback(
		({
			selectedUserId,
			selectedUserIndex,
		}: {
			selectedUserId: IUser['id'];
			selectedUserIndex: number;
		}) => {
			if (!stageRef.current) return;
			// ресетать , если кликнули повторно

			if (selectedUser !== null) {
				resetAvatarClick();
			}

			if (selectedUser === null) {
				const selectedUser = users[selectedUserIndex];

				setSelectedUser({ ...selectedUser, index: selectedUserIndex });

				const scale = DEVICE.isMobile
					? DEVICE.mobile.selectedScale
					: DEVICE.pc.selectedScale;
				const x = getTransformStateXToCenterSelectedUser(
					scale,
					users,
					selectedUserIndex
				);
				const y = getTransformStateYToCenterSelectedUser(scale, selectedUser.y);
				setStageSmooth({ newStage: { x, y, scale }, stageRef });

				// shift others
				shiftOtherUsers({ selectedUserId, selectedUserIndex });
			}
		},
		[
			resetAvatarClick,
			selectedUser,
			users,
			setSelectedUser,
			setStageSmooth,
			shiftOtherUsers,
			stageRef,
		]
	);

	const clickTimeout = useRef<NodeJS.Timeout | null>(null);
	const CLICK_DELAY = 180;
	function handleStageClick(
		e: KonvaEventObject<PointerEvent, Node<NodeConfig>>
	) {
		const handleSingleClick = () => {
			resetAvatarClick();
		};

		const handleDoubleClick = () => {
			resetAvatarClick();

			setStageSmooth({
				newStage: {
					x: getStageXToCenterQueue(0.1),
					y: STAGE.initial.y,
					scale: 0.1,
				},
				stageRef,
			});
		};

		if (e.target === e.currentTarget) {
			if (clickTimeout.current) {
				clearTimeout(clickTimeout.current);
				clickTimeout.current = null;
				handleDoubleClick();
				return;
			}

			clickTimeout.current = setTimeout(() => {
				clickTimeout.current = null;
				handleSingleClick();
			}, CLICK_DELAY);
		}
	}

	return { handleStageClick, handleAvatarClick };
}
