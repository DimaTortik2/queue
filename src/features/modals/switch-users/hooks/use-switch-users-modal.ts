import { useAtom, useAtomValue } from 'jotai';
import {
	currentUserAtom,
	isSwithUsersModalVisibleAtom,
	selectedUserAtom,
} from '../../../../app/strore/atoms';

export function useSwitchUsersModal() {
	const [isSwithUsersModalVisible, setIsSwithUsersModalVisible] = useAtom(
		isSwithUsersModalVisibleAtom
	);
	const selectedUser = useAtomValue(selectedUserAtom);
	const currentUser = useAtomValue(currentUserAtom);
	const handleClose = () => setIsSwithUsersModalVisible(false);
	const handleSend = (text: string) => console.log(text);

	return {
		isSwithUsersModalVisible,
		selectedUser,
		currentUser,
		handleClose,
		handleSend,
	};
}
