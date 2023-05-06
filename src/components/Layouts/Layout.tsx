import React, { ReactNode } from 'react';

type PropType = {
	children: ReactNode;
};

const Layout: React.FC<PropType> = ({ children }) => {
	return (
		<div className='relative min-h-full md:flex bg-indigo-50'>{children}</div>
	);
};

export default Layout;
