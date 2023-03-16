import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
type BtnProp = {
	title: string;
	handler: () => void;
	children?: React.ReactNode;
	transparent?: boolean;
	isLoading?: boolean;
};
const Button = ({
	title,
	handler,
	transparent,
	isLoading,
	children,
}: BtnProp) => {
	return (
		<button
			type='button'
			className={`px-4 p-3 rounded-lg outline-none tracking-wide ${
				transparent
					? 'bg-transparent text-indigo-500 hover:underline'
					: 'bg-indigo-500 text-white'
			}`}
			onClick={handler}
			disabled={isLoading}
		>
			<span className='flex items-center'>
				<span>{title}</span>
				{!isLoading ? null : (
					<FiRefreshCw className='ml-2 w-5 h-5 stroke-2 text-white animate-spin' />
				)}
			</span>
		</button>
	);
};

export default Button;
