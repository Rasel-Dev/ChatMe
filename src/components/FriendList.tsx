import React, { useState } from 'react';
import Header from './Header';
import FriendLabel from './FriendLabel';

const FriendList = () => {
	const categories = ['inbox', 'request'];
	const [category, setCategory] = useState('inbox');

	const categoryHandler = (cat: string) => {
		setCategory(cat);
		// other logics ...
	};

	return (
		<div className='w-3/12 flex flex-col items-stretch border-x border-indigo-200'>
			<Header />
			<div className='flex mx-2 overflow-x-auto'>
				{categories.map((item: string) => (
					<button
						key={item}
						className={`flex items-center px-3 ml-2 mb-2 py-1 text-xs border rounded-full tracking-wide capitalize ${
							item === category
								? 'bg-indigo-500 text-white'
								: 'text-gray-500 border-indigo-200'
						}`}
						onClick={() => categoryHandler(item)}
					>
						{item}
						{item === 'request' && (
							<div
								className={`pl-1.5 py-0 font-bold ${
									item === category ? 'text-white' : 'text-indigo-600'
								}`}
							>
								137
							</div>
						)}
					</button>
				))}
			</div>
			<div className='flex-1 overflow-y-auto'>
				{category === 'inbox' && (
					<>
						<FriendLabel isOnline isKnown />
						<FriendLabel isKnown />
						<FriendLabel isOnline isKnown />
						<FriendLabel isKnown />
					</>
				)}

				{category === 'request' && <FriendLabel />}
			</div>
		</div>
	);
};

export default FriendList;
