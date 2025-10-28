export interface IUserDataElement {
	avaSrc: string;
	id: number;
}

export type IUser = {
	left: number;
	top: number;
	translateX: number;
	translateY: number;
	avaSrc: string;
	id: number;
} & IUserDataElement;

export type ILine = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	id: number;
};

export interface ITransformState {
	scale: number;
	x: number;
	y: number;
}
