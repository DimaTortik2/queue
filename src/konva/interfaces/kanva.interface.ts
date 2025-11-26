import type { ReactNode } from 'react';

export interface KonvaProps {
	width?: number;
	height?: number;
	x?: number;
	y?: number;
	color?: string;
	bgColor?: string;
	paddingX?: number;
	paddingY?: number;
	padding?: number;
	fill?: string;
	cornerRadius?: number;
	children?: ReactNode;
	heightInStack?: number;
	marginBottom?: number;
}
