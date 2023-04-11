import React from 'react';
import { FiX } from 'react-icons/fi';

type PropType = {
	children?: React.ReactNode;
	onClose?: () => void;
	title?: string;
};

const PopupBox: React.FC<PropType> = ({ children, onClose, title = '' }) => {
	return (
		<div className='absolute inset-0 flex items-center justify-center z-10'>
			<button
				type='button'
				className='absolute inset-0 bg-black opacity-25 focus:outline-none'
				onClick={onClose}
			/>
			<div className='w-5/6 md:w-3/4 lg:w-2/4 bg-white rounded-md overflow-hidden z-20'>
				{title && (
					<div className='flex items-stretch bg-white'>
						<h2 className='flex-1 px-3 py-2 font-light text-indigo-400 tracking-wide'>
							{title}
						</h2>
						<button
							type='button'
							className='px-3 focus:outline-none hover:bg-indigo-50 transition-colors'
							onClick={onClose}
						>
							<FiX className='w-5 h-5 text-slate-500' />
						</button>
					</div>
				)}
				{children}
			</div>
		</div>
	);
};

export default PopupBox;
