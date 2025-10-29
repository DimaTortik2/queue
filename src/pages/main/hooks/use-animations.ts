import {  animated, config, useSprings } from '@react-spring/konva';
import { useEffect } from 'react';
import type { IUser } from '../interfaces';
import { Circle, Stage } from 'react-konva';

export function useAnimations(users: IUser[]) {


  // typescript recursion problem
  const AnimatedStage = animated(Stage) as any;
  const AnimatedCircle = animated(Circle) as any;

	const [springs, api] = useSprings(users.length, i => ({
		x: users[i].x,
		y: users[i].y,
		config: config.stiff,
	}));

	useEffect(() => {
		api.start(i => ({ x: users[i].x, y: users[i].y }));
	}, [users, api]);


  return {
		springs,
		AnimatedStage,
		AnimatedCircle,
	};
}
