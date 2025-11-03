import Konva from 'konva';
import { useEffect, useRef, type ReactNode } from 'react';
import { Circle } from 'react-konva';
import { AVATAR } from '../consts';

interface IProps extends Konva.NodeConfig {
	initialX: number;
	initialY: number;
	userPopup: ReactNode;
}

export function User({
	x,
	y,
	initialX,
	initialY,
	userPopup,
	...props
}: IProps) {
	const circleRef = useRef<Konva.Circle>(null);

	useEffect(() => {
		const circle = circleRef.current;

		if (!circle) return;
		circle.to({
			duration: 0.5,
			x: x,
			y: y,
			easing: Konva.Easings.EaseInOut,
		});
	}, [x, y]);

	return (
		<>
			<Circle
				ref={circleRef}
				x={initialX}
				y={initialY}
				radius={AVATAR.radius}
				fill={'#550000'}
				{...props}
			/>
			{userPopup}
		</>
	);
}
