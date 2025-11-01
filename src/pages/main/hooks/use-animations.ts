import type { IStage } from '../interfaces';
import type { Stage } from 'konva/lib/Stage';
import Konva from 'konva';

export function useAnimations({
	stageRef,
}: {
	stageRef: React.RefObject<Stage | null>;
}) {
	const zoomTo = (stage: IStage) => {
		if (!stageRef || !stageRef.current) return;

		new Konva.Tween({
			node: stageRef.current,
			duration: 0.35,
			scaleX: stage.scale,
			scaleY: stage.scale,
			x: stage.x,
			y: stage.y,
			easing: Konva.Easings.EaseInOut,
		}).play();
	};

	return {
		stageRef,
		zoomTo,
	};
}
