import { SuggestSwitchIcon } from '../../../shared/icons/suggest-switch-icon';
import { getUserDescsInCurrectOrderArr } from './utils/get-user-descsIn-currect-order-arr';
import { useSwitchUsersModal } from './hooks/use-switch-users-modal';
import { MessangerInput } from '../../../shared/inputs/messanger/messanger-input';
import { Modal } from '../../../shared/modal/modal';
import { RenderSections } from '../../../shared/sections/renderSections';
import { getColor } from '../../../app/config/theme';

export function SwitchUsersModal() {
	const {
		currentUser,
		handleClose,
		isSwithUsersModalVisible,
		selectedUser,
		handleSend,
		setIsSwithUsersModalVisible,
	} = useSwitchUsersModal();

	return (
		<Modal.Root
			open={isSwithUsersModalVisible}
			onOpenChange={() => setIsSwithUsersModalVisible(false)}
		>
			<Modal.Content
				overlayClassName='backdrop-blur-sm bg-overlay/90 '
				className='bg-bg'
				handlerClassName='bg-muted-fg/50'
			>
				<Modal.Body>
					<Modal.Title hidden>Поменяться с пользователем</Modal.Title>
					<Modal.Description hidden>
						Вы можете поменяться с пользователем местами, отправив просьбу в
						текстовом поле. Можете оставить текстовое поле пустым
					</Modal.Description>
					<RenderSections
						spaceBetween={10}
						className='px-5'
						lineColor={getColor('switch')}
						lineHeight={3}
					>
						<div className='flex justify-between'>
							<span>Просьба поменяться</span>
							<SuggestSwitchIcon
								w={25}
								h={25}
								color={getColor('switch')}
								onClick={handleClose}
							/>
						</div>
						{[
							<div className='inline-grid grid-cols-[max-content_auto] gap-5 items-center'>
								{...getUserDescsInCurrectOrderArr({
									selectedUser,
									currentUser,
								})}
							</div>,
							<MessangerInput
								placeHolder='Просьба...'
								maxLength={200}
								onSend={handleSend}
							/>,
						]}
					</RenderSections>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
