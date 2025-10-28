import { atom } from 'jotai';
import type { IUser } from '../../pages/main/interfaces';

export const userIdAtom = atom<number>(1); // Наш пользовотель
export const selectedUserAtom = atom<IUser | null>(null);
