import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { selectSearch } from '../../app/features/searchSlice';
import { useAppSelector } from '../../hooks/hook';
import useAxios from '../../hooks/useAxios';
import FriendLabel from '../FriendLabel';

const SearchList = () => {
	const { peoples, groups } = useAppSelector(selectSearch);

	// const categories = ['peoples', 'groups'];
	const [categories, setCategory] = useState<string[]>([]);
	const [selected, setSelected] = useState<string | null>(null);

	useEffect(() => {
		let sel = '';
		const cats: string[] = [];
		if (!!peoples.length) {
			cats.push('peoples');
			if (!sel) sel = 'peoples';
		}
		if (!!groups.length) {
			cats.push('groups');
			if (!sel) sel = 'groups';
		}
		setCategory(cats);
		setSelected(sel);
		return () => {
			setCategory([]);
			setSelected(null);
		};
	}, [peoples, groups]);

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

			{!peoples.length && !groups.length && (
				<p className='text-xs text-indigo-300 flex items-center justify-center gap-2'>
					<FiSearch className='w-4 h-4' />
					<span>
						No result found <i>!</i>
					</span>
				</p>
			)}

			{selected === 'peoples' &&
				peoples.map((user) => (
					<FriendLabel
						key={user.id}
						name={user.fullname}
						avater={user?.avater}
						userId={user.id}
						labelFor='people'
					/>
				))}
			{selected === 'groups' &&
				groups.map((user) => (
					<FriendLabel
						key={user.id}
						name={user.subject}
						avater={user?.avater}
						userId={user.id}
						labelFor='group'
					/>
				))}
		</>
	);
};

export default SearchList;
