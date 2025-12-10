import { useMemo } from 'react';
import type { ILine, IUser, IUserDataElement } from '../interfaces';
import { AVATAR, USERS_COUNT_TEMP } from '../../../app/config/consts';


const avatars = import.meta.glob('../../../assets/avatars/*.png', {
	eager: true,
	query: { format: 'webp', quality: 10 },
	import: 'default',
});

console.log('avatars :', avatars);

export function useInitializeData() {
	// С Бэкэнда

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
			const fileName = `../../../assets/avatars/${i}.png`;

			// Если картинки нет, ставим заглушку
			const imgSrc =
				avatars[fileName] || avatars['../../../assets/avatars/default.png'];

			userData.push({
				avaSrc: imgSrc as string,
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
