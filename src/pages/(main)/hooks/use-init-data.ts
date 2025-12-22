import { useMemo } from 'react';
import type { ILine, IUser, IUserDataElement } from '../interfaces';
import { AVATAR, USERS_COUNT_TEMP } from '../../../app/config/consts';
import { useSetAtom } from 'jotai';
import { currentUserAtom } from '../../../app/strore/atoms';

const avatars = import.meta.glob('../../../assets/avatars/*.png', {
	eager: true,
	query: {
		format: 'webp',
		w: 250,
		h: 250,
		fit: 'cover',
		quality: 80,
	},
	import: 'default',
});

export function useInitializeData() {
	// С Бэкэнда

	const setCurrentUser = useSetAtom(currentUserAtom);

	const userData = useMemo(() => {
		const UNIQUE_NAMES = [
			'Иван Петров',
			'Мария Смирнова',
			'Алексей Кузнецов',
			'Елена Волкова',
			'Дмитрий Павлов',
			'Ольга Николаева',
			'Сергей Фёдоров',
			'Татьяна Морозова',
			'Андрей Козлов',
			'Наталья Соколова',
			'Михаил Зайцев',
			'Екатерина Лебедева',
			'Павел Антонов',
			'Анна Борисова',
			'Владимир Семенов',
			'Дарья Егорова',
			'Игорь Орлов',
			'Ксения Жукова',
			'Георгий Белов',
			'Людмила Новикова',
			'Денис Киселев',
			'Светлана Макарова',
			'Виктор Карпов',
			'Юлия Виноградова',
			'Глеб Ковалев',
			'Вера Тихомирова',
			'Артем Медведев',
			'Жанна Родионова',
			'Максим Поляков',
			'Надежда Цветкова',
		];

		const userData: IUserDataElement[] = [];
		for (let i = 0; i < USERS_COUNT_TEMP; i++) {
			const fileName = AVATAR.rootPath + `${i + 2}.png`;

			// Если картинки нет, ставим заглушку
			const imgSrc = (avatars[fileName] ||
				avatars[AVATAR.rootPath + 'default-icon.png']) as string;

			userData.push({
				imgSrc: imgSrc,
				name: UNIQUE_NAMES[i],
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
					imgSrc: user.imgSrc,
					name: user.name,
					id: user.id,
					position: i + 1,
				};
			}),
		[userData]
	);

	setCurrentUser(initialUsers[2]);

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
