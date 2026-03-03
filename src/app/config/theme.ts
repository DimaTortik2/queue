export const RAW_COLORS = {
	bg: '0, 0%, 13%',
	fg: '0, 0%, 100%',

	neutral: '0, 0%, 100%',
	neutralFg: '0, 0%, 13%',

	mutedFg: '0, 0%, 46%',

	overlay: '0, 0%, 15%',

	switch: '262, 74%, 64%',
	switchFg: '0, 0%, 100%',

	exit: '0, 100%, 70%',
	exitFg: '0, 0%, 100%',

	saveSeat: '210, 100%, 66%',
	saveSeatFg: '0, 0%, 100%',

	inCharge: '57, 100%, 77%',
	inChargeFg: '0, 0%, 13%',

	accept: '128, 36%, 30%',
	acceptFg: '0, 0%, 100%',

	renaming: '0, 0%, 56%',
	renamingFg: '0, 0%, 13%',
} as const;

export function getColor(key: keyof typeof RAW_COLORS): string {
	return `hsl(${RAW_COLORS[key]})`;
}

export function getColorAlpha(
	key: keyof typeof RAW_COLORS,
	alpha: number,
): string {
	return `hsla(${RAW_COLORS[key]}, ${alpha})`;
}
