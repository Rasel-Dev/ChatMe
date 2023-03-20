import dayjs from 'dayjs';
import React from 'react';
import { FiCircle, FiMoreVertical } from 'react-icons/fi';
import { ChatContentType } from '../../types/custom';

type MessageLebelType = {
	type: ChatContentType;
	content: string;
	isMe?: boolean;
	widgets?: boolean;
	timestamp?: string;
	isReceiverSeened?: boolean;
	isType?: boolean;
	isPoped?: boolean;
	isLoading?: boolean;
};

const MessageLabel = ({
	content,
	type = ChatContentType.TEXT,
	isMe = false,
	widgets = false,
	isReceiverSeened = true,
	isType = false,
	timestamp = '',
	isPoped = false,
	isLoading = false,
}: MessageLebelType) => {
	// for popup
	if (isPoped)
		return (
			<div className='w-full py-1 bg-transparent text-indigo-300 tracking-widest font-light text-xs text-center select-none'>
				{content}
			</div>
		);
	// is it image file content

	if (type === ChatContentType.IMG)
		return (
			<div className='flex flex-col items-end my-1 message-label'>
				<div
					className='max-w-md max-h-96 rounded-md overflow-hidden'
					// style={{ width: 476, height: 900 }}
				>
					<img src={content} className='object-cover' alt='uploaded' />
				</div>
				{!(!isLoading && isReceiverSeened && widgets) ? null : (
					<span className='mr-1 text-xs font-light text-indigo-400'>Seen</span>
				)}
				{!isLoading ? null : (
					<span className='mr-1 text-xs font-light text-indigo-300'>
						Sending...
					</span>
				)}
			</div>
		);
	// is it plain text content
	// if (!isPoped && type === ChatContentType.TEXT) {

	// }
	return !isMe ? (
		<div className='flex justify-start items-center my-1.5 message-label'>
			{widgets ? (
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
						{!timestamp ? '00:00 AM' : timestamp}
					</span>
				</>
			)}
		</div>
	) : (
		<div className='flex flex-col items-end my-1 message-label'>
			<div className='flex justify-end items-center'>
				{!isLoading ? (
					<>
						<span className='hidden mr-3 text-xs font-light text-indigo-300 message-label-menu select-none'>
							{!timestamp ? dayjs(Date.now()).format('HH:mm A') : timestamp}
						</span>
						<button
							type='button'
							className='hidden message-label-menu mr-3 flex-shrink-0 outline-none w-6 h-6 rounded-full hover:bg-indigo-100'
						>
							<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
						</button>
					</>
				) : null}

				<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block px-3 py-2 rounded-md bg-indigo-500 text-white tracking-wide font-light text-sm'>
					{content}
				</div>
			</div>
			{!(!isLoading && isReceiverSeened && widgets) ? null : (
				<span className='mr-1 text-xs font-light text-indigo-400'>Seen</span>
			)}
			{!isLoading ? null : (
				<span className='mr-1 text-xs font-light text-indigo-300'>
					Sending...
				</span>
			)}
		</div>
	);
};

export default MessageLabel;
