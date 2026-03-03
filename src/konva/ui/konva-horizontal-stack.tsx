import { Group } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import React from 'react';

interface IProps extends KonvaProps {
	gap?: number;
}

export function KonvaHorizontalStack({ x, y, children, gap = 5 }: IProps) {
	let currX = 0;

	return (
		<Group x={x} y={y}>
			{React.Children.map(children, child => {
				if (!React.isValidElement(child)) return child;

				const childProps = child.props as {
					fontSize?: number;
					width?: number;
					widthInStack?: number;
					marginRight?: number;
				};
				const childW =
					childProps.widthInStack ||
					childProps.width ||
					childProps.fontSize ||
					15;

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const styledChild = React.cloneElement(child, { x: currX } as any);

				const mr = childProps.marginRight || 0;
				currX += childW + gap + mr;

				return styledChild;
			})}
		</Group>
	);
}
