import React, { useCallback, useState } from 'react';
import {
	FiCornerDownRight,
	FiImage,
	FiMenu,
	FiMoreVertical,
} from 'react-icons/fi';
import { AppName } from '../utils';
import useApp from '../hooks/useApp';
import { ChatContentType } from '../types/custom';
import AddRequest from './AddRequest';
import ParformRequest from './ParformRequest';
import UserAvater from './UserAvater';
import { useNavigate } from 'react-router-dom';
import Typing from './Typing';

type PropType = {
	name?: string;
	lastMessage?: string;
	messageType?: ChatContentType;
	avater?: string;
	isNew?: boolean;
	isOwnerMessage?: boolean;
	isSeened?: boolean;
	isOnline?: boolean;
	isTyping?: boolean;
	threadId?: string;
	userId?: string;
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
	isNew = false,
	isOwnerMessage = false,
	isSeened = false,
	isOnline = false,
	isTyping = false,
	threadId,
	userId,
}) => {
	return (
		<div className='px-3 py-2.5 flex items-center hover:bg-indigo-100 transition-colors border-b border-indigo-100'>
			<div className='relative flex-shrink-0 w-12 h-12 md:w-12 md:h-12 border border-indigo-200 rounded-full'>
				{threadId || userId ? null : (
					<>
						{isOnline ? (
							<div className='absolute bottom-0.5 -right-0.5 md:bottom-2 md:-right-1 w-3 h-3 bg-green-400 rounded-full border-[1.5px] border-white'></div>
						) : (
							<div className='absolute bottom-0.5 -right-0.5 md:bottom-2 md:-right-1 w-3 h-3 bg-indigo-200 rounded-full'></div>
						)}
					</>
				)}
				<UserAvater avater={avater} />
			</div>
			<div className='p-2 flex-1 flex-shrink-0'>
				<h3 className='font-medium tracking-wide text-slate-600'>
					{!name ? AppName : name}
				</h3>
				{threadId || userId ? null : (
					<div className={`mt-0.5 flex items-center text-xs tracking-wide`}>
						{!isOwnerMessage || lastMessage === '' ? null : (
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
				{!threadId ? null : <ParformRequest threadId={threadId} />}
				{!userId ? null : (
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
	const {
		state: { chat },
		dispatch,
	} = useApp();

	const navigate = useNavigate();

	const toggleMenu = () => {
		dispatch({ type: 'TOGGLE_LIST' });
		navigate('/');
	};

	return (
		<div className='px-4 py-2 flex items-center justify-between border-b border-indigo-200'>
			<div className='flex items-center'>
				<button
					type='button'
					className='outline-none p-2 mr-3 inline-block md:hidden rounded-full hover:bg-indigo-100'
					onClick={toggleMenu}
					title='Message'
				>
					<FiMenu className='w-6 h-6 stroke-1 text-gray-600' />
				</button>
				<div className='relative w-10 h-10 border border-indigo-200 rounded-full'>
					<UserAvater avater={chat?.bio?.avater} />
				</div>
				<div className='p-2 flex-1 flex-shrink-0'>
					<h3 className='font-semibold tracking-wide text-slate-600'>
						{chat?.bio?.name || 'ChatMe'}
					</h3>
					{!isOnline ? (
						<p className='text-sm font-light tracking-wide text-indigo-300'>
							{!chat?.bio?.name ? 'Online' : 'Offline'}
						</p>
					) : (
						<p className='text-sm font-light tracking-wide text-indigo-600'>
							Online
						</p>
					)}
				</div>
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
