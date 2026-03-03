import React, { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import {cn} from '../../app/utils/cn'

// Типизируем иконку. LucideIcon - это тип из библиотеки, но мы поддерживаем и обычные FC<SVGProps>
type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: IconType; // Сама иконка как компонент
	label: string; // ОБЯЗАТЕЛЬНО для доступности (aria-label)
	size?: 'sm' | 'md' | 'lg';
	isActive?: boolean; // Например, если кнопка "нажата" (тогл)
	asChild?: boolean; // Если захотим превратить кнопку в ссылку (<a>)
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			icon: Icon,
			className,
			label,
			size = 'md',
			isActive = false,
			asChild = false,
			...props
		},
		ref,
	) => {
		// Если asChild=true, рендерим вложенный элемент, иначе button.
		// Это фишка Radix UI Slot, очень удобно, если кнопка должна быть ссылкой.
		// Если не хочешь тянуть Radix, просто оставь <button>.
		const Comp = asChild ? Slot : 'button';

		return (
			<Comp
				ref={ref}
				type='button'
				aria-label={label} // Читалка скажет "Закрыть", а не "кнопка"
				className={cn(
					// Базовые стили: флекс, центр, скругление, транзишн
					'focus-visible:ring-ring inline-flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus-visible:ring-2 focus-visible:outline-none',

					'bg-transparent ',

					// Активное состояние (если кнопка нажата/выбрана)
					isActive && 'bg-slate-100 text-slate-900',

					// Размеры (паддинги + размер иконки)
					size === 'sm' && 'h-8 w-8', // Иконка внутри подстроится
					size === 'md' && 'h-10 w-10',
					size === 'lg' && 'h-12 w-12',

					// Возможность переопределить всё снаружи
					className,
				)}
				{...props}
			>
				{/* Рендерим иконку. Размер задаем через классы или currentColor сам подтянется */}
				<Icon
					className={cn(
						size === 'sm' && 'h-4 w-4',
						size === 'md' && 'h-5 w-5',
						size === 'lg' && 'h-6 w-6',
					)}
				/>
			</Comp>
		);
	},
);

IconButton.displayName = 'IconButton';
