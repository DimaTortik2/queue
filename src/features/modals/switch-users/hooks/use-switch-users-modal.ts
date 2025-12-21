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

	return {
		isSwithUsersModalVisible,
		selectedUser,
		currentUser,
		handleClose,
	};
}
