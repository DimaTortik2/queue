import { avatarSize, userCount } from "../consts";
import type { IData, ILineData, IUserData } from "../interfaces";

export function useBuisness() {
	const data: IData[] = [];
	for (let i = 0; i < userCount; i++) {
		data.push({
			avaSrc: '/ava.png',
			id: i,
		});
	}

	const userData: IUserData = data.map((user, i) => {
		const isLeft = i % 2 == 0;
		return {
			left: isLeft ? 1600 : 2500,
			top: 700 + 550 * i,
			avaSrc: user.avaSrc,
			id: i,
		};
	});

	const lineData: ILineData = [];
	for (let i = 0; i < userData.length - 1; i++) {
		const firstUserCoords = userData[i];
		const secondUserCoords = userData[i + 1];
		const halfAvatarSize = avatarSize / 2;

		lineData.push({
			x1: firstUserCoords.left + halfAvatarSize,
			y1: firstUserCoords.top + halfAvatarSize,
			x2: secondUserCoords.left + halfAvatarSize,
			y2: secondUserCoords.top + halfAvatarSize,
			id: firstUserCoords.id,
		});
	}

	const canvaHeight: number = 2000 + data.length * (avatarSize + 50);
	const canvaWidth: number = 10000;

	return {
		canvaHeight,
		canvaWidth,
		userData,
		lineData,
	};
}
