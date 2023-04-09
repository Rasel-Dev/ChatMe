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
type PropType = {
	name?: string;
	lastMessage?: string;
	messageType?: ChatContentType;
	avater?: string;
	isOwnerMessage?: boolean;
	isSeened?: boolean;
	isOnline?: boolean;
	threadId?: string;
	userId?: string;
};

const FriendLabel = ({
	name = '',
	lastMessage = '',
	messageType = ChatContentType.TEXT,
	avater,
	isOwnerMessage = false,
	isSeened = false,
	isOnline = false,
	threadId,
	userId,
}: PropType) => {
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
						{!isOwnerMessage || lastMessage === 'removed' ? null : (
							<FiCornerDownRight className='w-3 h-3 stroke-2' />
						)}

						{!lastMessage ? (
							<p className='px-2 py-0.5 bg-indigo-200 rounded-full font-normal text-[10px] text-indigo-600'>
								New
							</p>
						) : (
							<>
								{lastMessage === 'removed' ? (
									<p className='ml-1 flex-1 italic'>You remove message</p>
								) : (
									<p className='ml-1 flex-1'>
										{messageType === ChatContentType.IMG ? (
											<FiImage className='w-4 h-4' />
										) : (
											lastMessage
										)}
									</p>
								)}
							</>
						)}

						{!isOwnerMessage && lastMessage ? (
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
