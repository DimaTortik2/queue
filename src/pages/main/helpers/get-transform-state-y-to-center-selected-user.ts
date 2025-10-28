import { CONSTS } from '../consts';

export const getTransformStateYToCenterSelectedUser = (
	scale: number,
	selectedUserTop: number
) => {
	return (
		-(selectedUserTop -
			(window.innerHeight / 2 / scale - CONSTS.avatarSize / 2)) *
		scale
	);
};
