import { useAtom, useAtomValue } from 'jotai';
import {
	currentUserAtom,
	isSwithUsersModalVisibleAtom,
	selectedUserAtom,
} from '../../app/strore/atoms';
import { ModalBottom } from '../../shared/modal/modal-bottom';
import { SuggestSwitchIcon } from '../../shared/icons/suggest-switch-icon';
import { COLORS } from '../../app/config/consts';
import { UserDesc } from '../../entities/user-desc/user-desc';
import type { IUser } from '../../pages/(main)/interfaces';
import { ArrowUpIcon } from '../../shared/icons/arrow-up-icon';
import { ArrowDownIcon } from '../../shared/icons/arrow-down-icon';
import type { ReactNode } from 'react';

const pluralizePlaces = (n: number) => {
	const forms = ['место', 'места', 'мест'];
	const num = Math.abs(n) % 100;
	const n1 = num % 10;

	const isPositive = n > 0;

	let result;
	if (num > 10 && num < 20) {
		result = forms[2]; // мест (для 11-19)
	} else if (n1 > 1 && n1 < 5) {
		result = forms[1]; // места (для 2, 3, 4)
	} else if (n1 === 1) {
		result = forms[0]; // место (для 1)
	} else {
		result = forms[2]; // мест (для 0, 5-9)
	}

	return `${isPositive ? '+' : '-'}${num} ${result}`;
};

const getUserDescsInCurrectOrderArr = ({
	selectedUser,
	currentUser,
}: {
	selectedUser: IUser | null;
	currentUser: IUser | null;
}) => {
	if (!selectedUser || !currentUser) return [];

	const diffInPositions = currentUser.position - selectedUser.position;

	const arrowColor =
		diffInPositions > 0 ? COLORS.arrows.up : COLORS.arrows.down;

	const arrowProps = {
		color: arrowColor,
		w: 13,
		h: 13,
		className:
			'min-[450px]:w-[16px] min-[450px]:h-[16px] sm:w-[20px] sm:h-[20px]',
	};

	const userProps = {
		className:
			'text-[10px] min-[450px]:text-[13px] sm:text-[15px] justify-self-end',
	};

	const components: ReactNode[] = [];

	const meComp: ReactNode = (
		<UserDesc
			avatar={currentUser?.imageObj}
			name={'Вы'}
			position={currentUser?.position}
			{...userProps}
			reflect={diffInPositions > 0}
		/>
	);

	const selectedUserComp: ReactNode = (
		<UserDesc
			avatar={selectedUser?.imageObj}
			name={selectedUser?.name}
			position={selectedUser?.position}
			{...userProps}
			reflect={diffInPositions < 0}
		/>
	);

	const arrowComp: ReactNode = (
		<div className='flex gap-2 items-center'>
			{diffInPositions > 0 ? (
				<ArrowUpIcon {...arrowProps} />
			) : (
				<ArrowDownIcon {...arrowProps} />
			)}

			<p
				className='text-[0.75rem] sm:text-[1.35rem]'
				style={{ color: arrowColor }}
			>
				{pluralizePlaces(diffInPositions)}
			</p>
		</div>
	);

	if (diffInPositions > 0) {
		components.push(selectedUserComp);
		components.push(<div />);
		components.push(meComp);
		components.push(arrowComp);
	} else {
		components.push(meComp);
		components.push(arrowComp);
		components.push(selectedUserComp);
		components.push(<div />);
	}

	return components;
};

export function SwitchUsersModal() {
	const [isSwithUsersModalVisible, setIsSwithUsersModalVisible] = useAtom(
		isSwithUsersModalVisibleAtom
	);
	const selectedUser = useAtomValue(selectedUserAtom);
	const currentUser = useAtomValue(currentUserAtom);

	const handleClose = () => setIsSwithUsersModalVisible(false);

	return (
		<ModalBottom
			visible={isSwithUsersModalVisible}
			onClose={handleClose}
			title='Просьба поменяться'
			setctions={[
				<div className='inline-grid grid-cols-[max-content_auto] gap-5 items-center'>
					{...getUserDescsInCurrectOrderArr({ selectedUser, currentUser })}
				</div>,
			]}
			withBorder
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
