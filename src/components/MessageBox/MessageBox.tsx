import React, { useEffect, useState } from 'react';
import { FriendLabelHeader } from '../FriendLabel';
import MessageList from './MessageList';
import MessageTyper from './MessageTyper';

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
	{ id: 14, message: 'This is my first message on ChatMe', own: false },
	{ id: 15, message: 'Congrats & welcome', own: true },
	{ id: 16, message: 'What about your ?', own: false },
	{ id: 17, message: 'Yap, exp good', own: true },
	{ id: 18, message: 'By the way i think you dont know', own: true },
	{ id: 19, message: 'this entire things developed by me', own: true },
	{
		id: 20,
		message: 'Bro i thing you gain lots of knowladge abount web dev',
		own: false,
	},
	{ id: 21, message: 'Yes kind of', own: true },
	{ id: 22, message: 'We waiting your upcoming updates', own: false },
	{ id: 23, message: 'we are very exciting...', own: false },
	{ id: 24, message: 'See your later', own: false },
	{ id: 25, message: 'I have to work...', own: false },
	{ id: 26, message: 'ya sure', own: true },
];

interface MessageType {
	id: number;
	message: string;
	own: boolean;
}

export interface WithProfileType extends MessageType {
	showProfile?: boolean;
	onTyping?: boolean;
}

type MessageBoxProps = {
	username: string;
};
const MessageBox = ({ username }: MessageBoxProps) => {
	const [messages, setMessages] = useState<WithProfileType[]>([]);

	useEffect(() => {
		// other api calls
		const prepare = db.map((msg: WithProfileType, index) => {
			// customize sender message
			if (!msg.own) {
				const nextItem = index + 1;
				// const;
				const showProfile = !!db[nextItem] ? !!db[nextItem]?.own : !msg?.own;
				return {
					...msg,
					showProfile,
				};
			}
			// return receiver messages
			return msg;
		});
		setMessages(prepare);
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					id: Math.random(),
					message: 'See your later',
					own: false,
					showProfile: true,
					onTyping: true,
				},
			]);

			// setTimeout(() => {
			// 	scrollToBottom();
			// }, 600);
		}, 5000);

		return () => {
			setMessages([]);
		};
	}, [username]);

	return (
		<div className='flex-1 hidden md:flex md:flex-col md:items-stretch'>
			<FriendLabelHeader />
			<MessageList initMessages={messages} />
			<MessageTyper />
		</div>
	);
};

export default MessageBox;
