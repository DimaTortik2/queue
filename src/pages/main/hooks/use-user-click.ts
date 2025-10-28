import { useEffect, useRef, useState } from 'react';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { useAtom } from 'jotai';
import { CONSTS } from '../consts';
import { selectedUserAtom } from '../../../app/strore/atoms';
import type { ITransformState, IUser } from '../interfaces';
import { getTransformStateYToCenterSelectedUser } from '../helpers/get-transform-state-y-to-center-selected-user';

interface IProps {
	users: IUser[];
	shiftOtherUsers: (idAndIndex: {
		selectedUserId: IUser['id'];
		selectedUserIndex: number;
	}) => void;
	resetUserData: () => void;
	initailWrapperX: number;
	initionalTransformState: ITransformState;
}

export function useUserClick({
	resetUserData,
	shiftOtherUsers,
	users,
	initailWrapperX,
	initionalTransformState,
}: IProps) {
	const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

	const canvasRef = useRef<ReactZoomPanPinchContentRef>(null);

	const [transformState, setTransformState] = useState<ITransformState>(
		initionalTransformState
	);

	useEffect(() => {
		if (!canvasRef) return;

		canvasRef.current?.setTransform(
			transformState.x,
			transformState.y,
			transformState.scale
		);
	}, [transformState]);

	const resetUserClick = () => {
		if (selectedUser !== null) {
			// unzoom

			setTransformState({
				x: initailWrapperX * CONSTS.initialScale,
				y: getTransformStateYToCenterSelectedUser(
					CONSTS.initialScale,
					selectedUser.top
				),
				scale: CONSTS.initialScale,
			});
			resetUserData();

			setSelectedUser(null);
		}
	};

	const handleUserClick = ({
		selectedUserId,
		selectedUserIndex,
	}: {
		selectedUserId: IUser['id'];
		selectedUserIndex: number;
	}) => {
		// reset if toggled
		resetUserClick();

		const selectedUser = users[selectedUserIndex];

		// set current user
		setSelectedUser(selectedUser);

		// zoom to User
		const isMobile = window.innerWidth < 660;
		const isLeft = selectedUserIndex % 2 === 0;
		const scale = isMobile
			? CONSTS.initialScale * 0.9
			: CONSTS.initialScale * 2;

		const shiftToLeftX = isLeft
			? scale * users[0].left - window.innerWidth * 0.02
			: scale * users[1].left +
			  window.innerWidth * 0.02 -
			  window.innerWidth +
			  CONSTS.avatarSize * scale;

		const shiftToCenterY = getTransformStateYToCenterSelectedUser(
			scale,
			selectedUser.top
		);

		const x = -shiftToLeftX;

		const y = shiftToCenterY;

		setTransformState({
			x,
			y,
			scale,
		});

		// shift others
		shiftOtherUsers({ selectedUserId, selectedUserIndex });
	};

	return { handleUserClick, canvasRef, resetUserClick };
}
