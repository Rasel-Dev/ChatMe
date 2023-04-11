import React, { useCallback, useEffect, useRef, useState } from 'react';
import MessageLabel from './MessageLabel';
import { WithProfileType } from '../../types/custom';
import { useParams } from 'react-router-dom';
import ScrollToBottom from './ScrollToBottom';

type PropType = {
	messages: WithProfileType[];
};

const MessageList: React.FC<PropType> = ({ messages = [] }) => {
	// const {
	// 	state: { chat },
	// } = useApp();
	const { chatId } = useParams();
	const [isAnimated, setAnimated] = useState(false);
	// const [messages, setMessages] = useState<WithProfileType[]>([]);
	const messageEndRef = useRef<HTMLDivElement>(null);

	// useEffect(() => {
	// 	if (chat?.conversations) setMessages(chat?.conversations);
	// 	// console.log('conversations :', conversations);
	// 	return () => setMessages([]);
	// }, [chat?.conversations]);

	const scrollToBottom = useCallback(
		(behavior: 'instant' | 'smooth' = 'instant') => {
			messageEndRef.current?.scrollIntoView({ behavior });
		},
		[]
	);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			console.log('window.scrollY  :', window.scrollY);
		});
	}, []);

	// const scrollToBottom = useCallback(
	// 	(behavior: 'instant' | 'smooth' = 'instant') => {
	// 		window.scrollTo({
	// 			top: messageEndRef.current?.offsetTop,
	// 			behavior,
	// 		});
	// 		console.log(
	// 			'messageEndRef.current?.offsetTop :',
	// 			messageEndRef.current?.offsetTop
	// 		);
	// 	},
	// 	[chat?.conversations]
	// );
	// console.log('chat?.conversations :', chat?.conversations);

	// useEffect(() => {
	// 	// 👇️ scroll to bottom every time messages change
	// 	scrollToBottom('smooth');
	// }, [messages]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		if (messageEndRef.current) {
	// 			messageEndRef.current.scrollIntoView({
	// 				behavior: 'smooth',
	// 				block: 'end',
	// 				inline: 'nearest',
	// 			});
	// 		}
	// 	}, 100);
	// }, [messages]);

	return (
		<div className='p-3 flex-1 overflow-y-auto'>
			{messages.map((message) => (
				<MessageLabel
					key={message.id}
					id={message?.id || ''}
					threadId={chatId || ''}
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
			<ScrollToBottom animated={!!messages.length} />
		</div>
	);
};

export default MessageList;
