import { AVATAR } from '../consts';

export function getStageXToCenterQueue(scale: number) {
	const queueWidth: number =
		AVATAR.initial.x + AVATAR.initial.space.x - AVATAR.initial.x;

	const initailWrapperX: number = (window.innerWidth / scale - queueWidth) / 2;

	return initailWrapperX * scale;
}
