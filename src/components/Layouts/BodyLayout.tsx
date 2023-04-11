import React, { ReactNode } from 'react';

type LayoutProp = {
	children: ReactNode;
};

const BodyLayout = ({ children }: LayoutProp) => {
	return (
		<div className='flex-1 min-h-screen flex flex-col relative'>{children}</div>
	);
};

export default BodyLayout;
