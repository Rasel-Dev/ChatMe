import { useState } from 'react';
import { selectFriend } from '../../app/features/friendSlice';
import { selectMenu } from '../../app/features/menuSlice';
import { useAppSelector } from '../../hooks/hook';
import FindFriend from '../FindFriend';
import Header from '../Header';
import InboxList from './InboxList';
import RequestList from './RequestList';
import SearchList from './SearchList';

const FriendList = () => {
	const categories = ['inbox', 'request'];
	const [category, setCategory] = useState('inbox');
	// const { isLoggedIn } = useAppSelector(selectUser);
	const { requested } = useAppSelector(selectFriend);
	const { isFriendListOpen, isSearching } = useAppSelector(selectMenu);
	// console.log('requested :', 'RENDER!');
	// const [initChats] = useInitChatMutation();
	// useEffect(() => {
	// 	let init: any;
	// 	if (!isLoggedIn) {
	// 		init = initChats(null);
	// 		console.log('isLoggedIn :', isLoggedIn);
	// 	}
	// 	return () => {
	// 		init?.abort();
	// 	};
	// }, [isLoggedIn]);

	const categoryHandler = (cat: string) => {
		setCategory(cat);
	};

	return (
		<div
			className={`w-full sm:w-4/12 md:w-4/12 lg:w-3/12 h-screen flex flex-col items-stretch border-x border-indigo-200 absolute md:relative md:translate-x-0 inset-y-0 left-0 transform transition duration-200 ease-in-out z-10 bg-indigo-50 ${
				isFriendListOpen ? '-translate-x-0' : '-translate-x-full'
			}`}
		>
			<Header />
			<FindFriend />
			{isSearching ? null : (
				<div className='flex mx-2 py-2 overflow-x-auto'>
					{categories.map((item: string) => (
						<button
							key={item}
							className={`relative flex items-center px-3 mr-2 py-1.5 text-xs rounded-full tracking-wider capitalize font-medium shadow-sm ${
								item === category
									? 'bg-indigo-500 text-white'
									: 'text-slate-500 bg-white'
							}`}
							onClick={() => categoryHandler(item)}
						>
							{item}
							{item === 'request' && !!requested && (
								<span
									className={`absolute -top-1 -right-1 px-1 py-0 bg-red-500 rounded-full text-[11px] font-normal ${
										item === category ? 'text-white' : 'text-slate-100'
									}`}
								>
									{requested}
								</span>
							)}
						</button>
					))}
				</div>
			)}
			<div className='flex-1 overflow-y-auto'>
				{!isSearching ? (
					<>
						{category === 'inbox' && <InboxList />}
						{category === 'request' && <RequestList />}
					</>
				) : (
					<div className='mt-3'>
						<SearchList />
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendList;
