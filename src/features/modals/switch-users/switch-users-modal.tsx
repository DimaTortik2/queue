import { ModalBottom } from '../../../shared/modal/modal-bottom';
import { SuggestSwitchIcon } from '../../../shared/icons/suggest-switch-icon';
import { COLORS } from '../../../app/config/consts';
import { getUserDescsInCurrectOrderArr } from './utils/get-user-descsIn-currect-order-arr';
import { useSwitchUsersModal } from './hooks/use-switch-users-modal';
import { MessangerInput } from '../../../shared/inputs/messanger/messanger-input';

export function SwitchUsersModal() {
	const {
		currentUser,
		handleClose,
		isSwithUsersModalVisible,
		selectedUser,
		handleSend,
	} = useSwitchUsersModal();

	return (
		<ModalBottom
			visible={isSwithUsersModalVisible}
			onClose={handleClose}
			title='Просьба поменяться'
			setctions={[
				<div className='inline-grid grid-cols-[max-content_auto] gap-5 items-center'>
					{...getUserDescsInCurrectOrderArr({ selectedUser, currentUser })}
				</div>,
				<MessangerInput
					placeHolder={'Просьба...'}
					maxLength={200}
					onSend={handleSend}
				/>,
			]}
			borderColor={COLORS.thematic.switchUsers.border}
			separatorsHeight={3}
			separatorsColor={COLORS.thematic.switchUsers.separator}
			bgWrapperColor={COLORS.thematic.switchUsers.bgWrapper}
			headerIcon={
				<SuggestSwitchIcon
					w={25}
					h={25}
					color={COLORS.thematic.switchUsers.header}
					onClick={handleClose}
				/>
			}
		/>
	);
}
