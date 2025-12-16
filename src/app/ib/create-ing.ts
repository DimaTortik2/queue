export function createImg(src: string) {
	const img = new Image();
	img.src = src;
	img.crossOrigin = 'Anonymous';
	return img;
}
