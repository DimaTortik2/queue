import TextareaAutosize, {
	type TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { SendIcon } from '../icons/send-icon';
import { COLORS } from '../../app/config/consts';
import { cn } from '../../app/utils/cn';
import { useState } from 'react';

interface IProps extends TextareaAutosizeProps {
	accentColor?: string;
	wrapperClassName?: string;
	wrapperStyle?: CSSPropertyRule;
	className?: string;
	onSend: (text: string) => void;
	maxLength?: number;
}

export function MessangerInput({
	accentColor = COLORS.thematic.switchUsers.input.border,
	maxLength = 200,
	onSend,
	className,
	wrapperClassName,
	wrapperStyle,
	...props
}: IProps) {
	const [text, setText] = useState<string>('');

	const lenght = text.length;
	const isEmpty = text.trim().length === 0;
	const isLimitExceeded = lenght > maxLength;

	return (
		<div className='flex flex-col gap-2'>
			<div className='w-full flex justify-between'>
				<p
					className={cn(
						'transition-opacity',
						isLimitExceeded ? 'opacity-0' : 'opacity-100'
					)}
				>
					Можно оставить пустой
				</p>
				<p
					className={cn(
						'transition-all',
						isEmpty ? 'opacity-0' : 'opacity-100'
					)}
					style={{ color: isLimitExceeded ? COLORS.red : undefined }}
				>
					{lenght} / {maxLength}
				</p>
			</div>
			<div
				className={cn(
					'border-3 rounded-3xl scrollbar-hide resize-none flex items-end transition-all',
					wrapperClassName
				)}
				style={{
					borderColor: isLimitExceeded ? COLORS.red : accentColor,
					...wrapperStyle,
				}}
			>
				<TextareaAutosize
					className={cn(
						'w-full resize-none bg-transparent text-base text-[#ffffff] placeholder:text-gray-400 outline-none px-5 py-2 scrollbar-hide text-[1rem]',
						className
					)}
					placeholder='Просьба...'
					value={text}
					onChange={e => setText(e.target.value)}
					minRows={1}
					maxRows={5}
					key={1}
					{...props}
				/>
				<SendIcon
					onClick={() => onSend(text)}
					className={cn('mx-4 h-[1.5em] w-[1.5em] mb-2 cursor-pointer')}
					color={isLimitExceeded ? COLORS.red : COLORS.icon.passive}
				/>
			</div>
		</div>
	);
}
