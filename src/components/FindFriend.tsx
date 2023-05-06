import { useCallback, useState } from 'react';
import { FiLoader, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { selectFriend } from '../app/features/friendSlice';
import { onSearch, toggleGroupCreation } from '../app/features/menuSlice';
import { selectUser } from '../app/features/userSlice';
import { useSearchFriendsMutation } from '../app/services/userApi';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import useAxios from '../hooks/useAxios';
import UserAvater from './UserAvater';
import WidgetButton from './buttons/WidgetButton';

function FindFriend() {
	const { avater } = useAppSelector(selectUser);
	const { friends } = useAppSelector(selectFriend);
	const Dispatch = useAppDispatch();
	const [searchFriend, { isLoading }] = useSearchFriendsMutation();
	const axiosPrivate = useAxios();
	const [isLoad, setLoad] = useState(false);

	const debounce = (func: Function) => {
		let timer: any;
		return function (...args: any) {
			if (args) Dispatch(onSearch(!!args[0]));
			// @ts-ignore
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 500);
		};
	};

	const onFindUser = async (friendName: string) => {
		if (friendName && friendName.length > 3) {
			searchFriend(friendName);
			// setLoad((p) => !p);
			// try {
			// 	const result = await axiosPrivate.get(`/users/find?_q=${value}`);
			// 	Dispatch(initSearch(result?.data));
			// 	// dispatch({ type: 'INIT_SEARCH_FRIEND', payload: result?.data });
			// } catch (error) {
			// 	console.log('error :', error);
			// }
			// setLoad((p) => !p);
		}
	};

	const optimizedFn = useCallback(debounce(onFindUser), []);

	const onCreateNewGroup = () => Dispatch(toggleGroupCreation());

	return (
		<div className='m-2.5 flex items-center gap-2'>
			<Link
				to={'/profile'}
				className='w-8 h-8 border border-indigo-200 flex-shrink-0 rounded-full'
			>
				<UserAvater avater={avater} />
			</Link>
			<div className='relative flex-1'>
				<input
					type='text'
					name='message'
					className='w-full bg-indigo-100 focus:bg-transparent outline-none px-2.5 py-1.5 text-sm text-slate-600 tracking-wide rounded-md border border-indigo-100 focus:border-indigo-200 transition'
					onChange={(e) => optimizedFn(e.target.value)}
					placeholder='Find friend'
				/>
				{!isLoading ? null : (
					<FiLoader className='absolute right-2 animate-spin text-indigo-400 pointer-events-none' />
				)}
			</div>

			{friends.length >= 2 && (
				<WidgetButton title='create group' onClick={onCreateNewGroup}>
					<FiUserPlus className='ml-[1px] w-4 h-4 text-gray-600' />
				</WidgetButton>
			)}
		</div>
	);
}

export default FindFriend;
