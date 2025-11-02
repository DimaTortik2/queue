import { useMemo, useRef, useState } from 'react';
import type { ILine, IStage, IUser, IUserDataElement } from '../interfaces';
import type { Stage } from 'konva/lib/Stage';
import { AVATAR, STAGE, USERS_COUNT_TEMP } from '../consts';
import { getStageXToCenterQueue } from '../helpers/get-stage-x-to-center-queue';

export function useBuisness() {
	const userData: IUserDataElement[] = [];
	for (let i = 0; i < USERS_COUNT_TEMP; i++) {
		userData.push({
			avaSrc: '/ava.png',
			name: 'Дима',
			id: i,
		});
	}

	const initailWrapperX: number = getStageXToCenterQueue(STAGE.initial.scale);
	const initailWrapperY: number = AVATAR.radius / STAGE.initial.scale;

	const initialUsers: IUser[] = useMemo(
		() =>
			userData.map((user, i) => {
				const isLeft = i % 2 == 0;
				return {
					x: isLeft
						? AVATAR.initial.x
						: AVATAR.initial.x + AVATAR.initial.space.x,
					y: AVATAR.initial.y + AVATAR.initial.space.y * i,
					avaSrc: user.avaSrc,
					name: user.name,
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
		scale: STAGE.initial.scale,
		x: initailWrapperX,
		y: initailWrapperY * STAGE.initial.scale,
	};

	const stageRef = useRef<Stage | null>(null);

	return {
		users,
		lines,
		shiftOtherUsers,
		initialLines,
		resetUserData,
		initailWrapperX,
		initailWrapperY,
		initionalStage,
		stageRef,
		initialUsers,
	};
}
