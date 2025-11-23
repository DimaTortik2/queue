import { useCallback, useRef } from 'react';
import type Konva from 'konva';
import type { ILine, IUser } from '../interfaces';

export function useInitializeRefs() {
	const stageRef = useRef<Konva.Stage | null>(null);

	const avatarsRef = useRef<Record<IUser['id'], Konva.Group>>({});
	const linesRef = useRef<Record<ILine['id'], Konva.Line>>({});

	const setAvatarsRefs = useCallback(
		(node: Konva.Group | null, userId: IUser['id']) => {
			if (node) {
				avatarsRef.current[userId] = node;
			} else {
				delete avatarsRef.current[userId];
			}
		},
		[]
	);

	const setLinesRefs = useCallback(
		(node: Konva.Line | null, userId: ILine['id']) => {
			if (node) {
				linesRef.current[userId] = node;
			} else {
				delete avatarsRef.current[userId];
			}
		},
		[]
	);

	return {
		stageRef,
		avatarsRef,
		linesRef,
		setAvatarsRefs,
		setLinesRefs,
	};
}
