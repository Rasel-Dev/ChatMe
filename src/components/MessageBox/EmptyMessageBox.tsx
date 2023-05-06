import { useEffect } from 'react';
import { selectMenu, toggleFriendList } from '../../app/features/menuSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import BodyLayout from '../layouts/BodyLayout';

const EmptyMessageBox = () => {
	const { isFriendListOpen } = useAppSelector(selectMenu);
	const Dispatch = useAppDispatch();

	useEffect(() => {
		Dispatch(toggleFriendList(true));
		return () => {
			Dispatch(toggleFriendList(false));
		};
	}, []);
	return (
		<BodyLayout>
			<div className='grid place-content-center min-h-screen select-none'>
				<h1 className='text-4xl text-center text-indigo-300 font-bold tracking-wide'>
					ChatMe
				</h1>
				<p className='m-auto w-2/3 mt-5 text-center tracking-wider text-indigo-300'>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
					molestiae necessitatibus pariatur perspiciatis quas enim odit
					adipisci, sunt eius iure.
				</p>
			</div>
		</BodyLayout>
	);
};

export default EmptyMessageBox;
