import React, { useState } from 'react';
import { FiMoreVertical, FiSmile } from 'react-icons/fi';
import { ChatContentType, ReactType } from '../../../types/custom';
import { MEDIA_URI } from '../../../utils';
import Delete from './Delete';
import ReactStatusComp from './ReactStatus';
import Reactor from './Reactor';
import Timestamp from './Timestamp';

type LabelType = {
	id: string | number;
	threadId: string;
	content: string;
	type?: ChatContentType;
	react: ReactType[];
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
	react,
	timestamp,
	isLoading = false,
	isSeened = false,
}) => {
	const [isMenuOpen, setisMenuOpen] = useState(0);

	const toggleWidgets = (pos: number) =>
		setisMenuOpen((prev) => (prev === pos ? 0 : pos));

	return (
		<div
			className={`group/msg flex flex-col items-end ${
				!enableWidgets ? 'my-0.5' : 'mt-1.5 mb-3'
			}`}
		>
			{content === '' ? (
				<div className='max-w-sm md:max-w-xs inline-block px-2.5 py-1.5 rounded-2xl border border-slate-300 text-slate-400 tracking-wider font-light italic text-sm select-none'>
					You remove message
				</div>
			) : (
				<div className='flex justify-end items-center'>
					{!isLoading ? (
						<div className='flex items-center invisible group-hover/msg:visible relative flex-wrap-reverse'>
							{isMenuOpen === 1 && (
								<Delete id={id} threadId={threadId} canRemoveEveryone />
							)}
							{isMenuOpen === 2 && (
								<Reactor id={id + ''} threadId={threadId} isOwn />
							)}
							<Timestamp time={timestamp} />
							<div className='mr-2.5 flex items-center'>
								<button
									type='button'
									className='mr-1.5 flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors'
									onClick={() => toggleWidgets(1)}
								>
									<FiMoreVertical className='w-4 h-4 text-gray-600' />
								</button>
								<button
									type='button'
									className='flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors'
									onClick={() => toggleWidgets(2)}
								>
									<FiSmile className='w-4 h-4 text-gray-600' />
								</button>
							</div>
						</div>
					) : null}

					{type === ChatContentType.TEXT && (
						<div className='relative max-w-sm md:max-w-xs inline-block px-3 py-2 rounded-3xl bg-indigo-500 text-slate-200 tracking-wider font-normal text-sm'>
							<p>{content}</p>
							<ReactStatusComp id={id + ''} reactions={react} />
						</div>
					)}
					{type === ChatContentType.IMG && (
						<div className='relative max-w-[240px] md:max-w-md max-h-max inline-block border border-indigo-100 shadow-lg'>
							<img
								src={
									/^blob:/i.test(content) ? content : `${MEDIA_URI}/${content}`
								}
								crossOrigin='anonymous'
								className='object-cover rounded-md'
								alt='uploaded'
							/>
							<ReactStatusComp id={id + ''} reactions={react} />
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
