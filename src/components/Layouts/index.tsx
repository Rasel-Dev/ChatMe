import React, { ReactNode } from 'react';

type LayoutProp = {
	children: ReactNode;
};

const Layouts = ({ children }: LayoutProp) => {
	return (
		<div className='relative min-h-full md:flex bg-indigo-50'>{children}</div>
	);
};

export default Layouts;
