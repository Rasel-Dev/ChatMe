import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FiBell, FiLogOut, FiSettings, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { selectNotify } from '../app/features/notifySlice';
import { remCredentials } from '../app/features/userSlice';
import { useLogoutMutation } from '../app/services/authApi';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import socketInstance from '../utils/socket';
import WidgetButton from './buttons/WidgetButton';
import Notification from './notification/Notification';

const Header = () => {
	const [_, _s, removeCookie] = useCookies(['logged_in']);
	const { hasUnseenNotice } = useAppSelector(selectNotify);
	const Dispatch = useAppDispatch();
	const [logoutUser] = useLogoutMutation();

	const [isNotificationOpen, setNotification] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	const toggleNotificationWindow = () => setNotification((prev) => !prev);

	const gotoSetting = () => {
		navigate('/settings');
	};

	const onLogout = async () => {
		logoutUser();
		Dispatch(remCredentials());
		removeCookie('logged_in');
		localStorage.clear();
		socketInstance.disconnect();
		// location.reload();
		navigate('/login', { replace: true });
	};

	return (
		<div className='relative px-5 pt-4 flex items-center justify-between'>
			<h1 className='font-bold text-2xl tracking-wide text-indigo-500'>
				ChatMe
			</h1>
			<div className='flex items-center gap-2'>
				<WidgetButton title='Notification' onClick={toggleNotificationWindow}>
					{isNotificationOpen ? (
						<FiX className='w-5 h-5 stroke-2 text-gray-600' />
					) : (
						<FiBell className='w-5 h-5 stroke-2 text-gray-600' />
					)}
					{isNotificationOpen || !hasUnseenNotice ? null : (
						<span className='absolute top-1.5 right-2.5 flex h-2 w-2'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
							<span className='relative inline-flex rounded-full h-2 w-2 bg-indigo-500'></span>
						</span>
					)}
				</WidgetButton>
				<WidgetButton title='Settings' onClick={gotoSetting}>
					<FiSettings className='w-5 h-5 stroke-2 text-gray-600' />
				</WidgetButton>
				<WidgetButton title='Logout' isMobile onClick={onLogout}>
					<FiLogOut className='w-5 h-5 stroke-2 text-gray-600' />
				</WidgetButton>
			</div>

			{isNotificationOpen && <Notification />}
		</div>
	);
};

export default Header;
