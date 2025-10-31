import { useAtom } from 'jotai';
import { CONSTS } from '../consts';
import { selectedUserAtom } from '../../../app/strore/atoms';
import type { IStage, IUser } from '../interfaces';
import { getTransformStateYToCenterSelectedUser } from '../helpers/get-transform-state-y-to-center-selected-user';
import type { Stage } from 'konva/lib/Stage';

interface IProps {
	users: IUser[];
	shiftOtherUsers: (idAndIndex: {
		selectedUserId: IUser['id'];
		selectedUserIndex: number;
	}) => void;
	resetUserData: () => void;
	initailWrapperX: number;
	setStage: React.Dispatch<React.SetStateAction<IStage>>;
	stageRef: React.RefObject<Stage | null>;
	zoomTo: (stage: IStage) => void;
}

export function useUserClick({
	resetUserData,
	shiftOtherUsers,
	users,
	initailWrapperX,
	setStage,
	stageRef,
	zoomTo,
}: IProps) {
	const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

	const resetUserClick = () => {
		if (selectedUser !== null) {
			// unzoom

			const newStage = {
				x: initailWrapperX * CONSTS.initialScale,
				y: getTransformStateYToCenterSelectedUser(
					CONSTS.initialScale,
					selectedUser.y
				),
				scale: CONSTS.initialScale,
			};

			zoomTo(newStage);

			setStage(() => newStage);

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

		if (selectedUser === null) {
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
				? scale * users[0].x -
				  window.innerWidth * 0.02 -
				  (CONSTS.avatarSize / 2) * scale
				: scale * users[1].x +
				  window.innerWidth * 0.02 -
				  window.innerWidth +
				  (CONSTS.avatarSize / 2) * scale;

			const shiftToCenterY = getTransformStateYToCenterSelectedUser(
				scale,
				selectedUser.y
			);

			const x = -shiftToLeftX;

			const y = shiftToCenterY;

			const newStage = {
				x,
				y,
				scale,
			};

			zoomTo(newStage);

			setStage(() => newStage);

			// shift others
			shiftOtherUsers({ selectedUserId, selectedUserIndex });
		}
	};

	return { handleUserClick, resetUserClick };
}
