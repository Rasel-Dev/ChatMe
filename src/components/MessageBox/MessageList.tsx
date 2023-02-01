import React, { useEffect, useState } from 'react';
import MessageLabel from './MessageLabel';

const db = [
	{ id: 1, message: 'This is my first message on ChatMe', own: false },
	{ id: 2, message: 'Congrats & welcome', own: true },
	{ id: 3, message: 'What about your ?', own: false },
	{ id: 4, message: 'Yap, exp good', own: true },
	{ id: 5, message: 'By the way i think you dont know', own: true },
	{ id: 6, message: 'this entire things developed by me', own: true },
	{
		id: 7,
		message: 'Bro i thing you gain lots of knowladge abount web dev',
		own: false,
	},
	{ id: 8, message: 'Yes kind of', own: true },
	{ id: 9, message: 'We waiting your upcoming updates', own: false },
	{ id: 10, message: 'we are very exciting...', own: false },
	{ id: 11, message: 'See your later', own: false },
	{ id: 12, message: 'I have to work...', own: false },
	{ id: 13, message: 'ya sure', own: true },
];

interface MessageType {
	id: number;
	message: string;
	own: boolean;
}

interface WithProfileType extends MessageType {
	showProfile?: boolean;
}

const MessageList = () => {
	const [messages, setMessages] = useState<WithProfileType[]>([]);

	useEffect(() => {
		const prepare = db.map((msg: WithProfileType, index) => {
			// customize sender message
			if (!msg.own) {
				const nextItem = index + 1;
				return {
					...msg,
					showProfile: !!db[nextItem] ? !!db[nextItem]?.own : !msg?.own,
				};
			}
			// return receiver messages
			return msg;
		});
		setMessages(prepare);

		return () => {
			setMessages([]);
		};
	}, []);

	return (
		<div className='px-3 pt-3 flex-1 overflow-y-auto'>
			{messages.map((message) => (
				<MessageLabel
					key={message.id}
					content={message.message}
					isMe={message.own}
					showProfile={message.showProfile}
				/>
			))}
		</div>
	);
};

export default MessageList;
