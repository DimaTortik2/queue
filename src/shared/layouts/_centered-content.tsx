import type { ReactNode } from 'react';
import { clsx } from 'clsx';

export function CenteredContent({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={clsx(
				'w-screen h-screen flex flex-col items-center justify-center',
				className
			)}
		>
			{children}
		</div>
	);
}
