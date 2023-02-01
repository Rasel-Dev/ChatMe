import React from 'react';
import FriendList from './components/FriendList';
import MessageBox from './components/MessageBox/MessageBox';

const App = () => {
	return (
		<div className='h-full bg-indigo-50'>
			<div className='w-full h-screen flex items-stretch'>
				<FriendList />
				<MessageBox />
			</div>
		</div>
	);
};

export default App;
