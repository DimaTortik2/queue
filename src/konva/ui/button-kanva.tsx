import type { ReactNode } from 'react';
import { Text, Label, Tag } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import { COLORS, KONVA } from '../../app/config/consts';
import { UseAddHover } from '../lib/hooks/use-add-hover';

interface IProps extends KonvaProps {
	children?: ReactNode;
	onClick: () => void;
	fontSize?: number;
	cornerRadius?: number;
	colorHover?: string;
	bgColorHover?: string;
}

export function ButtonKanva({
	children,
	onClick,
	color = '#ffffff',
	bgColorHover = '#000000',
	padding,
	bgColor,
	fontSize,
	cornerRadius,
	...props
}: IProps) {
	const btnHoverProps = UseAddHover({
		initialColor: bgColor,
		colorHover: bgColorHover,
		scaleHover: 1.01,
	});

	return (
		<Label {...props} onClick={onClick} onTap={onClick}>
			<Tag
				{...btnHoverProps}
				fill={bgColor}
				cornerRadius={cornerRadius ? cornerRadius : 0}
			/>
			<Text
				text={children ? String(children) : ''}
				padding={padding || 5}
				fontSize={fontSize ? fontSize : KONVA.font.size}
				fill={color ? color : COLORS.text.important}
				align='center'
				verticalAlign='middle'
				fontStyle='normal'
				listening={false}
			/>
		</Label>
	);
}
