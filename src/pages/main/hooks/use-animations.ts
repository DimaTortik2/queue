import { animated, config, useSprings } from '@react-spring/konva';
import { useEffect } from 'react';
import type { IStage, IUser } from '../interfaces';
import { Circle } from 'react-konva';
import type { Stage } from 'konva/lib/Stage';
import Konva from 'konva';

export function useAnimations({
	users,
	stage,
	stageRef,
}: {
	users: IUser[];
	stage: IStage;
	stageRef: React.RefObject<Stage | null>;
}) {
	// typescript recursion problem
	const AnimatedCircle = animated(Circle) as any;

	const [userSprings, usersApi] = useSprings(users.length, i => ({
		x: users[i].x,
		y: users[i].y,
		config: config.slow,
	}));
	useEffect(() => {
		usersApi.start(i => ({ x: users[i].x, y: users[i].y }));
	}, [users, usersApi]);

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
		userSprings,
		AnimatedCircle,
		stage,
		stageRef,
		zoomTo,
	};
}
