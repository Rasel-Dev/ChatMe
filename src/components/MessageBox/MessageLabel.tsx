import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';

type MessageLebelType = {
	content: string;
	isMe?: boolean;
	showProfile?: boolean;
	isReceiverSeened?: boolean;
	isType?: boolean;
};

const MessageLabel = ({
	content,
	isMe = false,
	showProfile = false,
	isReceiverSeened = false,
	isType = false,
}: MessageLebelType) => {
	return !isMe ? (
		<div className='flex justify-start items-center my-1.5 message-label'>
			{showProfile ? (
				<div className='mr-2 w-8 h-8 border border-indigo-200 rounded-full'></div>
			) : (
				<div className='mr-2 w-8 h-8'></div>
			)}
			{isType ? (
				<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block pl-3 py-3 rounded-md bg-transparent text-indigo-300 tracking-widest font-light italic text-xs animate-pulse select-none'>
					Typing...
				</div>
			) : (
				<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block px-3 py-2 rounded-md bg-indigo-200 text-black tracking-wide font-light text-sm'>
					{content}
				</div>
			)}
			{isType ? null : (
				<>
					<button
						type='button'
						className='hidden message-label-menu ml-3 flex-shrink-0 outline-none w-6 h-6 rounded-full hover:bg-indigo-100'
					>
						<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
					</button>
					<span className='hidden ml-3 text-xs font-light text-indigo-300 message-label-menu select-none'>
						02:23 AM
					</span>
				</>
			)}
		</div>
	) : (
		<div className='flex flex-col items-end my-1.5 message-label'>
			<div className='flex justify-end items-center'>
				<span className='hidden mr-3 text-xs font-light text-indigo-300 message-label-menu select-none'>
					02:23 AM
				</span>
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
			{isReceiverSeened && (
				<span className='text-xs font-light text-indigo-400'>Seen</span>
			)}
		</div>
	);
};

export default MessageLabel;
