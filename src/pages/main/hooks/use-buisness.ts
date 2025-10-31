import { useMemo, useRef, useState } from 'react';
import { CONSTS } from '../consts';
import type { ILine, IStage, IUser, IUserDataElement } from '../interfaces';
import type { Stage } from 'konva/lib/Stage';

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
		CONSTS.rightInitialAvatarX - CONSTS.leftInitialAvatarX;
	const windowLeftPadding: number =
		(window.innerWidth / CONSTS.initialScale - queueWidth) / 2;
	const initailWrapperX: number = -(
		CONSTS.leftInitialAvatarX - windowLeftPadding
	);

	const initailWrapperY: number = 0;

	const initialUsers: IUser[] = useMemo(
		() =>
			userData.map((user, i) => {
				const isLeft = i % 2 == 0;
				return {
					x: isLeft ? CONSTS.leftInitialAvatarX : CONSTS.rightInitialAvatarX,
					y: CONSTS.initialAvatarY + CONSTS.initialdiffBetweenAvatars * i,
					avaSrc: user.avaSrc,
					id: user.id,
				};
			}),
		[userData]
	);

	const [users, setUsers] = useState<IUser[]>(initialUsers);

	const initialLines: ILine[] = useMemo(() => {
		const initialLines: ILine[] = [];
		for (let i = 0; i < initialUsers.length - 1; i++) {
			const firstUserCoords = initialUsers[i];
			const secondUserCoords = initialUsers[i + 1];

			initialLines.push({
				x1: firstUserCoords.x,
				y1: firstUserCoords.y,
				x2: secondUserCoords.x,
				y2: secondUserCoords.y,
				id: firstUserCoords.id,
			});
		}
		return initialLines;
	}, [initialUsers]);

	const lines: ILine[] = useMemo(() => {
		const lines: ILine[] = [];
		for (let i = 0; i < users.length - 1; i++) {
			const firstUserCoords = users[i];
			const secondUserCoords = users[i + 1];

			lines.push({
				x1: firstUserCoords.x,
				y1: firstUserCoords.y,
				x2: secondUserCoords.x,
				y2: secondUserCoords.y,
				id: firstUserCoords.id,
			});
		}
		return lines;
	}, [users]);

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

	const resetUserData = () => {
		setUsers(initialUsers);
	};

	//
	const initionalStage: IStage = {
		scale: CONSTS.initialScale,
		x: initailWrapperX * CONSTS.initialScale,
		y: initailWrapperY * CONSTS.initialScale,
	};

	const [stage, setStage] = useState<IStage>(initionalStage);

	const stageRef = useRef<Stage | null>(null);

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
		initionalStage,
		setStage,
		stage,
		stageRef,
	};
}
