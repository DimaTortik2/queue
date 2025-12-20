import { COLORS } from '../../app/config/consts';
import { cn } from '../../app/utils/cn';

interface IProps {
	name?: string;
	position?: number;
	avatar?: HTMLImageElement;
	reflect?: boolean;
	className?: string;
}

export function UserDesc({
	className,
	avatar,
	name,
	position,
	reflect = false,
}: IProps) {
	return (
		<div
			className={cn(
				'flex gap-3 w-fit text-[24px]',
				reflect && 'flex-row-reverse',
				className
			)}
		>
			<img
				src={(avatar && avatar.src) || '../../assets/default-icon.png'}
				alt='Аватарка'
				className='border-[2px] rounded-full w-[5em] h-[5em]'
				style={{
					borderColor: COLORS.avatar.border.normal,
				}}
			/>

			<div className='flex flex-col justify-center h-[5em]'>
				<p
					style={{
						color: COLORS.text78,
					}}
					className={cn('text-[1.5em]', reflect && 'text-end')}
				>
					{name || 'Не пон'}
				</p>
				<p
					style={{ color: COLORS.text70 }}
					className={cn('text-[1.2em]', reflect && 'text-end')}
				>
					{'Место '}
					<span className='text-[1.3em]' style={{ color: COLORS.white }}>
						{position || 0}
					</span>
				</p>
			</div>
		</div>
	);
}
