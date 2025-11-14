import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Line } from 'react-konva';

interface IProps {
	initialX1: number;
	initialX2: number;
	initialY1: number;
	initialY2: number;
	x1: number;
	x2: number;
	y1: number;
	y2: number;
}

export function UserLine({
	x1,
	y1,
	x2,
	y2,
	initialX1,
	initialY1,
	initialX2,
	initialY2,
}: IProps) {
	const lineRef = useRef<Konva.Line>(null);

	const lastLinePoints = useRef([initialX1, initialY1, initialX2, initialY2]);

	useEffect(() => {
		const line = lineRef.current;
		if (!line) return;

		const newPoints = [x1, y1, x2, y2];

		line.to({
			duration: 0.5,
			points: newPoints,
			easing: Konva.Easings.EaseInOut,
		});
		lastLinePoints.current = newPoints;
	}, [x1, y1, x2, y2]);

	return (
		<Line
			ref={lineRef}
			points={lastLinePoints.current}
			strokeWidth={16}
			stroke={'#ffffff'}
		/>
	);
}
