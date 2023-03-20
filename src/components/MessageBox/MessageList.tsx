import React, { useEffect, useRef, useState } from 'react';
import { WithProfileType } from './MessageBox';
import MessageLabel from './MessageLabel';
import useChat from '../../hooks/useChat';

type MessageListProp = {
	initMessages?: WithProfileType[];
};

const MessageList = () => {
	const {
		chatState: { conversations },
	} = useChat();

	const [messages, setMessages] = useState<WithProfileType[]>([]);
	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (conversations) setMessages(conversations);
		// console.log('conversations :', conversations);
		return () => setMessages([]);
	}, [conversations]);

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='px-3 pt-3 flex-1 overflow-y-auto'>
			{messages.map((message) => (
				<MessageLabel
					key={message.id}
					type={message.c_type}
					content={message?.content}
					isMe={!!message?.own}
					widgets={!!message?.widgets}
					timestamp={message?.at || ''}
					isType={message?.onTyping}
					isPoped={!!message?.pop}
					isLoading={typeof message?.id !== 'number'}
				/>
			))}
			<div className='block' ref={messageEndRef}></div>
		</div>
	);
};

export default MessageList;
