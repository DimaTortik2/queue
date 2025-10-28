import { useState } from 'react';
import { CONSTS } from '../consts';
import type {
	ILine,
	ITransformState,
	IUser,
	IUserDataElement,
} from '../interfaces';

export function useBuisness() {
	const userData: IUserDataElement[] = [];
	for (let i = 0; i < CONSTS.userCount; i++) {
		userData.push({
			avaSrc: '/ava.png',
			id: i,
		});
	}

	const canvaHeight: number = 2000 + userData.length * (CONSTS.avatarSize + 50);
	const canvaWidth: number = 10000;

	const queueWidth: number =
		CONSTS.rightInitialAvatarMargin +
		CONSTS.avatarSize -
		CONSTS.leftInitialAvatarMargin;
	const windowLeftPadding: number =
		(window.innerWidth / CONSTS.initialScale - queueWidth) / 2;
	const initailWrapperX: number = -(
		CONSTS.leftInitialAvatarMargin - windowLeftPadding
	);

	const initailWrapperY: number = 0;

	const initialUsers: IUser[] = userData.map((user, i) => {
		const isLeft = i % 2 == 0;
		return {
			left: isLeft
				? CONSTS.leftInitialAvatarMargin
				: CONSTS.rightInitialAvatarMargin,
			top: CONSTS.topInitialAvatarMargin + CONSTS.initialdiffBetweenAvatars * i,
			translateX: 0,
			translateY: 0,
			avaSrc: user.avaSrc,
			id: user.id,
		};
	});

	const [users, setUsers] = useState<IUser[]>(initialUsers);

	const initialLines: ILine[] = [];
	for (let i = 0; i < initialUsers.length - 1; i++) {
		const firstUserCoords = initialUsers[i];
		const secondUserCoords = initialUsers[i + 1];
		const halfAvatarSize = CONSTS.avatarSize / 2;

		initialLines.push({
			x1: firstUserCoords.left + halfAvatarSize,
			y1: firstUserCoords.top + halfAvatarSize,
			x2: secondUserCoords.left + halfAvatarSize,
			y2: secondUserCoords.top + halfAvatarSize,
			id: firstUserCoords.id,
		});
	}

	const lines: ILine[] = [];
	for (let i = 0; i < users.length - 1; i++) {
		const firstUserCoords = users[i];
		const secondUserCoords = users[i + 1];
		const halfAvatarSize = CONSTS.avatarSize / 2;

		lines.push({
			x1: firstUserCoords.left + firstUserCoords.translateX + halfAvatarSize,
			y1: firstUserCoords.top + firstUserCoords.translateY + halfAvatarSize,
			x2: secondUserCoords.left + secondUserCoords.translateX + halfAvatarSize,
			y2: secondUserCoords.top + secondUserCoords.translateY + halfAvatarSize,
			id: firstUserCoords.id,
		});
	}

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
					return { ...user, translateY: user.translateY - shiftY };
				}
				// to below users
				else if (i > selectedUserIndex) {
					return { ...user, translateY: user.translateY + shiftY };
				}
			}
			return user;
		});

		setUsers(newUsers);
	};

	const resetUserData = () => {
		setUsers(initialUsers);
	};

	const initionalTransformState: ITransformState = {
		scale: CONSTS.initialScale,
		x: initailWrapperX * CONSTS.initialScale,
		y: initailWrapperY * CONSTS.initialScale,
	};

	return {
		canvaHeight,
		canvaWidth,
		users,
		lines,
		shiftOtherUsers,
		initialLines,
		resetUserData,
		initailWrapperX,
		initailWrapperY,
		initionalTransformState,
	};
}
