import type { CSSProperties } from 'react';

export const getDynamicSize = (
	w?: number | string,
	h?: number | string,
	defaultSize = 30
) => {
	// Превращаем число в пиксели, а undefined в дефолт
	const format = (val?: number | string) => {
		if (val === undefined) return `${defaultSize}px`;
		return typeof val === 'number' ? `${val}px` : val;
	};

	return {
		// Формируем объект стилей с переменными
		style: {
			'--w': format(w),
			'--h': format(h),
		} as CSSProperties & { '--w': string; '--h': string },

		// tailwind когда это заметит - создаст css классы эти
		className: 'w-[var(--w)] h-[var(--h)]',
	};
};
