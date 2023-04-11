import React, { useState } from 'react';
import { FiLogOut, FiBell, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import useApp from '../hooks/useApp';

const Header = () => {
	const { dispatch } = useApp();
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	const onMenuOpen = () => setMenuOpen((prev) => !prev);

	const logout = () => {
		dispatch({ type: 'UNAUTH' });
		navigate('/login', { replace: true });
	};

	return (
		<div className='relative px-5 pt-4 flex items-center justify-between'>
			<h1 className='font-bold text-2xl tracking-wide text-indigo-500'>
				Chat.Me
			</h1>
			<div className='flex items-center'>
				<button
					type='button'
					className='relative outline-none p-2 rounded-full hover:bg-indigo-100'
					onClick={onMenuOpen}
					title='Settings'
				>
					{menuOpen ? (
						<FiX className='w-5 h-5 stroke-2 text-gray-600' />
					) : (
						<FiBell className='w-5 h-5 stroke-2 text-gray-600' />
					)}
					{menuOpen ? null : (
						<span className='absolute top-1 right-2 flex h-2.5 w-2.5'>
							<span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75'></span>
							<span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500'></span>
						</span>
					)}
				</button>
				<button
					type='button'
					className='ml-2 outline-none p-2 rounded-full hover:bg-indigo-100'
					onClick={logout}
					title='Logout'
				>
					<FiLogOut className='w-5 h-5 stroke-2 text-gray-600' />
				</button>
			</div>

			{!menuOpen ? null : (
				<div className='absolute top-14 right-0 left-0 mx-2 flex flex-col rounded-md bg-white border border-indigo-100 shadow-lg z-10'>
					<h2 className='p-2 text-center text-indigo-400 font-medium border-b border-indigo-100 tracking-wide select-none'>
						Notifications
					</h2>
					<div className='py-5 text-center text-slate-400 text-xs tracking-wide select-none'>
						No notifications yet<i>!</i>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
