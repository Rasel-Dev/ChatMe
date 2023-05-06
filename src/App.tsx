import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Outlet, Route, Routes } from 'react-router-dom';
import { remMessage, setNewMessage, setTyping } from './app/features/chatSlice';
import {
	remLabelMessage,
	setFriendActivities,
	setLabelMessage,
	setLabelTyping,
	updateRequestCounter,
	userOffline,
	userOnline,
} from './app/features/friendSlice';
import { selectMenu } from './app/features/menuSlice';
import { addNotify } from './app/features/notifySlice';
import { selectUser } from './app/features/userSlice';
import { useGetChatDashboardMutation } from './app/services/chatApi';
import GroupCreate from './components/GroupCreate';
import FriendList from './components/friendList/FriendList';
import Layout from './components/layouts/Layout';
import { useAppDispatch, useAppSelector } from './hooks/hook';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MessageDashboard from './pages/message/MessageDashboard';
import MessagePage from './pages/message/MessagePage';
import RoomProfilePage from './pages/message/RoomProfilePage';
import SingleProfilePage from './pages/message/SingleProfilePage';
import ProfilePage from './pages/profile/ProfilePage';
import { ReturnSocketSubscribeType } from './types/custom';
import RequireAuth from './utils/RequireAuth';
import socketInstance from './utils/socket';
import SettingsPage from './pages/settings/SettingsPage';

const App = () => {
	const [{ logged_in }] = useCookies(['logged_in']);
	// console.log('logged_in :', logged_in);
	const { isLoggedIn } = useAppSelector(selectUser);
	const { onGroupCreation } = useAppSelector(selectMenu);
	const Dispatch = useAppDispatch();

	const [getDashboard] = useGetChatDashboardMutation();

	useEffect(() => {
		// let hasLoggedIn = false;
		// let chatController: any;

		if (logged_in) {
			const chatController = getDashboard();
			// hasLoggedIn = true;
			return () => {
				chatController.abort();
			};
		}

		// cleanup
		// return () => {
		// 	chatController && chatController?.abort();
		// };
	}, [logged_in]);

	useEffect(() => {
		if (isLoggedIn) {
			socketInstance.connect();
			socketInstance.emit(
				'subscribe',
				(err: Error | null, data: ReturnSocketSubscribeType[]) => {
					if (err) {
						console.log('NO AUTH');
					}
					if (data && !!data.length) {
						Dispatch(setFriendActivities(data));
					}
				}
			);
			socketInstance.on('notification', (data: any) => {
				Dispatch(addNotify(data));
			});
			socketInstance.on('frq', (reqCount: number) => {
				Dispatch(updateRequestCounter(reqCount));
			});
			socketInstance.on('status:online', (userId: string) => {
				Dispatch(userOnline(userId));
			});
			socketInstance.on('status:offline', (userId: string) => {
				Dispatch(userOffline(userId));
			});
			socketInstance.on(
				'on:typing',
				(threadId: string, userId: string, isTyping: boolean) => {
					Dispatch(setLabelTyping({ threadId, userId, isTyping }));
					Dispatch(setTyping({ threadId, userId, isTyping }));
				}
			);
			socketInstance.on('message', (messageContent: any) => {
				Dispatch(setLabelMessage(messageContent));
				Dispatch(setNewMessage(messageContent));
			});
			socketInstance.on('removed', (messageContent: any) => {
				Dispatch(remLabelMessage(messageContent));
				Dispatch(remMessage(messageContent));
			});
		}

		return () => {
			if (isLoggedIn) {
				socketInstance.off('notification');
				socketInstance.off('frq');
				socketInstance.off('status:online');
				socketInstance.off('status:offline');
				socketInstance.off('on:typing');
				socketInstance.off('message');
				socketInstance.off('removed');
				socketInstance.disconnect();
			}
		};
	}, [isLoggedIn]);

	return (
		<Layout>
			{(logged_in || isLoggedIn) && <FriendList />}
			<Routes>
				<Route path='/' element={<Outlet />}>
					<Route index path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route element={<RequireAuth />}>
						<Route index element={<MessageDashboard />} />
						<Route path='/t/:chatId' element={<MessagePage />} />
						<Route path='/g/:chatId' element={<RoomProfilePage />} />
						<Route path='/s/:chatId' element={<SingleProfilePage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/settings' element={<SettingsPage />} />
					</Route>
				</Route>
			</Routes>
			{onGroupCreation && <GroupCreate />}
		</Layout>
	);
};

export default App;
