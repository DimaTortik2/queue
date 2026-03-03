import { cn } from '../../app/utils/cn';
import './button.module.css';

type TVariant =
	| 'switch'
	| 'exit'
	| 'in-charge'
	| 'save'
	| 'accept'
	| 'neutral'
	| undefined;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: TVariant;
}

const getVariant = (variant: TVariant): string => {
	switch (variant) {
		case 'switch':
			return 'bg-switch text-switch-fg';
		case 'exit':
			return 'bg-exit text-exit-fg';

		case 'in-charge':
			return 'bg-in-charge text-in-charge-fg';

		case 'save':
			return 'bg-save text-save-fg';
		case 'accept':
			return 'bg-accept text-accept-fg';
		case 'neutral':
			return 'bg-neutral text-neutral-fg';
		default: {
			return 'bg-neutral text-neutral-fg';
		}
	}
};

export function Button({ variant, ...props }: IProps) {
	return (
		<button
			className={cn(
				'px-[1em] py-[0.5em] rounded-2xl hover:scale-105 transition-transform cursor-pointer',
				getVariant(variant),
			)}
			{...props}
		/>
	);
}
