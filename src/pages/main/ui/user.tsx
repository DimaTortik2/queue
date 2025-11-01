import Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Circle } from 'react-konva';
import { AVATAR } from '../consts';

export function User({ x, y, initialX, initialY, ...props }: Konva.NodeConfig) {
	const circleRef = useRef(null);

	useEffect(() => {
		if (circleRef.current) {
			new Konva.Tween({
				node: circleRef.current,
				duration: 0.5,
				x: x,
				y: y,
				easing: Konva.Easings.EaseInOut,
			}).play();
		}
	}, [x, y]);

	return (
		<Circle
			ref={circleRef}
			x={initialX}
			y={initialY}
			radius={AVATAR.radius}
			fill={'#550000'}
			{...props}
		/>
	);
}
