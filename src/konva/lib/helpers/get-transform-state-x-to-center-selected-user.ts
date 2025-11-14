import { AVATAR, DEVICE } from '../../../app/config/consts';
import type { IUser } from '../../../pages/main/interfaces';

export const getTransformStateXToCenterSelectedUser = (
	scale: number,
	users: IUser[],
	selectedUserIndex: number
) => {
	const isLeft = selectedUserIndex % 2 === 0;

	const avatarMarginX = DEVICE.isMobile
		? DEVICE.mobile.selectedMargin.x
		: DEVICE.pc.selectedMargin.x;

	const shiftToLeftX = isLeft
		? scale * users[0].x - avatarMarginX - (AVATAR.radius / 2) * scale
		: scale * users[1].x +
		  avatarMarginX -
		  window.innerWidth +
		  (AVATAR.radius / 2) * scale;

	return -shiftToLeftX;
};
