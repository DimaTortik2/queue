import type { ReactNode } from 'react';

export interface IconProps {
	w?: number;
	h?: number;
	color?: string;
	children?: ReactNode;
}

export function IconWrapper({
	children,
	h = 30,
	w = 30,
	color = '#000000',
}: IconProps) {
	return (
		<div
			style={{
				height: h,
				width: w,
				color: color,
			}}
		>
			{children}
		</div>
	);
}
