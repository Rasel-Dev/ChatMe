import React from 'react';
import Layouts from './components/Layouts';
import { Routes, Route } from 'react-router-dom';
import MessagePage from './pages/MessagePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RequireAuth from './utils/RequireAuth';

const App = () => {
	return (
		<Layouts>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route
					path='/:username?'
					element={
						<RequireAuth>
							<MessagePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</Layouts>
	);
};

export default App;
