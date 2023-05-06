import React from 'react';
import { FiKey } from 'react-icons/fi';
type BtnProp = {
	handler: () => void;
	labelIcon?: React.ReactNode;
	children?: React.ReactNode;
	isLoading?: boolean;
};
const MenuLabel = ({ handler, isLoading, labelIcon, children }: BtnProp) => {
	return (
		<button
			type='button'
			className={`py-2 rounded-lg outline-none tracking-wide flex items-center bg-white shadow-sm text-slate-700`}
			onClick={handler}
			disabled={isLoading}
		>
			<span className='bg-indigo-50 rounded-full overflow-hidden p-2 mx-2.5'>
				{labelIcon}
			</span>
			{children}
		</button>
	);
};

export default MenuLabel;
