import { getStageXToCenterQueue } from '../../konva/lib/helpers/get-stage-x-to-center-queue';

export const USERS_COUNT_TEMP = 30;

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
						scale: initialStageScale * 11.5,
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
		border: {
			width: 17,
		},
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
		rootPath: '../../../assets/avatars/',
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
	blue: '#52A8FF',
	white: '#ffffff',
	red: '#FF6767',
	yellow: '#FFF98A',
	black: '#000000',
	purple: '#9261E7',
	green: '#41AF4E',
	text78: '#ffffffd0',
	text70: '#ffffffb9',
	text: {
		important: '#ffffffd0',
		unimportant: '#ffffffb9',
		ghost: '#FFFFFF0C',
	},

	icon: { passive: '#FFFFFF32', active: '#FFFFFF' },

	thematic: {
		switchUsers: {
			header: '#9261E779',
			border: '#9261E732',
			separator: '#9261E734',
			bgWrapper: '#05000da9',
		},
	},

	userActionButtons: {
		leave: {
			bg: {
				passive: '#A64F4F',
				active: '#FF6767',
			},
			text: '#FFFFFF',
		},
		exchange: {
			bg: {
				passive: '#9261E7',
				active: '#A779F7',
			},
			text: '#FFFFFF',
		},
	},
	avatar: {
		border: {
			normal: '#ffffff24',
			hover: '#ffffff52',
		},
	},
	line: '#ffffff06',

	modal: {
		bg: '#212121',
		title: '#ffffff47',
		separator: '#ffffff14',
		bgWrapper: '#00000094',
	},

	arrows: {
		up: '#41AF4E',
		down: '#FF6767',
	},
};

export const KONVA = {
	font: {
		size: 100,
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

export const MAX = {
	userName: {
		first: 6,
		second: 9,
	},
};
