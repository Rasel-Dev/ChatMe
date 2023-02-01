import React from 'react';

const Header = () => {
	return (
		<div className='h-14 px-5 flex items-center justify-between'>
			<h1 className='font-bold text-2xl tracking-wide text-indigo-500'>
				Chat.Me
			</h1>
			<div className='flex items-center'>x</div>
		</div>
	);
};

export default Header;
