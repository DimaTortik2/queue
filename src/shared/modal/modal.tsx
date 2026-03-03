import React, {
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Drawer } from 'vaul';

import { useMediaQuery } from '../../app/hooks/useMediaQuerry';
import { cn } from '../../app/utils/cn';

const ModalContext = React.createContext<{ isDesktop: boolean } | null>(null);

const useModalContext = () => {
	const context = React.useContext(ModalContext);
	if (!context) {
		throw new Error('Modal components must be used within a Modal.Root');
	}
	return context;
};

interface RootProps {
	variant?: 'auto' | 'modal' | 'drawer';
	children: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	snapPoints?: (number | string)[];
	activeSnapPoint?: number | string | null;
	setActiveSnapPoint?: Dispatch<SetStateAction<string | number | null>>;
}

function Root({
	children,
	variant = 'auto',
	open: externalOpen,
	onOpenChange: externalOnOpenChange,
	...props
}: RootProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const Component =
		variant === 'modal' || (variant === 'auto' && isDesktop)
			? Dialog.Root
			: Drawer.Root;

	const [internalOpen, setInternalOpen] = useState(false);

	const isControlled = externalOpen !== undefined;

	const isOpen = isControlled ? externalOpen : internalOpen;

	const handleOpenChange = useCallback(
		(val: boolean) => {
			if (!isControlled) {
				setInternalOpen(val);
			}
			externalOnOpenChange?.(val);
		},
		[isControlled, externalOnOpenChange],
	);

	return (
		<ModalContext.Provider value={{ isDesktop }}>
			<Component open={isOpen} onOpenChange={handleOpenChange} {...props}>
				{children}
			</Component>
		</ModalContext.Provider>
	);
}

function Trigger({
	children,
	...props
}: React.ComponentProps<typeof Dialog.Trigger>) {
	const { isDesktop } = useModalContext();

	const Component = isDesktop ? Dialog.Trigger : Drawer.Trigger;

	return <Component {...props}>{children}</Component>;
}

interface ContentProps extends React.ComponentProps<typeof Dialog.Content> {
	children: React.ReactNode;
	className?: string;
	overlayClassName?: string;
	handlerClassName?: string; // Для полосочки на мобилке
}

const Content = forwardRef<HTMLDivElement, ContentProps>(
	(
		{ children, className, overlayClassName, handlerClassName, ...props },
		ref,
	) => {
		const { isDesktop } = useModalContext();

		if (isDesktop) {
			return (
				<Dialog.Portal>
					<Dialog.Overlay
						className={cn(
							'fixed inset-0 z-998 bg-[#000000A4] transition-all',
							'data-[state=closed]:animate-out data-[state=open]:animate-in',
							'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
							'duration-300',
							overlayClassName,
						)}
					/>
					<Dialog.Content
						ref={ref}
						className={cn(
							'fixed top-1/2 left-1/2 z-999 flex max-h-[85vh] w-[90vw] max-w-200 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-md bg-primary p-0.5 text-primary-fg',
							'data-[state=closed]:animate-out data-[state=open]:animate-in',
							'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
							'duration-300',
							className,
						)}
						{...props}
					>
						{children}
					</Dialog.Content>
				</Dialog.Portal>
			);
		}

		return (
			<Drawer.Portal>
				<Drawer.Overlay
					className={cn('fixed inset-0 z-998 bg-[#000000A4]', overlayClassName)}
				/>
				<Drawer.Content
					className={cn(
						'fixed right-0 bottom-0 left-0 z-999 mt-24 flex h-fit max-h-[90vh] flex-col rounded-t-[10px] bg-primary text-primary-fg outline-none',
						className,
					)}
					{...props}
				>
					<div className='scroll flex flex-1 flex-col overflow-y-auto rounded-t-[10px] p-0.5 pt-4'>
						<div
							aria-hidden
							className={cn(
								'mx-auto h-1.5 w-12 shrink-0 rounded-full',
								handlerClassName || 'bg-[#d1d5dc]',
							)}
						/>
						{children}
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		);
	},
);

function Title({
	children,
	...props
}: React.ComponentProps<typeof Dialog.Title>) {
	const { isDesktop } = useModalContext();

	const Component = isDesktop ? Dialog.Title : Drawer.Title;
	return <Component {...props}>{children}</Component>;
}

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
	withShadows?: boolean;
}

function Body({
	children,
	className,
	withShadows = false,
	...props
}: BodyProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;

		const handleScroll = () => {
			if (withShadows) {
				const isAtTop = el.scrollTop === 0;
				// Используем небольшой допуск (1px) для точности на разных экранах
				const isAtBottom =
					Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) <= 1;

				// Меняем переменные напрямую в DOM для максимальной производительности
				el.style.setProperty('--mask-top', isAtTop ? 'black' : 'transparent');
				el.style.setProperty(
					'--mask-bottom',
					isAtBottom ? 'black' : 'transparent',
				);
			}
		};

		// Вызываем один раз при загрузке, чтобы выставить правильное состояние
		handleScroll();

		el.addEventListener('scroll', handleScroll);
		return () => el.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			ref={scrollRef}
			className={cn(
				'flex flex-1 flex-col overflow-y-auto pt-0',
				withShadows && 'scroll-shadows',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

function Description({
	className,
	...props
}: React.ComponentProps<typeof Dialog.Description>) {
	const { isDesktop } = useModalContext();
	const Component = isDesktop ? Dialog.Description : Drawer.Description;

	return (
		<Component className={cn('text-sm text-muted-fg', className)} {...props} />
	);
}

function Close({
	className,
	children,
	...props
}: React.ComponentProps<typeof Dialog.Close>) {
	const { isDesktop } = useModalContext();
	const Component = isDesktop ? Dialog.Close : Drawer.Close;

	return (
		<Component className={className} {...props}>
			{children}
		</Component>
	);
}

export const Modal = {
	Root,
	Trigger,
	Content,
	Title,
	Description,
	Close,
	Body,
};
