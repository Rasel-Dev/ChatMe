import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

type MessageLebelType = {
	content: string;
	isMe?: boolean;
	showProfile?: boolean;
};

const MessageLabel = ({
	content,
	isMe = false,
	showProfile = false,
}: MessageLebelType) => {
	return !isMe ? (
		<div className='flex justify-start items-center my-1.5 message-label'>
			{showProfile ? (
				<div className='mr-2 w-8 h-8 border border-indigo-200 rounded-full'></div>
			) : (
				<div className='mr-2 w-8 h-8'></div>
			)}
			<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block px-3 py-2 rounded-md bg-indigo-200 text-black tracking-wide font-light text-sm'>
				{content}
			</div>
			<button
				type='button'
				className='hidden message-label-menu ml-3 flex-shrink-0 outline-none w-6 h-6 rounded-full hover:bg-indigo-100'
			>
				<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
			</button>
		</div>
	) : (
		<div className='flex justify-end items-center my-1.5 message-label'>
			<button
				type='button'
				className='hidden message-label-menu mr-3 flex-shrink-0 outline-none w-6 h-6 rounded-full hover:bg-indigo-100'
			>
				<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
			</button>
			<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block px-3 py-2 rounded-md bg-indigo-500 text-white tracking-wide font-light text-sm'>
				{content}
			</div>
		</div>
	);
};

export default MessageLabel;
