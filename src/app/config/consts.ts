import { getStageXToCenterQueue } from '../../konva/lib/helpers/get-stage-x-to-center-queue';

export const USERS_COUNT_TEMP = 30;
export const USER_ID_TEMP = 2;

export const DEVICE = {
	isMobile: window.innerWidth < 660,
	isTablet: window.innerWidth >= 660 && window.innerWidth <= 1250,
	isPc: window.innerWidth > 1250,
};

const DEFAULT_MULTS = {
	avatar: {
		selected: {
			scale: 1,
			margin: {
				x: 1,
			},
		},
	},
	stage: {
		initial: {
			scale: 1,
			y: 1,
		},
	},
};
const MULTS: typeof DEFAULT_MULTS = (() => {
	if (DEVICE.isMobile) {
		return (() => {
			const initialStageScale = 0.125;
			return {
				avatar: {
					selected: {
						scale: initialStageScale * 12.8,
						margin: {
							x: 0.75,
						},
					},
				},
				stage: {
					initial: {
						scale: initialStageScale,
						y: 0.5,
					},
				},
			};
		})();
	} else if (DEVICE.isTablet) {
		return (() => {
			const initialStageScale = 0.125;

			return {
				avatar: {
					selected: {
						scale: initialStageScale * 17,
						margin: {
							x: 3,
						},
					},
				},
				stage: {
					initial: {
						scale: initialStageScale,
						y: 1,
					},
				},
			};
		})();
	} else if (DEVICE.isPc) {
		return (() => {
			const initialStageScale = 0.25;

			return {
				avatar: {
					selected: {
						scale: initialStageScale * 7.2,
						margin: {
							x: 2.5,
						},
					},
				},
				stage: {
					initial: {
						scale: initialStageScale,
						y: 1,
					},
				},
			};
		})();
	}

	return DEFAULT_MULTS;
})();

export const AVATAR = (() => {
	const selectedScale =
		1 * MULTS.stage.initial.scale * MULTS.avatar.selected.scale;

	const radius = 250;

	return {
		radius,
		initial: {
			x: 0,
			y: 0,
			space: {
				x: 900,
				y: 550,
			},
		},

		select: {
			scale: selectedScale,
			margin: {
				x: selectedScale * radius * MULTS.avatar.selected.margin.x,
			},
		},
	};
})();

export const STAGE = (() => {
	const initScale = 1 * MULTS.stage.initial.scale;

	return {
		initial: {
			scale: initScale,
			x: getStageXToCenterQueue(initScale),
			y: AVATAR.radius * MULTS.stage.initial.y,
		},
		maxScale: 1.5,
		minScale: 0.04,
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
	minSize: {
		userPopUp: {
			width: 900,
			height: 430,
		},
		userPopUpButton: {
			height: 150,
		},
	},
};


export const MAX =  {
	userName : {
		first : 7,
		second : 9,	
	}
}