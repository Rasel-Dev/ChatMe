import React, { useCallback, useState } from 'react';
import useAxios from '../hooks/useAxios';
import useApp from '../hooks/useApp';
import { ORIGIN } from '../utils/axios';
import UserAvater from './UserAvater';
import { FiLoader } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function FindFriend() {
	const {
		state: { userAvater },
		dispatch,
	} = useApp();
	const axiosPrivate = useAxios();
	const [isLoad, setLoad] = useState(false);
	const debounce = (func: Function) => {
		let timer: any;
		return function (...args: any) {
			if (args) dispatch({ type: 'ON_SEARCH_FRIEND', payload: !!args[0] });
			// @ts-ignore
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 500);
		};
	};

	const onFindUser = async (value: string) => {
		if (value && value.length > 3) {
			setLoad((p) => !p);
			try {
				const result = await axiosPrivate.get(`/users/find?_q=${value}`);
				dispatch({ type: 'INIT_SEARCH_FRIEND', payload: result?.data });
			} catch (error) {
				console.log('error :', error);
			}
			setLoad((p) => !p);
		}
	};

	const optimizedFn = useCallback(debounce(onFindUser), []);

	return (
		<div className='m-2.5 flex items-center relative'>
			<Link
				to={'/profile'}
				className='mr-2 w-8 h-8 border border-indigo-200 flex-shrink-0 rounded-full'
			>
				<UserAvater avater={userAvater} />
			</Link>
			<input
				type='text'
				name='message'
				className='bg-indigo-100 focus:bg-transparent flex-1 outline-none px-2.5 py-1.5 text-sm text-slate-600 tracking-wide rounded-md border border-indigo-100 focus:border-indigo-200 transition'
				onChange={(e) => optimizedFn(e.target.value)}
				placeholder='Find friend'
			/>
			{!isLoad ? null : (
				<FiLoader className='absolute right-2 animate-spin text-indigo-400 pointer-events-none' />
			)}
		</div>
	);
}

export default FindFriend;
