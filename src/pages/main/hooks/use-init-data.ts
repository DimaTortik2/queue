import { useMemo, useState } from 'react';
import type { ILine, IUser, IUserDataElement } from '../interfaces';
import { AVATAR, USERS_COUNT_TEMP } from '../../../app/config/consts';

export function useInitializeData() {
	// С Бэкэнда
	const userData: IUserDataElement[] = [];
	for (let i = 0; i < USERS_COUNT_TEMP; i++) {
		userData.push({
			avaSrc: '/ava.png',
			name: 'Дима',
			id: i,
		});
	}

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

	return {
		initialUsers,
		initialLines,
		users,
		lines,
		setUsers,
	};
}
