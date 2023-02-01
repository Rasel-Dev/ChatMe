import React, { useState } from 'react';

import { FiSend } from 'react-icons/fi';

const MessageTyper = () => {
	const [text, setText] = useState('');
	return (
		<div className='h-16 flex items-stretch border-t border-indigo-200'>
			<input
				type='text'
				name='message'
				className='bg-transparent w-full outline-none px-4'
				value={text || ''}
				onChange={(e) => setText(e.target.value)}
				autoComplete='off'
				placeholder='Your messsage ...'
			/>
			<button
				type='button'
				className='outline-none pl-4 pr-5 bg-transparent'
				disabled={!text.length}
			>
				<FiSend
					className={`w-6 h-6 stroke-1 ${
						!text.length ? 'text-indigo-300' : 'text-indigo-600'
					}`}
				/>
			</button>
		</div>
	);
};

export default MessageTyper;
