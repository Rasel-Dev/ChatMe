import React from 'react';
import { useParams } from 'react-router-dom';
import FriendList from '../components/FriendList';
import MessageBox from '../components/MessageBox/MessageBox';
import EmptyMessageBox from '../components/MessageBox/EmptyMessageBox';
import ChatStateProvider from '../state/chat/ChatStateProvider';

const MessagePage = () => {
	const { userId } = useParams();

	return (
		<div className='h-full bg-indigo-50'>
			<div className='w-full h-screen flex items-stretch'>
				<FriendList />
				<ChatStateProvider>
					{!userId ? <EmptyMessageBox /> : <MessageBox />}
				</ChatStateProvider>
			</div>
		</div>
	);
};

export default MessagePage;
