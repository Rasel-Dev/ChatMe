import React, { useEffect, useRef, useState } from 'react';
import { WithProfileType } from './MessageBox';
import MessageLabel from './MessageLabel';

type MessageListProp = {
	initMessages?: WithProfileType[];
};

const MessageList = ({ initMessages = [] }: MessageListProp) => {
	const [messages, setMessages] = useState<WithProfileType[]>(initMessages);
	const messageEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setMessages(initMessages);
		return () => setMessages([]);
	}, [initMessages]);

	useEffect(() => {
		// 👇️ scroll to bottom every time messages change
		messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='px-3 pt-3 flex-1 overflow-y-auto'>
			{messages.map((message) => (
				<MessageLabel
					key={message.id}
					content={message.message}
					isMe={message.own}
					showProfile={message.showProfile}
					isType={message.onTyping}
				/>
			))}
			<div className='block' ref={messageEndRef}></div>
		</div>
	);
};

export default MessageList;
