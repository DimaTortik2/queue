import { COLORS } from "../../../../app/config/consts";
import type { TIdentifity } from "./identifyUser";

export const getMainButtonProps = ({
  identify,
  onSwitchUsers,
}: {
  identify: TIdentifity;
  onSwitchUsers: () => void;
}) => {
  if (identify === 'me') {
    return {
      bgColor: COLORS.userActionButtons.leave.bg.passive,
      color: COLORS.userActionButtons.leave.text,
      bgColorHover: COLORS.userActionButtons.leave.bg.active,
      children: 'Покинуть очередь',
      onClick: () => console.log('Покинуть очередь'),
    };
  } else {
    return {
      bgColor: COLORS.userActionButtons.exchange.bg.passive,
      bgColorHover: COLORS.userActionButtons.exchange.bg.active,
      color: COLORS.userActionButtons.exchange.text,
      children: 'Поменяться',
      onClick: onSwitchUsers,
    };
  }
};