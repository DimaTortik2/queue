import TextareaAutosize, {
	type TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { SendIcon } from '../../icons/send-icon';
import { COLORS } from '../../../app/config/consts';
import { cn } from '../../../app/utils/cn';
import { type ReactNode } from 'react';
import { DangerIcon } from '../../icons/danger-icon';
import { useMessangerInput } from './hooks/use-messanger-input';
import { setOpacity } from './helpers/set-opacity';

interface IProps extends TextareaAutosizeProps {
	accentColor?: string;
	wrapperClassName?: string;
	wrapperStyle?: CSSPropertyRule;
	className?: string;
	onSend: (text: string) => void;
	maxLength?: number;
	limitColor?: string;
	limitIcon?: ReactNode;
	placeHolder?: string;
	selectionAccentColor?: string;
	selectionLimitColor?: string;
	sendIconColor?: string;
	sendIconColorHover?: string;
	defaultValue?: string;
}

export function MessangerInput({
	accentColor = COLORS.thematic.switchUsers.input.border,
	maxLength,
	onSend,
	className,
	wrapperClassName,
	wrapperStyle,
	limitColor = COLORS.red,
	limitIcon = <DangerIcon />,
	sendIconColor = COLORS.icon.passive,
	sendIconColorHover = COLORS.icon.active,
	placeHolder,
	selectionAccentColor = setOpacity(accentColor, 0.5),
	selectionLimitColor = setOpacity(limitColor, 0.5),
	defaultValue,
	...props
}: IProps) {
	const {
		handleInput,
		isEmpty,
		isLimitExceeded,
		limitIconComponent,
		lenght,
		text,
		handleKeyDown,
	} = useMessangerInput(limitIcon, maxLength, limitColor, onSend, defaultValue);

	return (
		<>
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
					{maxLength && (
						<p
							className={cn(
								'transition-all',
								isEmpty ? 'opacity-0' : 'opacity-100'
							)}
							style={{ color: isLimitExceeded ? limitColor : undefined }}
						>
							{lenght} / {maxLength}
						</p>
					)}
				</div>
				<div
					className={cn(
						'border-3 rounded-3xl scrollbar-hide resize-none flex items-end transition-all',
						wrapperClassName
					)}
					style={{
						borderColor: isLimitExceeded ? limitColor : accentColor,
						...wrapperStyle,
					}}
				>
					<TextareaAutosize
						className={cn(
							'w-full resize-none bg-transparent text-base text-[#ffffff]  outline-none pl-5 py-2 scrollbar-hide text-[1rem] custom-selection placeholder:text-[#ffffff] placeholder:opacity-25',
							className
						)}
						placeholder={placeHolder}
						value={text}
						onKeyDown={handleKeyDown}
						onChange={handleInput}
						minRows={1}
						maxRows={5}
						key={1}
						{...props}
					/>
					{isLimitExceeded ? (
						limitIconComponent
					) : (
						<SendIcon
							onClick={() => onSend(text)}
							className={cn('mx-4 h-[1.5em] w-[1.5em] mb-2 cursor-pointer')}
							color={sendIconColor}
							hoverColor={sendIconColorHover}
						/>
					)}
				</div>
			</div>
			<style>
				{`
        .custom-selection::selection {
          background-color: ${
						isLimitExceeded ? selectionLimitColor : selectionAccentColor
					};
          color: white;
        }
      `}
			</style>
		</>
	);
}
