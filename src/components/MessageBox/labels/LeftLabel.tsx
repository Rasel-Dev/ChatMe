import React, { useMemo, useState } from 'react';
import { FiMoreVertical, FiSmile } from 'react-icons/fi';
import { selectChat } from '../../../app/features/chatSlice';
import { useAppSelector } from '../../../hooks/hook';
import { ChatContentType, ReactType } from '../../../types/custom';
import { ORIGIN } from '../../../utils/axios';
import Typing from '../../Typing';
import UserAvater from '../../UserAvater';
import Delete from './Delete';
import ReactStatusComp from './ReactStatus';
import Reactor from './Reactor';
import Timestamp from './Timestamp';
import { MEDIA_URI } from '../../../utils';

type LabelType = {
	id: string | number;
	threadId: string;
	userId: string;
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
	userId,
	type = ChatContentType.TEXT,
	enableWidgets = false,
	isType = false,
	content,
	react,
	timestamp,
	isSeened = false,
}) => {
	const { participants } = useAppSelector(selectChat);

	const [isMenuOpen, setisMenuOpen] = useState(0);

	const toggleWidgets = (pos: number) =>
		setisMenuOpen((prev) => (prev === pos ? 0 : pos));

	const avater = useMemo(
		() => participants.filter((p) => p.id === userId)?.[0]?.avater,
		[userId]
	);

	return (
		<div
			className={`group/msg flex justify-start items-end ${
				!enableWidgets ? 'my-0.5' : 'mt-1.5 mb-3'
			}`}
		>
			{enableWidgets ? (
				<div className='flex-shrink-0 mr-2 w-8 h-8 border border-indigo-200 rounded-full'>
					<UserAvater avater={avater} />
				</div>
			) : (
				<div className='flex-shrink-0 mr-2 w-8 h-8'></div>
			)}
			<div className='flex items-center'>
				{isType ? (
					<div className='w-auto px-2.5 py-1 rounded-2xl bg-indigo-100'>
						<Typing />
					</div>
				) : (
					<>
						{content === '' ? (
							<div className='max-w-sm md:max-w-xs inline-block px-2.5 py-1.5 rounded-2xl border border-slate-300 text-slate-400 tracking-wide font-light italic text-sm select-none'>
								You remove message
							</div>
						) : (
							<>
								{type === ChatContentType.TEXT && (
									<div className='relative max-w-sm md:max-w-xs inline-flex flex-col px-3 py-2 rounded-3xl bg-white shadow-md text-slate-700 tracking-wide font-normal text-sm'>
										<p>{content}</p>
										<ReactStatusComp id={id + ''} reactions={react} />
									</div>
								)}
								{type === ChatContentType.IMG && (
									<div className='relative max-w-[240px] md:max-w-md max-h-max inline-flex flex-col'>
										<img
											src={
												/^blob:/i.test(content)
													? content
													: `${MEDIA_URI}/${content}`
											}
											crossOrigin='anonymous'
											className='object-cover rounded-md'
											alt='uploaded'
										/>
										<ReactStatusComp id={id + ''} reactions={react} />
									</div>
								)}
							</>
						)}
					</>
				)}
				{content === '' || isType ? null : (
					<div className='flex items-center invisible group-hover/msg:visible relative flex-wrap'>
						{isMenuOpen === 2 && <Reactor id={id + ''} threadId={threadId} />}
						<div className='ml-2.5 flex items-center'>
							<button
								type='button'
								className='flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors'
								onClick={() => toggleWidgets(2)}
							>
								<FiSmile className='w-4 h-4 text-gray-600' />
							</button>
							<div className='relative ml-1.5'>
								<button
									type='button'
									className='flex-shrink-0 outline-none w-7 h-7 grid place-content-center rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors'
									onClick={() => toggleWidgets(1)}
								>
									<FiMoreVertical className='w-4 h-4 text-gray-600' />
								</button>
								{isMenuOpen === 1 && <Delete id={id} threadId={threadId} />}
							</div>
						</div>
						<Timestamp time={timestamp} />
					</div>
				)}
			</div>
		</div>
	);
};

export default LeftLabel;
