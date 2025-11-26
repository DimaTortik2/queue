import { Group } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import React from 'react';

interface IProps extends KonvaProps {
	gap?: number;
}

export function KonvaVerticalStack({ x, y, children, gap = 5 }: IProps) {
	let currY = 0;

	return (
		<Group x={x} y={y}>
			{React.Children.map(children, child => {
				if (!React.isValidElement(child)) return child;

				const childProps = child.props as {
					fontSize?: number;
					height?: number;
					heightInStack?: number;
					marginBottom?: number;
				};
				const childH =
					childProps.heightInStack ||
					childProps.height ||
					childProps.fontSize ||
					15;

				const styledChild = React.cloneElement(child, { y: currY } as any);

				const mb = childProps.marginBottom || 0;
				currY += childH + gap + mb;

				return styledChild;
			})}
		</Group>
	);
}
