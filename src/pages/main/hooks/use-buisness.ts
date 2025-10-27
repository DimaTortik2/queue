import { useState } from 'react';
import { avatarSize, userCount } from '../consts';
import type { IData, ILineData, IUserData } from '../interfaces';

export function useBuisness() {
	const data: IData[] = [];
	for (let i = 0; i < userCount; i++) {
		data.push({
			avaSrc: '/ava.png',
			id: i,
		});
	}

	const canvaHeight: number = 2000 + data.length * (avatarSize + 50);
	const canvaWidth: number = 10000;

	const initialUserData: IUserData = data.map((user, i) => {
		const isLeft = i % 2 == 0;
		return {
			left: isLeft ? 1600 : 2500,
			top: 700 + 550 * i,
			translateX: 0,
			translateY: 0,
			avaSrc: user.avaSrc,
			id: user.id,
		};
	});

	const [userData, setUserData] = useState<IUserData>(initialUserData);

	const initialLineData: ILineData = [];
	for (let i = 0; i < initialUserData.length - 1; i++) {
		const firstUserCoords = initialUserData[i];
		const secondUserCoords = initialUserData[i + 1];
		const halfAvatarSize = avatarSize / 2;

		initialLineData.push({
			x1: firstUserCoords.left + halfAvatarSize,
			y1: firstUserCoords.top + halfAvatarSize,
			x2: secondUserCoords.left + halfAvatarSize,
			y2: secondUserCoords.top + halfAvatarSize,
			id: firstUserCoords.id,
		});
	}

	const lineData: ILineData = [];
	for (let i = 0; i < userData.length - 1; i++) {
		const firstUserCoords = userData[i];
		const secondUserCoords = userData[i + 1];
		const halfAvatarSize = avatarSize / 2;

		lineData.push({
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
		selectedUserId: IData['id'];
		selectedUserIndex: number;
	}) => {
		const shiftY = window.innerHeight / 2;

		const newUserData = userData.map((user, i) => {
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

		setUserData(newUserData);
	};

	return {
		canvaHeight,
		canvaWidth,
		userData,
		lineData,
		shiftOtherUsers,
		initialLineData,
	};
}
