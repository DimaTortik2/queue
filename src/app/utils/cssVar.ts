export const cssVar = (
	name: string,
	value: string | number | undefined,
	unit = 'px'
) => {
	if (value === undefined) return {};
	const finalValue = typeof value === 'number' ? `${value}${unit}` : value;
	return { [`--${name}`]: finalValue };
};

// Использование:
// style={{ ...cssVar('radius', 20), ...cssVar('gap', 10) }}
// className="rounded-[var(--radius)] gap-[var(--gap)]"

// нужно, чтобы можно было писать md: sm: и так далее в classname и чтобы можно было задать начальное значение через константу ( во второй аргумент в cssVar)
