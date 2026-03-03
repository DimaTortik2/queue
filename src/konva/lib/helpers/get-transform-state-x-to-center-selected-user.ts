import { AVATAR } from '../../../app/config/consts';

export const getTransformStateXToCenterSelectedUser = (
	scale: number,
	selectedUserIndex: number
) => {
	const isLeft = selectedUserIndex % 2 === 0;

	const avatarMarginX = AVATAR.select.margin.x;

	const shiftToLeftX = isLeft
		? scale * AVATAR.initial.x - avatarMarginX - (AVATAR.radius / 2) * scale
		: scale * AVATAR.initial.x +
		  AVATAR.initial.space.x * scale +
		  avatarMarginX -
		  window.innerWidth +
		  (AVATAR.radius / 2) * scale;

	return -shiftToLeftX;
};
