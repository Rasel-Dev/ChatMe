import React, { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
};

const CenterLayout: React.FC<PropType> = ({ children }) => {
	return (
		<div className='h-screen w-full flex items-center justify-center'>
			<div className='w-full mx-3 md:mx-0 sm:w-3/5 lg:w-2/5 p-4 bg-white rounded-xl shadow-md'>
				{children}
			</div>
		</div>
	);
};

export default CenterLayout;
