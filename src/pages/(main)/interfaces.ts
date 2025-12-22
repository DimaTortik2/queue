export interface IUserDataElement {
	name: string;
	imgSrc: string;
	id: number;
}

export type IUser = {
	x: number;
	y: number;
	position: number;
} & IUserDataElement;

export interface ILineCoords {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export type ILine = {
	id: number;
} & ILineCoords;

export interface IStage {
	scale: number;
	x: number;
	y: number;
}
