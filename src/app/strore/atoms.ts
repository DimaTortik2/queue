import { atom } from 'jotai';
import type { IUser } from '../../pages/main/interfaces';

export const selectedUserAtom = atom<IUser & {index : number} | null>(null);
