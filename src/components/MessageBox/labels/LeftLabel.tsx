import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ChatContentType } from '../../../types/custom';
import Typing from '../../Typing';
import useApp from '../../../hooks/useApp';
import UserAvater from '../../UserAvater';
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
	isSeened?: boolean;
};

const LeftLabel: React.FC<LabelType> = ({
	id,
	threadId,
	type = ChatContentType.TEXT,
	enableWidgets = false,
	isType = false,
	content,
	timestamp,
	isSeened = false,
}) => {
	const {
		state: { chat },
	} = useApp();
	const [isMenuOpen, setisMenuOpen] = useState(false);

	return (
		<div
			className={`group/msg flex justify-start items-center ${
				!enableWidgets ? 'my-1.5' : 'mt-1.5 mb-3'
			}`}
		>
			{enableWidgets ? (
				<div className='flex-shrink-0 mr-2 w-8 h-8 border border-indigo-200 rounded-full'>
					<UserAvater avater={chat?.bio?.avater} />
				</div>
			) : (
				<div className='flex-shrink-0 mr-2 w-8 h-8'></div>
			)}
			{isType ? (
				<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block p-3 rounded-md bg-indigo-100'>
					<Typing />
				</div>
			) : (
				<>
					{content === 'removed' ? (
						<div className='max-w-sm md:max-w-xs inline-block px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-600 tracking-wide font-light italic text-sm select-none'>
							You remove message
						</div>
					) : (
						<>
							{type === ChatContentType.TEXT && (
								<div className='max-w-sm md:max-w-xs inline-block px-3 py-2 rounded-md bg-white shadow-md text-slate-700 tracking-wide font-normal text-sm'>
									{content}
								</div>
							)}
							{type === ChatContentType.IMG && (
								<div className='max-w-md max-h-96 rounded-md overflow-hidden'>
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
						</>
					)}
				</>
			)}
			{content === 'removed' || isType ? null : (
				<div className='flex items-center invisible group-hover/msg:visible relative'>
					{!isMenuOpen ? null : <Delete id={id} threadId={threadId} />}
					<button
						type='button'
						className='mx-2.5 flex-shrink-0 outline-none w-6 h-6 grid place-content-center rounded-full hover:bg-indigo-100 transition-colors'
						onClick={() => setisMenuOpen((p) => !p)}
					>
						<FiMoreVertical className='w-4 h-4 stroke-2 text-gray-600' />
					</button>
					<span className='text-xs font-light text-indigo-300 select-none'>
						{!timestamp
							? dayjs(Date.now()).format('HH:mm A')
							: dayjs(timestamp).format('HH:mm A')}
					</span>
				</div>
			)}
		</div>
	);
};

export default LeftLabel;
