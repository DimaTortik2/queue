import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import classes from './modal-bottom.module.css';
import { RenderSections } from '../sections/renderSections';
import { COLORS } from '../../app/config/consts';

interface IProps {
	visible: boolean;
	title: string;
	onClose: () => void;
	borderColor?: string;
	headerIcon: ReactNode;
	setctions: ReactNode[];
	bgColor?: string;
	titleColor?: string;
	separatorsColor?: string;
	withBorder?: boolean;
	borderWidth?: number;
	separatorsHeight?: number;
	bgWrapperColor?: string;
}

export function ModalBottom({
	onClose,
	visible,
	title,
	borderColor = '#ffffff32',
	withBorder = false,
	borderWidth = 3,
	separatorsColor = COLORS.modal.separator,
	bgWrapperColor = COLORS.modal.bgWrapper,
	separatorsHeight = 4,
	headerIcon,
	setctions,
	bgColor = COLORS.modal.bg,
	titleColor = COLORS.modal.title,
}: IProps) {
	return ReactDOM.createPortal(
		<AnimatePresence>
			{visible && (
				<>
					<motion.div
						className={classes.overlay}
						style={{
							backgroundColor: bgWrapperColor,
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={e => {
							e.stopPropagation();
							onClose();
						}}
					>
						<motion.div
							className={classes.sheet}
							style={{
								borderColor: borderColor,
								backgroundColor: bgColor,
								color: titleColor,
								borderWidth: withBorder ? borderWidth : 0,
							}}
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 300 }}
							drag='y'
							dragConstraints={{ top: 0, bottom: 0 }}
							dragElastic={0.05}
							onDragEnd={(_, info) => {
								console.log(info);
								if (info.velocity.y > 90) onClose();
							}}
							onClick={e => e.stopPropagation()}
						>
							<RenderSections
								spaceBetween={10}
								className='px-5'
								lineColor={separatorsColor}
								lineHeight={separatorsHeight}
							>
								<div className={classes.header}>
									{title} {headerIcon}
								</div>
								{setctions}
							</RenderSections>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
}
