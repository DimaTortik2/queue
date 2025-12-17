import Konva from 'konva';
import type { IStage } from '../../pages/(main)/interfaces';
import type { Stage } from 'konva/lib/Stage';

export function setStageSmooth({
	newStage,
	stageRef,
}: {
	newStage: IStage;
	stageRef: React.RefObject<Stage | null>;
}) {
	if (!stageRef.current) return;

	new Konva.Tween({
		node: stageRef.current,
		duration: 0.35,
		scaleX: newStage.scale,
		scaleY: newStage.scale,
		x: newStage.x,
		y: newStage.y,
		easing: Konva.Easings.EaseInOut,
	}).play();
}
