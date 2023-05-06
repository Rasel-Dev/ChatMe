import React from 'react';
import { NotificationType } from '../../types/custom';
import UserAvater from '../UserAvater';

type PropType = {
	data: NotificationType;
};
const NotifyLabel: React.FC<PropType> = ({ data }) => {
	return (
		<div
			className={`flex items-start gap-2 p-2 border-t border-indigo-100 ${
				!data.read ? 'bg-white' : 'bg-indigo-50'
			}`}
		>
			<div className='w-8 h-8 border border-indigo-200 flex-shrink-0 rounded-full'>
				<UserAvater avater={data?.avater} />
			</div>
			<div className='w-full flex flex-col'>
				<div className='flex items-center justify-between'>
					<h2 className='font-medium text-sm text-slate-600'>{data.title}</h2>
					<span className='text-[10px] text-slate-400'>{data.createdAt}</span>
				</div>
				<p className='mt-1 tracking-wide text-xs text-slate-500'>
					{data.subject}
				</p>
			</div>
		</div>
	);
};

export default NotifyLabel;
