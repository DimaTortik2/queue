import Konva from 'konva';
import { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import { Group, Rect } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';

interface IProps extends KonvaProps {
	centerY?: boolean;
	centerX?: boolean;
	EndX?: boolean;
}

export const KonvaDiv = forwardRef<Konva.Group, IProps>(
	(
		{
			children,
			x = 0,
			y = 0,
			paddingX = 0,
			paddingY = 0,
			cornerRadius = 0,
			fill,
			centerX,
			centerY,
			EndX,
		}: IProps,
		ref
	) => {
		const contentGroupRef = useRef<Konva.Group>(null);
		const [rectSize, setRectSize] = useState({ w: 0, h: 0 });
		let groupX = x;

		if (centerX) {
			groupX = x - rectSize.w / 2;
		} else if (EndX) {
			groupX = x - rectSize.w;
		}

		const groupY = centerY ? y - rectSize.h / 2 : y;

		useLayoutEffect(() => {
			const node = contentGroupRef.current;

			if (!node) return;

			const box = node.getClientRect({
				relativeTo: node.getParent() || undefined,
			});

			setRectSize({
				w: box.width + paddingX * 2,
				h: box.height + paddingY * 2,
			});
		}, [children, paddingX, paddingY]);

		return (
			<Group ref={ref} x={groupX} y={groupY}>
				<Rect
					width={rectSize.w}
					height={rectSize.h}
					cornerRadius={cornerRadius}
					fill={fill}
				/>

				<Group x={paddingX} y={paddingY} ref={contentGroupRef}>
					{children}
				</Group>
			</Group>
		);
	}
);
