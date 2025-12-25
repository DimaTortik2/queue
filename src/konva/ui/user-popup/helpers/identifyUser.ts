import type { IUser } from "../../../../pages/(main)/interfaces";

export type TIdentifity = 'me' | 'stranger';


export const identifyUser = ({
  ownUserId,
  selectedUserId,
}: {
  selectedUserId?: IUser['id'];
  ownUserId?: IUser['id'];
}): TIdentifity => {
  if (ownUserId === selectedUserId) {
    return 'me';
  } else {
    return 'stranger';
  }
};
