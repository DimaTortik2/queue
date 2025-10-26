export const Avatar = ({
	src,
	alt,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	src: string | undefined;
	alt: string;
}) => {
	return (
		<button
			className='absolute left-[1600px] top-[700px] excluded-item'
			{...props}
		>
			<img
				src={src}
				alt={alt}
				className='w-[500px] h-[500px] rounded-full border-[15px] border-amber-500 '
			/>
		</button>
	);
};
