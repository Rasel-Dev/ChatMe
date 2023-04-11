import React, { useState } from 'react';
import Layout from './components/layouts/Layout';
import { Routes, Route } from 'react-router-dom';
import MessagePage from './pages/message/MessagePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RequireAuth from './utils/RequireAuth';
import MessageDashboard from './pages/message/MessageDashboard';
import FriendList from './components/friendList/FriendList';
import ProfilePage from './pages/profile/ProfilePage';
import useApp from './hooks/useApp';

const App = () => {
	const {
		state: { auth },
	} = useApp();

	return (
		<Layout>
			{!auth ? null : <FriendList />}
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
		</Layout>
	);
};

export default App;
