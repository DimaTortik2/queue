export interface IUserDataElement {
	avaSrc: string;
	id: number;
}

export type IUser = {
	x: number;
	y: number;
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

export interface IStage {
	scale: number;
	x: number;
	y: number;
}
