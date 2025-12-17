import { atom } from 'jotai';
import type { ISelectedUser } from '../../pages/(main)/interfaces';

export const selectedUserAtom = atom<ISelectedUser | null>(null);
