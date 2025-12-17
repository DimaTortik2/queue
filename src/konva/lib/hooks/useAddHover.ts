import type Konva from 'konva';
import type { KonvaEventObject, NodeConfig } from 'konva/lib/Node';

type TEvent = KonvaEventObject<MouseEvent>;

export function UseAddHover({
	initialColor,
	initialBgColor,
	initialBorderColor,
	colorHover,
	bgColorHover,
	borderColorHover,
	durationHover = 0.1,
	durationOut = 0.1,
	opacity = 100,
	opacityHover = 100,
	scaleHover = 1.05,
	targetRef,
}: {
	colorHover?: string;
	initialColor?: string;
	initialBgColor?: string;
	initialBorderColor?: string;
	borderColorHover?: string;
	bgColorHover?: string;
	durationHover?: number;
	durationOut?: number;
	opacity?: number;
	opacityHover?: number;
	scaleHover?: number;
	targetRef?: React.RefObject<Konva.Node | null>;
}) {
	console.log(initialBorderColor, borderColorHover);

	const onMouseEnter = (e: TEvent) => {
		const container = e.target.getStage()?.container();
		if (container) {
			e.currentTarget.to({
				scaleX: scaleHover,
				scaleY: scaleHover,
				opacity: opacityHover,
				duration: durationHover,
			});
			container.style.cursor = 'pointer';

			const config: NodeConfig = {
				duration: durationHover,
			};

			if (bgColorHover) config.backgroundColor = bgColorHover;
			if (colorHover) config.fill = colorHover;
			if (borderColorHover) config.stroke = borderColorHover;

			if (targetRef && targetRef.current) {
				targetRef.current.to(config);
			} else {
				e.currentTarget.to(config);
			}
		}
	};
	const onMouseLeave = (e: TEvent) => {
		const container = e.target.getStage()?.container();
		if (container) {
			e.currentTarget.to({
				scaleX: 1,
				scaleY: 1,
				opacity: opacity,
				duration: durationOut,
			});
			container.style.cursor = 'default';

			const config: NodeConfig = {
				duration: durationHover,
			};

			if (initialBgColor) config.backgroundColor = initialBgColor;
			if (initialColor) config.fill = initialColor;
			if (initialBorderColor) config.stroke = initialBorderColor;

			if (targetRef && targetRef.current) {
				targetRef.current.to(config);
			} else {
				e.currentTarget.to(config);
			}
		}
	};
	return {
		onMouseEnter,
		onMouseLeave,
	};
}
