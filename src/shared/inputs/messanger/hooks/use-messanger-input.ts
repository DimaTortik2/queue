import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { cn } from '../../../../app/utils/cn';

export function useMessangerInput(
	limitIcon: ReactNode,
	maxLength: number | undefined,
	limitColor: string,
	onSend: (text: string) => void,
	defaultValue: string | undefined
) {
	const [text, setText] = useState<string>(defaultValue || '');

	const lenght = text.length;
	const isEmpty = text.trim().length === 0;
	const isLimitExceeded = maxLength && lenght > maxLength;

	const handleInput:
		| React.ChangeEventHandler<HTMLTextAreaElement>
		| undefined = e => {
		const newTextLenght = e.target.value.length;

		if (maxLength !== undefined) {
			if (!(newTextLenght > maxLength + 1)) {
				setText(e.target.value);
			} else if (newTextLenght < text.length) {
				setText(e.target.value);
			} else {
				setText(e.target.value.slice(0, maxLength + 1));
			}
		} else {
			setText(e.target.value);
		}
	};

	const limitIconComponent: ReactNode = React.isValidElement(limitIcon)
		? React.cloneElement(limitIcon, {
				className: cn(
					'mx-4 h-[1.5em] w-[1.5em] mb-2',
					(limitIcon.props as { className: string | undefined }).className
				),
				color: limitColor,
		  } as React.HTMLAttributes<HTMLElement> | undefined)
		: limitIcon;

	const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = e => {
		if (e.code === 'Enter') {
			if (e.shiftKey || e.ctrlKey) {
				return;
			} else {
				e.preventDefault();
				onSend(text);
				setText('');
			}
		}
	};

	return {
		isEmpty,
		handleInput,
		limitIconComponent,
		isLimitExceeded,
		text,
		lenght,
		handleKeyDown,
	};
}
