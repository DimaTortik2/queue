export const getTextWidth = (
	text: string,
	fontSize: number,
	fontFamily = 'Arial'
) => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (context) {
		context.font = `${fontSize}px ${fontFamily}`;
		return context.measureText(text).width;
	}
	return text.length * fontSize * 0.6; // Фоллбэк, если канвас недоступен
};
