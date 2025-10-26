import { useEffect, useRef, useState } from 'react';
import type { ITransformState, IUserData } from '../interfaces';
import type { ReactZoomPanPinchContentRef } from 'react-zoom-pan-pinch';
import { avatarSize } from '../consts';

export function useUserClick(userData: IUserData) {

	const canvasRef = useRef<ReactZoomPanPinchContentRef>(null);

	const [transformState, setTransformState] = useState<ITransformState>({
		scale: 0.15,
		x: 0,
		y: 0,
	});

	useEffect(() => {
		if (!canvasRef) return;

		canvasRef.current?.setTransform(
			transformState.x,
			transformState.y,
			transformState.scale
		);
	}, [transformState]);

	const handleUserClick = (i: number) => {
		const isLeft = i % 2 === 0;
		const scale = 2;

		const shiftToLeftX = isLeft
			? scale * userData[0].left - window.innerWidth * 0.02
			: scale * userData[1].left +
			  window.innerWidth * 0.02 -
			  window.innerWidth +
			  avatarSize * scale;

		const shiftToCenterY =
			scale * userData[i].top -
			(window.innerHeight / 2 - (avatarSize / 2) * scale);

		const x = -shiftToLeftX;

		const y = -shiftToCenterY;

		setTransformState({
			x,
			y,
			scale,
		});
	};

	return { handleUserClick, canvasRef };
}
