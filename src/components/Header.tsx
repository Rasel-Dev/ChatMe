import React, { useState } from 'react';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate();

	const onMenuOpen = () => setMenuOpen((prev) => !prev);

	const logout = () => {
		localStorage.clear();
		navigate('/login', { replace: true });
	};

	return (
		<div className='h-14 px-5 flex items-center justify-between'>
			<h1 className='font-bold text-2xl tracking-wide text-indigo-500'>
				Chat.Me
			</h1>
			<div className='relative flex items-center'>
				<button
					type='button'
					className='outline-none p-2 rounded-full hover:bg-indigo-100'
					onClick={onMenuOpen}
				>
					{menuOpen ? (
						<FiX className='w-5 h-5 stroke-2 text-gray-600' />
					) : (
						<FiMenu className='w-5 h-5 stroke-2 text-gray-600' />
					)}
				</button>
				<button
					type='button'
					className='ml-2 outline-none p-2 rounded-full hover:bg-indigo-100'
					onClick={logout}
				>
					<FiLogOut className='w-5 h-5 stroke-2 text-gray-600' />
				</button>
				{/* <div className='absolute top-9 right-0 flex flex-col rounded-md bg-white shadow-lg'>
					<button type='button' className='w-full p-2'>
						Logout
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default Header;
