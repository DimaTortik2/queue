import { getStageXToCenterQueue } from '../../konva/lib/helpers/get-stage-x-to-center-queue';

export const USERS_COUNT_TEMP = 30;
export const USER_ID_TEMP = 2;

export const AVATAR = {
	radius: 250,
	initial: {
		x: 0,
		y: 0,
		space: {
			x: 900,
			y: 550,
		},
	},
};

export const STAGE = (() => {
	const initScale = 0.25;

	return {
		initial: {
			scale: initScale,
			x: getStageXToCenterQueue(initScale),
			y: AVATAR.radius,
		},
		maxScale: 1.5,
		minScale: 0.04,
	};
})();

export const DEVICE = (() => {
	const selectedMobileScale = STAGE.initial.scale * 0.9;
	const selectedPcScale = STAGE.initial.scale * 2;

	return {
		isMobile: window.innerWidth < 660,

		mobile: {
			selectedScale: selectedMobileScale,
			selectedMargin: {
				x: selectedMobileScale * AVATAR.radius * 0.75,
			},
		},
		pc: {
			selectedScale: selectedPcScale,
			selectedMargin: {
				x: selectedPcScale * AVATAR.radius * 2.5,
			},
		},
	};
})();

export const COLORS = {
	text: '#FFFFFF',
	text78: '#ffffffd0',
	text70: '#ffffffb9',
	bg: {
		leave: '#A64F4F',
	},
};

export const KONVA = {
	font: {
		size: 120,
	},
	size: {
		userPopUp: {
			width: 900,
			height: 430,
		},
		userPopUpButton: {
			height: 150,
		},
	},
};
