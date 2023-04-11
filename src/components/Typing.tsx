import React from 'react';

const Typing = () => {
	return (
		<div className='inline-flex items-center justify-center gap-1'>
			<div
				className='bg-indigo-300 w-2 h-2 rounded-full animate-bounce'
				style={{ animationDelay: '0.1s' }}
			></div>
			<div
				className='bg-indigo-300 w-2 h-2 rounded-full animate-bounce'
				style={{ animationDelay: '0.2s' }}
			></div>
			<div
				className='bg-indigo-300 w-2 h-2 rounded-full animate-bounce'
				style={{ animationDelay: '0.3s' }}
			></div>
		</div>
	);
};

export default Typing;
