import type { CSSProperties, ReactNode } from 'react';
import { getDynamicSize } from '../../app/utils/get-dynamic-size';
import { cn } from '../../app/utils/cn';

export interface IconProps {
	w?: number;
	h?: number;
	color?: string;
	children?: ReactNode;
	className?: string;
	style?: CSSProperties;
	onClick?: () => void;
}

export function IconWrapper({
	children,
	w,
	h,
	color,
	className,
	onClick,
}: IconProps) {
	const sizeProps = getDynamicSize(w, h);

	return (
		<div
			style={{ ...sizeProps.style, color }}
			onClick={onClick}
			className={cn(
				'flex items-center justify-center',
				className,
				sizeProps.className
			)}
		>
			{children}
		</div>
	);
}
