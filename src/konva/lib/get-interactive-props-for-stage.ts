import Konva from 'konva';
import { useCallback, useRef } from 'react';
import type { Stage } from 'konva/lib/Stage';

interface ICoords {
	x: number;
	y: number;
}

const getCenter = (p1: ICoords, p2: ICoords): ICoords => {
	return {
		x: (p2.x + p1.x) / 2,
		y: (p2.y + p1.y) / 2,
	};
};

const getDistance = (p1: ICoords, p2: ICoords): number => {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export function getInteractivePropsForStage({
	stageRef,
	maxScale,
	minScale,
}: {
	stageRef: React.RefObject<Stage | null>;

	maxScale: number;
	minScale: number;
}) {
	Konva.hitOnDragEnabled = true;

	const onWheel = (e: any) => {
		// наша тактика тут :
		// 1. вычислить новый скейл
		// 2. найти насколько надо сдвинуть stage дабы точка под курсором там и осталась при новом скейле:
		// 		1. узнать на каких координатах stage у себя хранит эту точку
		//    2. вычислить уже непосредственно насколько надо сдвинуть stage чтобы эта точка попала под координаты курсора
		//				на новом scale
		e.evt.preventDefault();
		const stage = stageRef.current;
		if (!stage) return;

		const scaleBy = 1.09;
		const oldScale = stage.scaleX();

		const screenPointCoords = { x: e.evt.clientX, y: e.evt.clientY };

		let direction = e.evt.deltaY > 0 ? -1 : 1;
		let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

		newScale = Math.min(maxScale, Math.max(minScale, newScale));

		// формула (1)
		// позиция точки на экране = координаты на stage * scale + сдвиг stage

		// из формулы (1) следует => координаты на stage  = (позиция точки на экране - сдвиг stage) / scale
		const stagePointCoords = {
			x: (screenPointCoords.x - stage.x()) / oldScale,
			y: (screenPointCoords.y - stage.y()) / oldScale,
		};

		// из формулы (1) следует => сдвиг stage = позиция точки на экране - координаты на stage * scale
		const newPos = {
			x: screenPointCoords.x - stagePointCoords.x * newScale,
			y: screenPointCoords.y - stagePointCoords.y * newScale,
		};

		stage.scale({ x: newScale, y: newScale });
		stage.position(newPos);
	};

	const prevCenter = useRef<ICoords | null>(null);
	const prevDistance = useRef<number>(0);
	const dragStopped = useRef<boolean>(false);

	const onTouchEnd = () => {
		prevCenter.current = null;
		prevDistance.current = 0;
	};

	const onTouchMove = useCallback(
		(e: any) => {
			const stage = stageRef.current;
			if (!stage) return;
			const touch1 = e.evt.touches[0];
			const touch2 = e.evt.touches[1];

			if (touch1 && !touch2 && !stage.isDragging() && dragStopped.current) {
				stage.startDrag();
				dragStopped.current = false;
			}

			if (touch1 && touch2) {
				if (stage.isDragging()) {
					dragStopped.current = true;
					stage.stopDrag();
				}

				const p1: ICoords = { x: touch1.clientX, y: touch1.clientY };
				const p2: ICoords = { x: touch2.clientX, y: touch2.clientY };

				const newCenter: ICoords = getCenter(p1, p2);
				const newDistance = getDistance(p1, p2);

				if (prevCenter.current === null) {
					prevCenter.current = newCenter;
					return;
				}

				if (!prevDistance.current) {
					prevDistance.current = newDistance;
					return;
				}

				const stagePointCoords: ICoords = {
					x: (newCenter.x - stage.x()) / stage.scaleX(),
					y: (newCenter.y - stage.y()) / stage.scaleX(),
				};

				let newScale = stage.scaleX() * (newDistance / prevDistance.current);
				newScale = Math.min(maxScale, Math.max(minScale, newScale));

				const dx = newCenter.x - prevCenter.current.x;
				const dy = newCenter.y - prevCenter.current.y;

				const newPos = {
					x: newCenter.x - stagePointCoords.x * newScale + dx,
					y: newCenter.y - stagePointCoords.y * newScale + dy,
				};

				stage.scale({ x: newScale, y: newScale });
				stage.position(newPos);

				prevCenter.current = newCenter;
				prevDistance.current = newDistance;
			}
		},
		[dragStopped, prevCenter, prevDistance]
	);

	return {
		onWheel,
		onTouchEnd,
		onTouchMove,
	};
}
