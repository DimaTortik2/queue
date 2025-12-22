export function setOpacity(color: string, newOpacity: number): string {
	let hex = color.replace('#', '');

	if (hex.length === 3) {
		hex = hex
			.split('')
			.map(char => char + char)
			.join('');
	}

	if (hex.length === 8) {
		hex = hex.slice(0, 6);
	}

	const opacity = Math.min(Math.max(newOpacity, 0), 1);

	const alphaHex = Math.round(opacity * 255)
		.toString(16)
		.padStart(2, '0');

	return `#${hex}${alphaHex}`;
}
