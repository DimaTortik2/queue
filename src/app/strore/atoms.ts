import { atom } from 'jotai';
import type { IUser } from '../../pages/(main)/interfaces';

export const selectedUserAtom = atom<IUser | null>(null);
export const currentUserAtom = atom<IUser | null>(null);
export const isSwithUsersModalVisibleAtom = atom<boolean>(false);
