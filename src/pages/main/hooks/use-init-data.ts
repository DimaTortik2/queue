import { useMemo } from 'react';
import type {
	ILine,
	IUser,
	IUserDataElement,
} from '../interfaces';
import { AVATAR, USERS_COUNT_TEMP } from '../../../app/config/consts';

export function useInitializeData() {
	// С Бэкэнда
	const userData = useMemo(() => {
		const userData: IUserDataElement[] = [];
		for (let i = 0; i < USERS_COUNT_TEMP; i++) {
			userData.push({
				avaSrc: '/ava.png',
				name: 'Дима',
				id: i,
			});
		}

		return userData;
	}, []);

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

	const initialLines: ILine[] = useMemo(() => {
		const initialLines: ILine[] = [];
		for (let i = 0; i < initialUsers.length - 1; i++) {
			const firstUserCoords = initialUsers[i];
			const secondUserCoords = initialUsers[i + 1];
			const lineId = firstUserCoords.id;

			initialLines.push({
				x1: firstUserCoords.x,
				y1: firstUserCoords.y,
				x2: secondUserCoords.x,
				y2: secondUserCoords.y,
				id: lineId,
			});
		}
		return initialLines;
	}, [initialUsers]);

	return {
		initialUsers,
		initialLines,
	};
}
