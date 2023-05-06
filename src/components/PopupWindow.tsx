import React from 'react';
import { FiX } from 'react-icons/fi';

type PropType = {
	children?: React.ReactNode;
	onClose?: () => void;
	title?: string;
};

const PopupWindow: React.FC<PropType> = ({ children, onClose, title = '' }) => {
	return (
		<div className='absolute inset-0 flex items-center justify-center z-10'>
			<button
				type='button'
				className='absolute inset-0 bg-black opacity-25 focus:outline-none cursor-auto'
				onClick={onClose}
			/>
			<div className='w-full md:w-2/4 lg:w-1/4 mx-3 md:mx-0 bg-white rounded-md overflow-hidden z-20'>
				{title && (
					<div className='flex items-stretch bg-white border-b border-indigo-100'>
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

export default PopupWindow;
