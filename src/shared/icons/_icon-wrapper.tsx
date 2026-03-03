import type { CSSProperties, ReactNode } from 'react';
import { getDynamicSize } from '../../app/utils/get-dynamic-size';
import { cn } from '../../app/utils/cn';
import { cssVar } from '../../app/utils/cssVar';
import { COLORS } from '../../app/config/consts';

export interface IconProps {
	w?: number;
	h?: number;
	color?: string;
	hoverColor?: string;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
}

export function IconWrapper({
	children,
	w,
	h,
	color = COLORS.white,
	className,
	onClick,
	hoverColor = color,
}: IconProps) {
	const sizeProps = getDynamicSize(w, h);

	return (
		<div
			style={{
				...sizeProps.style,
				...cssVar('color', color),
				...cssVar('hcolor', hoverColor),
			}}
			onClick={onClick}
			className={cn(
				'flex items-center justify-center text-[var(--color)] hover:text-[var(--hcolor)]',
				sizeProps.className,
				className
			)}
		>
			{children}
		</div>
	);
}
