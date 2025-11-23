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
import { useRef } from 'react';
import type Konva from 'konva';

export function MainPage() {
	const selectedUser = useAtomValue(selectedUserAtom);
	const stageRef = useRef<Konva.Stage | null>(null);

	const { initialUsers, initialLines, users, lines, setUsers } =
		useInitializeData();

	const { handleAvatarClick, handleStageClick } = useUserClick({
		initialUsers,
		users,
		setUsers,
		stageRef,
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
					{lines.map((line, i) => {
						return (
							<UserLine
								initialX1={initialLines[i].x1}
								initialY1={initialLines[i].y1}
								initialX2={initialLines[i].x2}
								initialY2={initialLines[i].y2}
								x1={line.x1}
								y1={line.y1}
								x2={line.x2}
								y2={line.y2}
								key={line.id}
							/>
						);
					})}
					{users.map((user, i) => {
						return (
							<UserAvatar
								initialX={initialUsers[i].x}
								initialY={initialUsers[i].y}
								x={user.x}
								y={user.y}
								radius={AVATAR.radius}
								fill={'#550000'}
								onPointerClick={() => {
									handleAvatarClick({
										selectedUserId: user.id,
										selectedUserIndex: i,
									});
								}}
								isLeft={i % 2 === 0}
								isPopUpVisible={i === selectedUser?.index}
								selectedUser={selectedUser}
								key={user.id}
							/>
						);
					})}
				</Layer>
			</Stage>
		</Layout>
	);
}
