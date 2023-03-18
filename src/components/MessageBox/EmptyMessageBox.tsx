import React, { useEffect, useState } from 'react';
import { FriendLabelHeader } from '../FriendLabel';
import MessageList from './MessageList';
import MessageTyper from './MessageTyper';

const EmptyMessageBox = () => {
	return (
		<div className='flex-1 hidden md:flex md:flex-col md:items-stretch'>
			<FriendLabelHeader />
			<MessageList />
			<MessageTyper />
		</div>
	);
};

export default EmptyMessageBox;
