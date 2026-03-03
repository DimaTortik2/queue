import { COLORS } from '../../../app/config/consts';
import { useLocalRenamingModal } from './hooks/use-local-renaming-modal';

import { Button } from '../../../shared/button/button';
import { UserDesc } from '../../../entities/user-desc/user-desc';

import { MessangerInput } from '../../../shared/inputs/messanger/messanger-input';
import { Modal } from '../../../shared/modal/modal';
import { RenderSections } from '../../../shared/sections/renderSections';
import { getColor } from '../../../app/config/theme';
import { LocalRenamingIcon } from '../../../shared/icons/local-renaming-icon';

export function LocalRenamingModal() {
	const {
		handleClose,
		isLocalRenamingModalVisible,
		selectedUser,
		handleSend,
		handleResetLocalName,
		setIsLocalRenamingModalVisible,
	} = useLocalRenamingModal();

	return (
		// <ModalBottom
		// 	visible={isLocalRenamingModalVisible}
		// 	onClose={handleClose}
		// 	title='Локальное переименовывание'
		// 	setctions={[
		// 	<div style={{ color: COLORS.text.important }}>
		// 		<p>Вы можете локально задать другое имя этому участнику:</p>
		// 		<ul className='list-disc list-inside space-y-1'>
		// 			<li>Оно будет применяться для всех очередей.</li>
		// 			<li>Новое имя будет видно только вам.</li>
		// 		</ul>
		// 		<div className='w-full flex justify-end my-3 opacity-55 z-5'>
		// 			<Button onClick={handleResetLocalName}>
		// 				Сбросить к начальному
		// 			</Button>
		// 		</div>
		// 	</div>,
		// 	<UserDesc
		// 		imgSrc={selectedUser?.imgSrc}
		// 		name={selectedUser?.name}
		// 		className='text-[0.75rem]'
		// 	/>,
		// 	<MessangerInput
		// 		placeholder='Новое имя'
		// 		maxLength={20}
		// 		onSend={handleSend}
		// 		accentColor={COLORS.thematic.localRenaming.input.border}
		// 		defaultValue={selectedUser?.name}
		// 	/>,
		// ]}
		// borderColor={COLORS.thematic.localRenaming.border}
		// separatorsHeight={3}
		// separatorsColor={COLORS.thematic.localRenaming.separator}
		// bgWrapperColor={COLORS.thematic.localRenaming.bgWrapper}
		// headerIcon={
		// 	<LocalRenamingIcon
		// 		w={25}
		// 		h={25}
		// 		color={COLORS.thematic.localRenaming.header}
		// 		onClick={handleClose}
		// 	/>
		// }
		// />

		//
		<Modal.Root
			open={isLocalRenamingModalVisible}
			onOpenChange={() => setIsLocalRenamingModalVisible(false)}
		>
			<Modal.Content
				overlayClassName='backdrop-blur-sm bg-overlay/90 '
				className='bg-bg'
				handlerClassName='bg-muted-fg/50'
			>
				<Modal.Body>
					<Modal.Title hidden>Локальное переименование</Modal.Title>
					<Modal.Description hidden>
						Вы можете локально настроить любое имя ограниченной длины данному
						пользователю. Оно будет видно только вам
					</Modal.Description>
					<RenderSections
						spaceBetween={10}
						className='px-5'
						lineColor={getColor('renaming')}
						lineHeight={3}
					>
						<div className='flex justify-between'>
							<span>Локальное переименование</span>
							<LocalRenamingIcon
								w={25}
								h={25}
								className='text-renaming'
								onClick={handleClose}
							/>
						</div>
						<div style={{ color: COLORS.text.important }}>
							<p>Вы можете локально задать другое имя этому участнику:</p>
							<ul className='list-disc list-inside space-y-1'>
								<li>Оно будет применяться для всех очередей.</li>
								<li>Новое имя будет видно только вам.</li>
							</ul>
							<div className='w-full flex justify-end my-3 opacity-55 z-5'>
								<Button onClick={handleResetLocalName}>
									Сбросить к начальному
								</Button>
							</div>
						</div>
						<UserDesc
							imgSrc={selectedUser?.imgSrc}
							name={selectedUser?.name}
							className='text-[0.75rem]'
						/>
						<MessangerInput
							placeholder='Новое имя'
							maxLength={20}
							onSend={handleSend}
							accentColor={COLORS.thematic.localRenaming.input.border}
							defaultValue={selectedUser?.name}
						/>
					</RenderSections>
				</Modal.Body>
			</Modal.Content>
		</Modal.Root>
	);
}
