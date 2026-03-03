import { useEffect } from 'react';

export const usePreventZoom = (enable: boolean = true) => {
	useEffect(() => {
		if (!enable) return;

		const preventDefaultZoom = (e: WheelEvent) => {
			if (e.ctrlKey) {
				e.preventDefault();
			}
		};

		const preventGesture = (e: Event) => {
			e.preventDefault();
		};

		const preventKeyZoom = (e: KeyboardEvent) => {
			if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
				e.preventDefault();
			}
		};

		document.addEventListener('wheel', preventDefaultZoom, { passive: false });
		document.addEventListener('gesturestart', preventGesture);
		document.addEventListener('gesturechange', preventGesture);
		document.addEventListener('keydown', preventKeyZoom);

		return () => {
			document.removeEventListener('wheel', preventDefaultZoom);
			document.removeEventListener('gesturestart', preventGesture);
			document.removeEventListener('gesturechange', preventGesture);
			document.removeEventListener('keydown', preventKeyZoom);
		};
	}, [enable]);
};
