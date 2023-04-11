import React from 'react';
import UserAvater from '../UserAvater';

type PropType = {
	friends: { userId: string; user: { fullname: string; avater: string } }[];
};

const Friends: React.FC<PropType> = ({ friends }) => {
	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-rows-2 md:grid-cols-3 gap-3'>
				{friends.map((user) => (
					<div
						key={user.userId}
						className='flex items-center bg-slate-50 rounded-lg shadow-sm p-2 gap-2'
					>
						<div className='relative flex-shrink-0 w-12 h-12 md:w-12 md:h-12 border border-indigo-200 rounded-full'>
							<UserAvater avater={user.user.avater} />
						</div>
						<h3 className='flex-shrink-0 font-medium tracking-wide text-slate-600'>
							{user.user.fullname}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export default Friends;
