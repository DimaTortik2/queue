import { useAtom } from 'jotai';
import { selectedUserAtom } from '../../../app/strore/atoms';
import type { ILine, IUser } from '../interfaces';
import type { Stage } from 'konva/lib/Stage';
import { useCallback, useEffect, useRef } from 'react';
import { AVATAR, DEVICE, STAGE } from '../../../app/config/consts';
import type { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';
import { setStageSmooth } from '../../../konva/lib/set-stage-smooth';
import { getTransformStateYToCenterSelectedUser } from '../../../konva/lib/helpers/get-transform-state-y-to-center-selected-user';
import { getTransformStateXToCenterSelectedUser } from '../../../konva/lib/helpers/get-transform-state-x-to-center-selected-user';
import { getStageXToCenterQueue } from '../../../konva/lib/helpers/get-stage-x-to-center-queue';
import Konva from 'konva';

interface IProps {
	initialUsers: IUser[];
	initialLines: ILine[];
	stageRef: React.RefObject<Stage | null>;
	avatarsRef: React.MutableRefObject<Record<IUser['id'], Konva.Group>>;
	linesRef: React.MutableRefObject<Record<ILine['id'], Konva.Line>>;
}

export function useUserClick({
	initialUsers,
	initialLines,
	stageRef,
	avatarsRef,
	linesRef,
}: IProps) {
	const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

	// Чисто для хака с useCallback
	const stateRef = useRef({
		selectedUser,
		initialUsers,
		avatarsRef,
		linesRef,
	});

	// Обновляем stateRef при каждом рендере
	// Чисто для хака с useCallback
	useEffect(() => {
		stateRef.current = {
			selectedUser,
			initialUsers,
			avatarsRef,
			linesRef,
		};
	});

	const shiftUsers = useCallback(
		({
			selectedUserId,
			selectedUserIndex,
		}: {
			selectedUserId: IUser['id'];
			selectedUserIndex: number;
		}) => {
			const { initialUsers, avatarsRef, linesRef } = stateRef.current;

			const shiftY = window.innerHeight / 2;

			initialUsers.forEach((u, i) => {
				const avatarNode: Konva.Group = avatarsRef.current[u.id];

				if (!avatarNode) return;

				let targetY = u.y;

				if (u.id === selectedUserId) {
					targetY = u.y;
				} else if (i < selectedUserIndex) {
					//Вверх
					targetY = u.y - shiftY;
				} else if (i > selectedUserIndex) {
					//Вниз
					targetY = u.y + shiftY;
				}

				avatarNode.to({
					y: targetY,
					duration: 0.3,
					easing: Konva.Easings.EaseInOut,
				});
			});

			initialLines.forEach((l, i) => {
				const lineNode: Konva.Line = linesRef.current[l.id];
				let targetPoints = [l.x1, l.y1, l.x2, l.y2];

				// у линнии индекс совпадает с индексом пользователя с верхнего её конца, так что:

				if (i === selectedUserIndex) {
					// линия ПОД выделенным пользователем
					targetPoints = [l.x1, l.y1, l.x2, l.y2 + shiftY];
				} else if (i === selectedUserIndex - 1) {
					// линия НАД выделенным пользователем
					targetPoints = [l.x1, l.y1 - shiftY, l.x2, l.y2];
				} else if (i > selectedUserIndex) {
					// линии ПОД линией ПОД выделенным пользователем
					targetPoints = [l.x1, l.y1 + shiftY, l.x2, l.y2 + shiftY];
				} else if (i < selectedUserIndex - 1) {
					// линии НАД линией НАД выделенным пользователем
					targetPoints = [l.x1, l.y1 - shiftY, l.x2, l.y2 - shiftY];
				}

				lineNode.to({
					duration: 0.3,
					points: targetPoints,
					easing: Konva.Easings.EaseInOut,
				});
			});
		},
		[]
	);

	const resetAvatarClick = useCallback(() => {
		const { selectedUser, initialUsers, avatarsRef } = stateRef.current;

		// если пользователь не выделен, то нечего и ресчетать
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

		initialUsers.forEach(u => {
			const avatarNode: Konva.Group = avatarsRef.current[u.id];
			if (!avatarNode) return;

			avatarNode.to({
				y: u.y,
				duration: 0.3,
				easing: Konva.Easings.EaseInOut,
			});
		});

		initialLines.forEach(l => {
			const lineNode: Konva.Line = linesRef.current[l.id];
			let targetPoints = [l.x1, l.y1, l.x2, l.y2];

			lineNode.to({
				duration: 0.3,
				points: targetPoints,
				easing: Konva.Easings.EaseInOut,
			});
		});

		setSelectedUser(null);
	}, []);

	const handleAvatarClick = useCallback(
		({
			selectedUserId,
			selectedUserIndex,
		}: {
			selectedUserId: IUser['id'];
			selectedUserIndex: number;
		}) => {
			if (!stageRef.current) return;
			const { selectedUser, initialUsers } = stateRef.current;

			// ресетать , если кликнули повторно
			if (selectedUser !== null) {
				resetAvatarClick();
			}

			if (selectedUser === null) {
				const selectedUser = initialUsers[selectedUserIndex];

				setSelectedUser({ ...selectedUser, position: selectedUserIndex + 1 });

				const scale = AVATAR.select.scale;

				const x = getTransformStateXToCenterSelectedUser(
					scale,
					selectedUserIndex
				);
				const y = getTransformStateYToCenterSelectedUser(scale, selectedUser.y);
				setStageSmooth({ newStage: { x, y, scale }, stageRef });

				// shift others
				shiftUsers({ selectedUserId, selectedUserIndex });
			}
		},
		[resetAvatarClick, setSelectedUser, setStageSmooth, shiftUsers, stageRef]
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
					x: getStageXToCenterQueue(STAGE.initial.scale),
					y: STAGE.initial.y,
					scale: STAGE.initial.scale,
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
