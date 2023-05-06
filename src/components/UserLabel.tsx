import React from 'react';
import { ReactStatusType } from '../types/custom';
import UserAvater from './UserAvater';
import { ReactionStatus } from './messageBox/ReactionWindow';

type PropType = {
	fullname: string;
	avater?: string;
	reaction?: ReactStatusType;
};

const UserLabel: React.FC<PropType> = ({ avater, fullname, reaction }) => {
	return (
		<div className='flex justify-between items-center gap-2'>
			<div className='flex items-center gap-2'>
				<div className='flex-shrink-0 w-9 h-9 md:w-9 md:h-9 border border-indigo-200 rounded-full'>
					<UserAvater avater={avater} />
				</div>
				<h3 className='flex-shrink-0 font-normal tracking-wide text-slate-500'>
					{fullname}
				</h3>
			</div>
			{!!reaction && (
				<div className='px-2'>
					<ReactionStatus reactStatus={reaction} />
				</div>
			)}
		</div>
	);
};

export default UserLabel;
