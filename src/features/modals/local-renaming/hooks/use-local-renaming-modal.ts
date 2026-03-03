import { useAtom, useAtomValue } from 'jotai';
import {
	currentUserAtom,
	isLocalRenamingModalVisibleAtom,
	selectedUserAtom,
} from '../../../../app/strore/atoms';

export function useLocalRenamingModal() {
	const [isLocalRenamingModalVisible, setIsLocalRenamingModalVisible] = useAtom(
		isLocalRenamingModalVisibleAtom,
	);
	const selectedUser = useAtomValue(selectedUserAtom);
	const currentUser = useAtomValue(currentUserAtom);
	const handleClose = () => setIsLocalRenamingModalVisible(false);
	const handleSend = (text: string) => console.log(text);

	const handleResetLocalName = () => {
		console.log('handleResetLocalName');
	};

	return {
		isLocalRenamingModalVisible,
		setIsLocalRenamingModalVisible,
		selectedUser,
		currentUser,
		handleClose,
		handleSend,
		handleResetLocalName,
	};
}
