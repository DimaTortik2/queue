import type { ReactNode } from 'react';
import { Text, Label, Tag } from 'react-konva';
import type { KonvaProps } from '../interfaces/kanva.interface';
import { COLORS, KONVA } from '../../app/config/consts';

interface IProps extends KonvaProps {
	children?: ReactNode;
	onClick: () => void;
	fontSize?: number;
	cornerRadius?: number;
}

export function ButtonKanva({
	children,
	onClick,
	color,
	padding,
	bgColor,
	fontSize,
	cornerRadius,
	...props
}: IProps) {
	return (
		<Label {...props} onClick={onClick} onTap={onClick}>
			<Tag fill={bgColor} cornerRadius={cornerRadius ? cornerRadius : 0} />
			<Text
				text={children ? String(children) : ''}
				padding={padding || 5}
				fontSize={fontSize ? fontSize : KONVA.font.size}
				fill={color ? color : COLORS.text}
				align='center'
				verticalAlign='middle'
				fontStyle='normal'
				listening={false}
			/>
		</Label>
	);
}
