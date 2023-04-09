import React, { useEffect, useState } from 'react';
import useApp from '../../hooks/useApp';
import useAxios from '../../hooks/useAxios';
import FriendLabel from '../FriendLabel';

const SearchList = () => {
	const {
		state: { search },
	} = useApp();
	// const categories = ['peoples', 'groups'];
	const [categories, setCategory] = useState<string[]>([]);
	const [selected, setSelected] = useState<string | null>(null);

	useEffect(() => {
		let sel = '';
		const cats: string[] = [];
		if (!!search?.peoples.length) {
			cats.push('peoples');
			if (!sel) sel = 'peoples';
		}
		if (!!search?.groups.length) {
			cats.push('groups');
			if (!sel) sel = 'groups';
		}
		setCategory(cats);
		setSelected(sel);
		return () => {
			setCategory([]);
			setSelected(null);
		};
	}, [search]);

	const categoryHandler = (cat: string) => {
		setSelected(cat);
		// other logics ...
	};
	const axiosPrivate = useAxios();
	return (
		<>
			{!categories.length ? null : (
				<div className='flex mx-2 mt-3 overflow-x-auto'>
					{categories.map((item: string) => (
						<button
							key={item}
							className={`flex items-center px-3 ml-2 mb-2 py-1 text-xs border rounded-full tracking-wide capitalize ${
								item === selected
									? 'bg-indigo-500 text-white'
									: 'text-gray-500 border-indigo-200'
							}`}
							onClick={() => categoryHandler(item)}
						>
							{item}
							{/* {item === 'request' && (
								<div
									className={`pl-1.5 py-0 font-bold ${
										item === selected ? 'text-white' : 'text-indigo-600'
									}`}
								>
									137
								</div>
							)} */}
						</button>
					))}
				</div>
			)}
			{selected === 'peoples' &&
				search?.peoples.map((user) => (
					<FriendLabel
						key={user.id}
						name={user.fullname}
						avater={user?.avater}
						userId={user.id}
					/>
				))}
			{selected === 'groups' &&
				search?.groups.map((user) => (
					<FriendLabel
						key={user.id}
						name={user.subject}
						avater={user?.avater}
						userId={user.id}
					/>
				))}
		</>
	);
};

export default SearchList;
