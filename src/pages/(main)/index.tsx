import { useAtomValue } from 'jotai';
import { selectedUserAtom } from '../../app/strore/atoms';
import { Stage, Layer } from 'react-konva';
import { STAGE, AVATAR } from '../../app/config/consts';

import { UserAvatar } from '../../konva/ui/user-avatar';
import { UserLine } from '../../konva/ui/user-line';
import { useInitializeData } from './hooks/use-init-data';
import { useInitializeRefs } from './hooks/use-init-refs';
import { useUserClick } from './hooks/use-user-click';
import { SwitchUsersModal } from '../../features/modals/switch-users/switch-users-modal';
import { useGetInteractivePropsForStage } from '../../konva/lib/hooks/use-get-interactive-props-for-stage';

export default function MainPage() {
	const selectedUser = useAtomValue(selectedUserAtom);

	const { initialUsers, initialLines } = useInitializeData();

	const { stageRef, avatarsRef, linesRef, setAvatarsRefs, setLinesRefs } =
		useInitializeRefs();

	const { handleAvatarClick, handleStageClick } = useUserClick({
		initialUsers,
		initialLines,
		stageRef,
		avatarsRef,
		linesRef,
	});

	return (
		<>
			<Stage
				ref={stageRef}
				width={window.innerWidth}
				height={window.innerHeight}
				scaleX={STAGE.initial.scale}
				scaleY={STAGE.initial.scale}
				x={STAGE.initial.x}
				y={STAGE.initial.y}
				draggable
				onPointerClick={handleStageClick}
				{...useGetInteractivePropsForStage({
					stageRef,
					maxScale: STAGE.maxScale,
					minScale: STAGE.minScale,
				})}
			>
				<Layer>
					{initialLines.map(line => {
						return (
							<UserLine
								initialX1={line.x1}
								initialY1={line.y1}
								initialX2={line.x2}
								initialY2={line.y2}
								onRegister={setLinesRefs}
								lineId={line.id}
								key={line.id}
							/>
						);
					})}
					{initialUsers.map((user, i) => {
						return (
							<UserAvatar
								onRegister={setAvatarsRefs}
								onAvatarClick={handleAvatarClick}
								imgSrc={user.imgSrc}
								x={user.x}
								y={user.y}
								radius={AVATAR.radius}
								isLeft={i % 2 === 0}
								userIndex={i}
								userId={user.id}
								isSelected={selectedUser ? user.id === selectedUser.id : false}
								key={user.id}
							/>
						);
					})}
				</Layer>
			</Stage>
			<SwitchUsersModal />
		</>
	);
}
