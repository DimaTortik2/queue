export const getTransformStateYToCenterSelectedUser = (
	scale: number,
	selectedUserTop: number
) => {
	return -(selectedUserTop * scale - window.innerHeight / 2);
};
