import type { ReactNode } from 'react';
import React from 'react';

interface IProps {
	children: ReactNode;
	lineColor?: string;
	lineHeight?: number;
	className?: string;
	spaceBetween?: number;
}

export function RenderSections({
	children,
	lineColor = '#ffffff32',
	lineHeight = 2,
	spaceBetween = 0,
	className,
}: IProps) {
	const totalCount = React.Children.count(children);
	return (
		<div className={className}>
			{React.Children.map(children, (child, i) => {
				if (!React.isValidElement(child)) return child;
				const isLast = i === totalCount - 1;

				return (
					<div
						style={{
							paddingTop: spaceBetween,
							marginBottom: isLast ? spaceBetween : 0,
						}}
					>
						{child}
						{!isLast && (
							<div
								className='w-full rounded-full'
								style={{
									backgroundColor: lineColor,
									height: lineHeight,
									marginTop: spaceBetween,
								}}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
