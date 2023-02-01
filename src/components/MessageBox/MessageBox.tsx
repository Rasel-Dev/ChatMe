import React from 'react';
import { FriendLabelHeader } from '../FriendLabel';
import MessageList from './MessageList';
import MessageTyper from './MessageTyper';

const MessageBox = () => {
	return (
		<div className='flex-1 flex flex-col items-stretch'>
			<FriendLabelHeader />
			<MessageList />
			<MessageTyper />
		</div>
	);
};

export default MessageBox;
