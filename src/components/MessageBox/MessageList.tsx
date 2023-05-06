import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { selectChat } from '../../app/features/chatSlice';
import { useAppSelector } from '../../hooks/hook';
import { WithProfileType } from '../../types/custom';
import MessageLabel from './MessageLabel';

const MessageList: React.FC = () => {
	const { conversations } = useAppSelector(selectChat);
	const { chatId } = useParams();
	const messageEl = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (messageEl) {
			const inject = () => {
				messageEl.current?.addEventListener('DOMNodeInserted', (event) => {
					const { currentTarget: target } = event;
					(target as HTMLDivElement)?.scroll({
						top: 0,
						behavior: 'smooth',
					});
					console.log(
						'(target as HTMLDivElement).scrollHeight :',
						(target as HTMLDivElement).scrollHeight
					);
				});
			};
			window.addEventListener('scroll', inject);
			return () => window.removeEventListener('scroll', inject);
		}
	}, [messageEl]);

	return (
		<div
			className='p-3 flex-1 overflow-y-auto flex flex-col-reverse'
			ref={messageEl}
		>
			{conversations.map((message: WithProfileType) => (
				<MessageLabel
					key={message.id}
					id={message?.id || ''}
					threadId={chatId || ''}
					userId={message?.userId || ''}
					type={message?.cType}
					content={message?.body}
					isMe={!!message?.own}
					widgets={!!message?.widgets}
					react={message?.React || []}
					timestamp={message?.createdAt || ''}
					isType={!!message?.onTyping}
					isPoped={!!message?.pop}
					isLoading={typeof message?.id !== 'string'}
				/>
			))}
		</div>
	);
};

export default MessageList;
