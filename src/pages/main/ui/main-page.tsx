import { Layout } from './layout';
import { useInitializeData } from '../hooks/use-init-data';
import { useUserClick } from '../hooks/use-user-click';
import { Layer, Stage } from 'react-konva';
import { getInteractivePropsForStage } from '../../../konva/lib/get-interactive-props-for-stage';
import { AVATAR, STAGE } from '../../../app/config/consts';
import { selectedUserAtom } from '../../../app/strore/atoms';
import { useAtomValue } from 'jotai';
import { UserLine } from '../../../konva/ui/user-line';
import { UserAvatar } from '../../../konva/ui/user-avatar';
import { useInitializeRefs } from '../hooks/use-init-refs';

export function MainPage() {
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
		<Layout>
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
				{...getInteractivePropsForStage({
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
								initialX={initialUsers[i].x}
								initialY={initialUsers[i].y}
								x={user.x}
								y={user.y}
								radius={AVATAR.radius}
								fill={'#550000'}
								onAvatarClick={handleAvatarClick}
								selectedUserId={user.id}
								selectedUserIndex={i}
								isLeft={i % 2 === 0}
								isPopUpVisible={i === selectedUser?.index}
								userId={user.id}
								isSelected={selectedUser ? user.id === selectedUser.id : false}
								key={user.id}
							/>
						);
					})}
				</Layer>
			</Stage>
		</Layout>
	);
}
