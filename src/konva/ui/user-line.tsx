import Konva from 'konva';
import { memo, useEffect, useRef } from 'react';
import { Line } from 'react-konva';
import type { ILine } from '../../pages/main/interfaces';

interface IProps {
	initialX1: number;
	initialX2: number;
	initialY1: number;
	initialY2: number;
	lineId: ILine['id'];
	onRegister: (node: Konva.Line | null, userId: ILine['id']) => void;
}

export const UserLine = memo(
	({
		initialX1,
		initialY1,
		initialX2,
		initialY2,
		lineId,
		onRegister,
	}: IProps) => {
		const lineRef = useRef<Konva.Line>(null);

		useEffect(() => {
			if (lineRef.current) {
				onRegister(lineRef.current, lineId);
			}
			return () => {
				onRegister(null, lineId);
			};
		}, [lineId, onRegister]);

		return (
			<Line
				ref={lineRef}
				points={[initialX1, initialY1, initialX2, initialY2]}
				strokeWidth={16}
				stroke={'#ffffff'}
				listening={false}
			/>
		);
	}
);
