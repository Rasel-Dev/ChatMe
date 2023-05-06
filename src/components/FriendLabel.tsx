import React from 'react';
import { FiCornerDownRight, FiImage, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { selectChat } from '../app/features/chatSlice';
import { useAppSelector } from '../hooks/hook';
import { ChatContentType } from '../types/custom';
import { AppName } from '../utils';
import AddRequest from './AddRequest';
import ParformRequest from './ParformRequest';
import Typing from './Typing';
import UserAvater from './UserAvater';
import HomeButton from './buttons/HomeButton';

type PropType = {
	name?: string;
	lastMessage?: string;
	messageType?: ChatContentType;
	avater?: string;
	timestamp?: string;
	isNew?: boolean;
	isOwnerMessage?: boolean;
	isSeened?: boolean;
	isOnline?: boolean;
	isTyping?: boolean;
	threadId?: string;
	userId?: string;
	labelFor?: 'chat' | 'request' | 'people' | 'group';
};

const MessageContainer: React.FC<PropType> = ({
	lastMessage,
	messageType,
	isTyping,
}) => {
	if (isTyping) return <Typing />;

	if (lastMessage === '') return <p className='italic'>You remove message</p>;

	if (messageType === ChatContentType.IMG)
		return <FiImage className='w-4 h-4' />;

	if (messageType === ChatContentType.URI)
		return <FiImage className='w-4 h-4' />;

	return <p>{lastMessage}</p>;
};

const FriendLabel: React.FC<PropType> = ({
	name = '',
	lastMessage = '',
	messageType = ChatContentType.TEXT,
	avater,
	timestamp,
	isNew = false,
	isOwnerMessage = false,
	isSeened = false,
	isOnline = false,
	isTyping = false,
	threadId,
	userId,
	labelFor = 'chat',
}) => {
	return (
		<div className='px-3 py-1 flex items-center hover:bg-indigo-100 transition-colors'>
			<div className='relative flex-shrink-0 w-14 h-14 md:w-12 md:h-12 border border-indigo-200 rounded-full'>
				{threadId || userId ? null : (
					<>
						{isOnline ? (
							<div className='absolute bottom-2.5 -right-1 md:bottom-2 md:-right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-50'></div>
						) : (
							<div className='absolute bottom-2.5 -right-1 md:bottom-2 md:-right-1 w-3 h-3 bg-indigo-200 rounded-full border-2 border-indigo-50'></div>
						)}
					</>
				)}
				<UserAvater avater={avater} />
			</div>
			<div className='p-2 flex-1 flex-shrink-0'>
				<div className='flex items-center justify-between'>
					<h3 className='font-medium tracking-wide text-sm text-slate-600'>
						{!name ? AppName : name}
					</h3>
					{!!timestamp && (
						<p className='text-slate-400 font-normal text-[10px]'>
							{timestamp}
						</p>
					)}
				</div>
				{threadId || userId ? null : (
					<div className={`mt-0.5 flex items-center text-xs tracking-wide`}>
						{!isOwnerMessage || lastMessage === '' || isTyping ? null : (
							<FiCornerDownRight className='w-3 h-3 stroke-2' />
						)}

						{isNew ? (
							<p className='px-2 py-0.5 bg-indigo-200 rounded-full font-normal text-[10px] text-indigo-600'>
								New
							</p>
						) : (
							<div className='ml-1 flex-1'>
								<MessageContainer
									lastMessage={lastMessage}
									messageType={messageType}
									isTyping={isTyping}
								/>
							</div>
						)}

						{!isOwnerMessage && lastMessage && !isTyping ? (
							<span className='ml-1 w-2 h-2 rounded-full bg-indigo-300' />
						) : null}
					</div>
				)}
				{labelFor !== 'request' || !threadId ? null : (
					<ParformRequest threadId={threadId} userId={userId!} />
				)}
				{labelFor !== 'people' || !userId ? null : (
					<div className='mt-1 flex items-center'>
						<AddRequest userId={userId} />
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendLabel;

export const FriendLabelHeader = ({ isOnline = false }: PropType) => {
	const { bio, activeRoom } = useAppSelector(selectChat);

	return (
		<div className='px-2 md:px-4 py-2 flex items-center justify-between border-b border-indigo-200'>
			<div className='flex items-center'>
				<HomeButton />
				<Link
					to={`/${!bio?.participant ? 'g' : 's'}/${activeRoom}`}
					className='flex items-center gap-2'
				>
					<div className='relative w-10 h-10 border border-indigo-200 rounded-full'>
						<UserAvater avater={bio?.avater} />
					</div>
					<div className='flex-1 flex-shrink-0'>
						<h3 className='font-semibold tracking-wide text-slate-600'>
							{bio?.name || 'ChatMe'}
						</h3>
						{!isOnline ? (
							<p className='text-sm font-light tracking-wide text-indigo-300'>
								{!bio?.name ? 'Online' : 'Offline'}
							</p>
						) : (
							<p className='text-sm font-light tracking-wide text-indigo-600'>
								Online
							</p>
						)}
					</div>
				</Link>
			</div>
			<button
				type='button'
				className='outline-none p-2 rounded-full hover:bg-indigo-100'
				title='User Menu'
			>
				<FiMoreVertical className='w-5 h-5 stroke-2 text-gray-600' />
			</button>
		</div>
	);
};
