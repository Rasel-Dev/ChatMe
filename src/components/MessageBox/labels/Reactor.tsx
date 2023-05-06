import React, { useEffect, useState } from 'react';
import { FiFrown, FiHeart, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { selectChat, setReact } from '../../../app/features/chatSlice';
import { selectUser } from '../../../app/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hook';
import socketInstance from '../../../utils/socket';

type PropType = {
	id: string;
	threadId: string;
	isOwn?: boolean;
};
type ReactType = 'love' | 'like' | 'unlike' | 'sad';

const Reactor: React.FC<PropType> = ({ id, threadId, isOwn = false }) => {
	const [activeReact, setActiveReact] = useState<ReactType | null>(null);
	const { auth } = useAppSelector(selectUser);
	const { conversations } = useAppSelector(selectChat);
	const Dispatch = useAppDispatch();

	useEffect(() => {
		// const conversations = [...(conversations || [])];
		const convIndex = conversations.findIndex((c) => c.id === id);
		if (convIndex !== -1) {
			const userIdx = conversations[convIndex]?.React?.findIndex(
				(u) => u.userId === auth
			);
			if (userIdx !== -1 && userIdx !== undefined) {
				setActiveReact(
					conversations[convIndex]?.React?.[userIdx]?.cReact || null
				);
			}
		}
		return () => {
			setActiveReact(null);
		};
	}, [conversations, id]);

	const onReact = (react: ReactType = 'love') => {
		socketInstance.emit('send:react', threadId, id, react, (status: any) => {
			if (status) {
				Dispatch(setReact({ messageId: id, userId: auth!, react }));
			}
		});
	};

	return (
		<div
			className={`absolute -top-[30px] ${
				!isOwn ? '-left-14' : '-right-14'
			} flex items-center rounded-md overflow-hidden shadow-md z-[1]`}
		>
			<button
				type='button'
				className={`focus:outline-none w-6 h-6 px-5 py-4 grid place-content-center hover:text-white hover:bg-pink-600 transition-colors ${
					activeReact === 'love'
						? 'text-white bg-pink-600'
						: 'bg-pink-100 text-pink-400'
				}`}
				onClick={() => onReact('love')}
			>
				<FiHeart className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className={`focus:outline-none w-6 h-6 px-5 py-4 grid place-content-center hover:text-white hover:bg-blue-600 transition-colors ${
					activeReact === 'like'
						? 'bg-blue-600 text-white'
						: 'bg-blue-100 text-blue-400'
				}`}
				onClick={() => onReact('like')}
			>
				<FiThumbsUp className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className={`focus:outline-none w-6 h-6 px-5 py-4 grid place-content-center hover:text-white hover:bg-red-600 transition-colors ${
					activeReact === 'unlike'
						? 'bg-red-600 text-white'
						: 'bg-red-100 text-red-400'
				}`}
				onClick={() => onReact('unlike')}
			>
				<FiThumbsDown className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className={`focus:outline-none w-6 h-6 px-5 py-4 grid place-content-center hover:text-white hover:bg-yellow-600 transition-colors ${
					activeReact === 'sad'
						? 'bg-yellow-600 text-white'
						: 'bg-yellow-100 text-yellow-600'
				}`}
				onClick={() => onReact('sad')}
			>
				<FiFrown className='w-5 h-5 flex-shrink-0' />
			</button>
		</div>
	);
};

export default Reactor;
