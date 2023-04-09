import React from 'react';
import Layouts from './components/Layouts';
import { Routes, Route } from 'react-router-dom';
import MessagePage from './pages/message/MessagePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RequireAuth from './utils/RequireAuth';
import MessageDashboard from './pages/message/MessageDashboard';
import FriendList from './components/FriendList';
import ProfilePage from './pages/profile/ProfilePage';

const App = () => {
	const token = localStorage.getItem('_token');
	return (
		<Layouts>
			{!token ? null : <FriendList />}
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route
					path='/'
					element={
						<RequireAuth>
							<MessageDashboard />
						</RequireAuth>
					}
				/>
				<Route
					path='/t/:chatId'
					element={
						<RequireAuth>
							<MessagePage />
						</RequireAuth>
					}
				/>
				<Route
					path='/profile'
					element={
						<RequireAuth>
							<ProfilePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</Layouts>
	);
};

export default App;
