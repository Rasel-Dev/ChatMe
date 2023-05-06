import React from 'react';
import UserAvater from '../UserAvater';

type PropType = {
	groups: { threadId: string; thread: { subject: string; avater: string } }[];
};

const Groups: React.FC<PropType> = ({ groups }) => {
	return (
		<div>
			<div className='grid grid-cols-1 sm:grid-rows-2 md:grid-cols-3 gap-3'>
				{groups.map((user) => (
					<div
						key={user.threadId}
						className='flex items-center bg-slate-50 rounded-lg shadow-sm p-2 gap-2'
					>
						<div className='relative flex-shrink-0 w-12 h-12 md:w-12 md:h-12 border border-indigo-200 rounded-full'>
							<UserAvater avater={user.thread.avater} />
						</div>
						<h3 className='flex-shrink-0 font-medium tracking-wide text-slate-600'>
							{user.thread.subject}
						</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export default Groups;
