import type { ReactNode } from 'react';
import { Rect, Text, Group } from 'react-konva';
import type { IReactKonvaUiProps } from '../interfaces/kanva.interface';
import { COLORS, KONVA } from '../../app/config/consts';

interface IProps extends IReactKonvaUiProps {
	children?: ReactNode;
	onClick: () => void;
	fontSize?: number;
	cornerRadius?: number;
}

export function ButtonKanva({
	children,
	onClick,
	color,
	width,
	height,
	paddingLeft,
	paddingTop,
	x,
	y,
	localGroupX,
	localGroupY,
	bgColor,
	fontSize,
	cornerRadius,
}: IProps) {
	return (
		<Group
			x={x ? x : localGroupX}
			y={y ? y : localGroupY}
			onClick={onClick}
			onTap={onClick}
		>
			<Rect
				x={0}
				y={0}
				width={width}
				height={height}
				fill={bgColor}
				cornerRadius={cornerRadius ? cornerRadius : 0}
			/>
			<Text
				text={children ? String(children) : undefined}
				x={paddingLeft ? paddingLeft : 0}
				y={paddingTop ? paddingTop : 0}
				fontSize={fontSize ? fontSize : KONVA.font.size}
				fill={color ? color : COLORS.text}
				width={width}
				height={height}
				align='center'
				verticalAlign='middle'
				fontStyle='normal'
				listening={false}
			/>
		</Group>
	);
}
