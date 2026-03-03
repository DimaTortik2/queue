import { Group, Path, Rect } from 'react-konva';
import { useRef } from 'react';
import type Konva from 'konva';
import { UseAddHover } from '../lib/hooks/use-add-hover';
import { getColor } from '../../app/config/theme';

const ORIGINAL_SIZE = 38;

export function EditAvatarButton({
	w = ORIGINAL_SIZE,
	h = ORIGINAL_SIZE,
	x = 0,
	y = 0,
	color = getColor('mutedFg'),
	colorHover = getColor('fg'),
	onClick,
}: {
	w?: number;
	h?: number;
	x?: number;
	y?: number;
	color?: string;
	colorHover?: string;
	onClick?: () => void;
}) {
	const IconPath =
		'M37.1093 9.38138L28.6201 0.890607C28.3377 0.608254 28.0026 0.384276 27.6337 0.231464C27.2648 0.0786519 26.8695 0 26.4702 0C26.0709 0 25.6755 0.0786519 25.3066 0.231464C24.9378 0.384276 24.6026 0.608254 24.3203 0.890607L0.891126 24.3205C0.607603 24.6018 0.382819 24.9366 0.22984 25.3055C0.0768613 25.6744 -0.00126055 26.07 1.53806e-05 26.4693V34.9601C1.53806e-05 35.7663 0.320304 36.5395 0.890421 37.1096C1.46054 37.6797 2.23378 38 3.04005 38H11.5312C11.9306 38.0013 12.3263 37.9231 12.6952 37.7702C13.0641 37.6172 13.3989 37.3924 13.6802 37.1089L37.1093 13.6809C37.3917 13.3986 37.6157 13.0635 37.7685 12.6946C37.9213 12.3258 38 11.9304 38 11.5311C38 11.1319 37.9213 10.7365 37.7685 10.3677C37.6157 9.99881 37.3917 9.66367 37.1093 9.38138ZM11.5312 34.9601H3.04005V26.4693L19.7602 9.74997L28.2514 18.2407L11.5312 34.9601ZM30.4004 16.09L21.9092 7.60115L26.4692 3.04132L34.9604 11.5302L30.4004 16.09Z';

	const scale = Math.min(w / ORIGINAL_SIZE, h / ORIGINAL_SIZE);

	const pathRef = useRef<Konva.Path>(null);

	const groupProps = UseAddHover({
		initialColor: color,
		colorHover,
		targetRef: pathRef,
	});

	return (
		<Group
			x={x}
			y={y}
			onClick={onClick}
			onTap={onClick}
			width={ORIGINAL_SIZE * scale}
			height={ORIGINAL_SIZE * scale}
			{...groupProps}
		>
			<Rect
				x={(w - ORIGINAL_SIZE * scale) / 2}
				y={(h - ORIGINAL_SIZE * scale) / 2}
				width={ORIGINAL_SIZE * scale}
				height={ORIGINAL_SIZE * scale}
				fill='transparent'
			/>
			<Path
				ref={pathRef}
				fill={color}
				scaleX={scale}
				scaleY={scale}
				data={IconPath}
				x={(w - ORIGINAL_SIZE * scale) / 2}
				y={(h - ORIGINAL_SIZE * scale) / 2}
				listening={false}
			/>
		</Group>
	);
}
