import { useLayoutEffect } from 'react';
import { RAW_COLORS } from '../config/theme';

export function useSetColors() {
	const cssVariables = Object.entries(RAW_COLORS).reduce(
		(acc, [key, value]) => {
			const varName = `--${key.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}`;
			acc[varName] = value;
			return acc;
		},
		{} as Record<string, string>,
	);
	useLayoutEffect(() => {
		const root = document.body.parentElement;
		if (!root) return;

		Object.entries(cssVariables).forEach(([prop, val]) => {
			root.style.setProperty(prop, val);
		});

		return () => {
			Object.keys(cssVariables).forEach(prop =>
				root.style.removeProperty(prop),
			);
		};
	}, [cssVariables]);
}
