import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook';

const HomeButton = () => {
	const navigate = useNavigate();
	const Dispatch = useAppDispatch();

	const toggleMenu = () => {
		// Dispatch(toggleFriendList());
		navigate('/');
	};
	return (
		<button
			type='button'
			className='outline-none w-10 h-10 mr-2 inline-block md:hidden rounded-full font-bold text-3xl tracking-wide text-indigo-500 hover:bg-indigo-100 transition-colors'
			onClick={toggleMenu}
			title='Go List'
		>
			C
		</button>
	);
};

export default HomeButton;
