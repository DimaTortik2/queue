import { motion, type SVGMotionProps } from 'framer-motion';

interface IProps extends SVGMotionProps<SVGLineElement> {
	initX1: number;
	initY1: number;
	initX2: number;
	initY2: number;
}

export function Line({
	initX1,
	initY1,
	initX2,
	initY2,
	...props
}: IProps) {
	if (!props.x1 || !props.y1 || !props.x2 || !props.y2) return <></>;
	const variants = {
		start: {
			x1: +initX1,
			y1: +initY1,
			x2: +initX2,
			y2: +initY2,
		},
		end: {
			x1: +props.x1,
			y1: +props.y1,
			x2: +props.x2,
			y2: +props.y2,
		},
	};
	return (
		<motion.line
			variants={variants}
			initial='start'
			animate='end'
			transition={{ duration: 1 }}
			{...props}
		/>
	);
}
