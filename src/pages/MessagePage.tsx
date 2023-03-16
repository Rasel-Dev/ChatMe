import React from 'react';
import { useParams } from 'react-router-dom';
import FriendList from '../components/FriendList';
import MessageBox from '../components/MessageBox/MessageBox';

const MessagePage = () => {
	const { username } = useParams();

	return (
		<div className='h-full bg-indigo-50'>
			<div className='w-full h-screen flex items-stretch'>
				<FriendList />
				{!username ? (
					<div className='flex'>s</div>
				) : (
					<MessageBox username={username} />
				)}
			</div>
		</div>
	);
};

export default MessagePage;
