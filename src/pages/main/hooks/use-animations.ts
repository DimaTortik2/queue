import { animated, config, useSprings } from '@react-spring/konva';
import { useEffect } from 'react';
import type { IUser } from '../interfaces';
import { Circle } from 'react-konva';

export function useAnimations({ users }: { users: IUser[] }) {
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

	return {
		userSprings,
		AnimatedCircle,
	};
}
