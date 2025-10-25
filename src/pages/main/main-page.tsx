import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const avatarSize: number = 500;
const userCount = 30;

interface IData {
	avaSrc: string;
	id: number;
}

type IUserData = {
	left: number;
	top: number;
	avaSrc: string;
	id: number;
}[];

type ILineData = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	id: number;
}[];

export function MainPage() {
	const data: IData[] = [];
	for (let i = 0; i < userCount; i++) {
		data.push({
			avaSrc: '/ava.png',
			id: i,
		});
	}
	const userData: IUserData = data.map((user, i) => {
		const isLeft = i % 2 == 0;
		return {
			left: isLeft ? 1600 : 2500,
			top: 700 + 550 * i,
			avaSrc: user.avaSrc,
			id: i,
		};
	});

	const lineData: ILineData = [];
	for (let i = 0; i < userData.length - 1; i++) {
		const firstUserCoords = userData[i];
		const secondUserCoords = userData[i + 1];
		const halfAvatarSize = avatarSize / 2;

		lineData.push({
			x1: firstUserCoords.left + halfAvatarSize,
			y1: firstUserCoords.top + halfAvatarSize,
			x2: secondUserCoords.left + halfAvatarSize,
			y2: secondUserCoords.top + halfAvatarSize,
			id: firstUserCoords.id,
		});
	}

	const canvaHeight: number = 2000 + data.length * (avatarSize + 50);
	const canvaWidth: number = 5000;

	return (
		<main className='w-screen h-screen bg-[#1a1a1a] overflow-hidden relative'>
			<div className='absolute w-16 h-16 rounded-full top-2 left-2 bg-red-200 z-10'></div>

			<TransformWrapper
				limitToBounds={false}
				minScale={0.015}
				maxScale={2}
				initialPositionX={0}
				initialPositionY={0}
				initialScale={0.15}
				doubleClick={{}}
				wheel={{ step: 1 }}
			>
				<TransformComponent>
					<div
						className='bg-[#ffffff] relative'
						style={{
							height: canvaHeight,
							width: canvaWidth,
						}}
					>
						{userData.map(data => {
							return (
								<img
									src={data.avaSrc}
									alt='avatar'
									className='w-[500px] h-[500px] absolute left-[1600px] top-[700px] rounded-full border-[15px] border-amber-500'
									style={{
										left: data.left,
										top: data.top,
									}}
									key={data.id}
								/>
							);
						})}
						<svg
							viewBox={`0 0 ${canvaWidth} ${canvaHeight}`}
							className='w-full h-full'
							xmlns='http://www.w3.org/2000/svg'
						>
							{lineData.map(data => {
								return (
									<line
										x1={data.x1}
										y1={data.y1}
										x2={data.x2}
										y2={data.y2}
										stroke='black'
										strokeWidth={10}
										key={data.id}
									/>
								);
							})}
						</svg>
					</div>
				</TransformComponent>
			</TransformWrapper>
		</main>
	);
}
