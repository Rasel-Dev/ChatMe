import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
	FiHeart,
	FiMoreVertical,
	FiSmile,
	FiThumbsDown,
	FiThumbsUp,
} from 'react-icons/fi';
import { ChatContentType, ReactType } from '../../../types/custom';
import Typing from '../../Typing';
import useApp from '../../../hooks/useApp';
import UserAvater from '../../UserAvater';
import Delete from './Delete';
import { ORIGIN } from '../../../utils/axios';
import Timestamp from './Timestamp';
import Reactor from './Reactor';
import ReactStatus from './ReactStatus';
import ReactStatusComp from './ReactStatus';

type LabelType = {
	id: string | number;
	threadId: string;
	content: string;
	type?: ChatContentType;
	enableWidgets?: boolean;
	react: ReactType[];
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
	react,
	timestamp,
	isSeened = false,
}) => {
	const {
		state: { chat },
	} = useApp();

	const [isMenuOpen, setisMenuOpen] = useState(0);

	const toggleWidgets = (pos: number) =>
		setisMenuOpen((prev) => (prev === pos ? 0 : pos));

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
				<div className='w-9/12 md:w-auto md:max-w-xl md:inline-block px-2 rounded-md bg-indigo-100'>
					<Typing />
				</div>
			) : (
				<>
					{content === '' ? (
						<div className='max-w-sm md:max-w-xs inline-block px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-400 tracking-wide font-light italic text-sm select-none'>
							You remove message
						</div>
					) : (
						<>
							{type === ChatContentType.TEXT && (
								<div className='relative max-w-sm md:max-w-xs inline-flex flex-col px-3 py-2 rounded-md bg-white shadow-md text-slate-700 tracking-wide font-normal text-sm'>
									<p>{content}</p>
									<ReactStatusComp reactions={react} />
								</div>
							)}
							{type === ChatContentType.IMG && (
								<div className='relative max-w-md max-h-96 inline-flex flex-col'>
									<img
										src={
											/^blob:/i.test(content)
												? content
												: `${ORIGIN}static/${content}`
										}
										crossOrigin='anonymous'
										className='object-cover max-w-md max-h-96 rounded-md'
										alt='uploaded'
									/>
									<ReactStatusComp reactions={react} />
								</div>
							)}
						</>
					)}
				</>
			)}
			{content === '' || isType ? null : (
				<div className='flex items-center invisible group-hover/msg:visible relative flex-wrap'>
					{isMenuOpen === 1 && <Delete id={id} threadId={threadId} />}
					{isMenuOpen === 2 && <Reactor id={id + ''} threadId={threadId} />}
					<div className='ml-2.5 flex items-center'>
						<button
							type='button'
							className='flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-200 hover:bg-indigo-100 transition-colors'
							onClick={() => toggleWidgets(2)}
						>
							<FiSmile className='w-4 h-4 text-gray-600' />
						</button>
						<button
							type='button'
							className='ml-1.5 flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-200 hover:bg-indigo-100 transition-colors'
							onClick={() => toggleWidgets(1)}
						>
							<FiMoreVertical className='w-4 h-4 text-gray-600' />
						</button>
					</div>
					<Timestamp time={timestamp} />
				</div>
			)}
		</div>
	);
};

export default LeftLabel;
