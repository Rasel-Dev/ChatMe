import React, { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
};

const BodyLayout: React.FC<PropType> = ({ children }) => {
	return (
		<div className='flex-1 h-screen flex flex-col relative'>{children}</div>
	);
};

export default BodyLayout;
