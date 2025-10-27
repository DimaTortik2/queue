import clsx from "clsx";

export const Avatar = ({
	src,
	alt,
	className,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	src: string | undefined;
	alt: string;
}) => {
	return (
		<button
			className={clsx(
				'absolute left-[1600px] top-[700px]',
				className
			)}
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
