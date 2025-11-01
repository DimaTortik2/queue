export const USERS_COUNT_TEMP = 30;

export const STAGE = {
	initial: {
		scale: 0.25,
	},
	maxScale: 1.5,
	minScale: 0.04,
};

export const AVATAR = {
	radius: 50,
	initial: {
		x: 0,
		y: 0,
		space: {
			x: 900,
			y: 550,
		},
	},
};

function createDEVICE() {
	const selectedMobileScale = STAGE.initial.scale * 0.9;
	const selectedPcScale = STAGE.initial.scale * 2;

	return {
		isMobile: window.innerWidth < 660,

		mobile: {
			selectedScale: selectedMobileScale,
			selectedMargin: {
				x: selectedMobileScale * AVATAR.radius * 6,
			},
		},
		pc: {
			selectedScale: selectedPcScale,
			selectedMargin: {
				x: selectedPcScale * AVATAR.radius * 13,
			},
		},
	};
}
export const DEVICE = createDEVICE();
