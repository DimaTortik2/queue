import { COLORS } from '../../app/config/consts';
import './button.module.css';

type TVariant = 'blue' | 'red' | 'white' | 'purple' | 'green' | undefined;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: TVariant;
}

const getVariantStyles = (
	variant: TVariant
): {
	backgroundColor: string;
	color: string;
} => {
	const white = { backgroundColor: COLORS.white, color: COLORS.black };

	switch (variant) {
		case 'blue':
			return { backgroundColor: COLORS.blue, color: COLORS.white };
		case 'red':
			return { backgroundColor: COLORS.red, color: COLORS.white };
		case 'purple':
			return { backgroundColor: COLORS.purple, color: COLORS.white };
		case 'green':
			return { backgroundColor: COLORS.green, color: COLORS.white };
		case 'white':
			return white;
		default: {
			return white;
		}
	}
};

export function Button({ variant, style, ...props }: IProps) {
	return (
		<button
			className='px-[1em] py-[0.5em] rounded-2xl hover:scale-105 transition-transform cursor-pointer'
			style={{ ...getVariantStyles(variant), ...style }}
			{...props}
		/>
	);
}
