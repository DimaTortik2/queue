export interface IUserDataElement {
	name: string;
	avaSrc: string;
	id: number;
}

export type IUser = {
	x: number;
	y: number;
} & IUserDataElement;

export type ISelectedUser = {
	index: number;
} & IUser;

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
