import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ChatContentType } from '../../../types/custom';
import Delete from '../Delete';
import { ORIGIN } from '../../../utils/axios';

type LabelType = {
	id: string | number;
	threadId: string;
	content: string;
	type?: ChatContentType;
	enableWidgets?: boolean;
	isType?: boolean;
	timestamp?: string;
	isLoading?: boolean;
	isSeened?: boolean;
};

const RightLabel: React.FC<LabelType> = ({
	id,
	threadId,
	type = ChatContentType.TEXT,
	enableWidgets = false,
	isType = false,
	content,
	timestamp,
	isLoading = false,
	isSeened = false,
}) => {
	const [isMenuOpen, setisMenuOpen] = useState(false);

	return (
		<div
			className={`group/msg flex flex-col items-end ${
				!enableWidgets ? 'my-1' : 'mt-1.5 mb-3'
			}`}
		>
			{content === 'removed' ? (
				<div className='max-w-sm md:max-w-xs inline-block px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-400 tracking-wider font-light italic text-sm select-none'>
					You remove message
				</div>
			) : (
				<div className='flex justify-end items-center'>
					{!isLoading ? (
						<div className='flex items-center invisible group-hover/msg:visible relative'>
							{!isMenuOpen ? null : (
								<Delete id={id} threadId={threadId} canRemoveEveryone />
							)}
							<span className='text-xs font-light text-indigo-300 whitespace-nowrap select-none'>
								{!timestamp
									? dayjs(Date.now()).format('HH:mm A')
									: dayjs(timestamp).format('HH:mm A')}
							</span>
							<button
								type='button'
								className='mx-2.5 flex-shrink-0 outline-none w-6 h-6 grid place-content-center rounded-full hover:bg-indigo-100 transition-colors'
								onClick={() => setisMenuOpen((p) => !p)}
							>
								<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
							</button>
						</div>
					) : null}

					{type === ChatContentType.TEXT && (
						<div className='max-w-sm md:max-w-xs inline-block px-3 py-2 rounded-md bg-indigo-500 text-slate-200 tracking-wider font-normal text-sm'>
							{content}
						</div>
					)}
					{type === ChatContentType.IMG && (
						<div className='max-w-md max-h-96 inline-block rounded-md overflow-hidden border border-indigo-100 shadow-lg'>
							<img
								src={
									/^blob:/i.test(content)
										? content
										: `${ORIGIN}static/${content}`
								}
								crossOrigin='anonymous'
								className='object-cover max-w-md max-h-96'
								alt='uploaded'
							/>
						</div>
					)}
				</div>
			)}
			{!(!isLoading && isSeened && enableWidgets) ? null : (
				<span className='mr-1 text-xs font-light text-indigo-400 hidden msg-bottom-label'>
					Seen
				</span>
			)}
			{!isLoading ? null : (
				<span className='mr-1 text-xs font-light text-indigo-300'>
					Sending...
				</span>
			)}
		</div>
	);
};

export default RightLabel;
