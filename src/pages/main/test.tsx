import { Circle, Layer, Stage } from 'react-konva';
import { useRef } from 'react';
import Konva from 'konva';
import type { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';

export function TestPage() {
	const stageRef = useRef<Konva.Stage>(null);
	const circleRef = useRef<Konva.Circle>(null);

	const handleClick = () => {
		circleRef.current?.to({
			x: 300,
			y: 300,
			duration: 0.3,
			easing: Konva.Easings.EaseInOut,
		});
	};

	const resetClick = (e: KonvaEventObject<PointerEvent, Node<NodeConfig>>) => {
		if (e.target === e.currentTarget) {
			circleRef.current?.to({
				x: 200,
				y: 200,
				duration: 0.3,
				easing: Konva.Easings.EaseInOut,
			});
		}
	};

	return (
		<Stage
			ref={stageRef}
			width={window.innerWidth}
			height={window.innerHeight}
			scaleX={1}
			scaleY={1}
			x={0}
			y={0}
			onPointerClick={resetClick}
			draggable
		>
			<Layer>
				<Circle
					onPointerClick={handleClick}
					ref={circleRef}
					x={200}
					y={200}
					radius={50}
					fill={'#212121'}
				/>
			</Layer>
		</Stage>
	);
}
