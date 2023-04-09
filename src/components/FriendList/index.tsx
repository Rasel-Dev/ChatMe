import React, { useState } from 'react';
import Header from '../Header';
import useApp from '../../hooks/useApp';
import FindFriend from '../FindFriend';
import RequestList from './RequestList';
import SearchList from './SearchList';
import InboxList from './InboxList';

const FriendList = () => {
	const {
		state: { isListMenuOpen, onSearch, requested },
		dispatch,
	} = useApp();
	const categories = ['inbox', 'request'];
	const [category, setCategory] = useState('inbox');

	const categoryHandler = (cat: string) => {
		setCategory(cat);
		// other logics ...
	};

	return (
		<div
			className={`w-full sm:w-4/12 md:w-4/12 lg:w-3/12 h-screen flex flex-col items-stretch border-x border-indigo-200 absolute md:relative md:translate-x-0 inset-y-0 left-0 transform transition duration-200 ease-in-out z-50 bg-indigo-50 ${
				!isListMenuOpen ? '-translate-x-0' : '-translate-x-full'
			}`}
		>
			<Header />
			<FindFriend />
			{onSearch ? null : (
				<div className='flex mx-2 mb-2 overflow-x-auto'>
					{categories.map((item: string) => (
						<button
							key={item}
							className={`flex items-center px-3 mr-2 py-1.5 text-xs rounded-full tracking-wider capitalize font-medium shadow-sm ${
								item === category
									? 'bg-indigo-500 text-white'
									: 'text-slate-500 bg-white'
							}`}
							onClick={() => categoryHandler(item)}
						>
							{item}
							{item === 'request' && !!requested && (
								<div
									className={`pl-1.5 py-0 font-bold ${
										item === category ? 'text-white' : 'text-indigo-600'
									}`}
								>
									{requested}
								</div>
							)}
						</button>
					))}
				</div>
			)}
			<div className='flex-1 overflow-y-auto'>
				{!onSearch ? (
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
