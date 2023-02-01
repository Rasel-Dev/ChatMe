import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
type PropType = {
	isOnline?: boolean;
	isKnown?: boolean;
};

const FriendLabel = ({ isOnline = false, isKnown = false }: PropType) => {
	return (
		<div className='mx-2 p-2 flex items-center hover:bg-indigo-100 rounded-md'>
			<div className='relative flex-shrink-0 w-14 h-14 border border-indigo-200 rounded-full'>
				{!!isKnown && (
					<>
						{isOnline ? (
							<div className='absolute bottom-2 -right-1 w-3 h-3 bg-indigo-500 rounded-full border border-indigo-200'></div>
						) : (
							<div className='absolute bottom-2 -right-1 w-3 h-3 bg-indigo-200 rounded-full border border-indigo-200'></div>
						)}
					</>
				)}
			</div>
			<div className='p-2 flex-1 flex-shrink-0'>
				<h3 className='font-semibold tracking-wide'>User Name</h3>
				{isKnown ? (
					<p className='text-sm font-light tracking-wide text-gray-500'>
						This is my message
					</p>
				) : (
					<div className='mt-1 flex items-center'>
						<button
							type='button'
							className='px-2 py-0.5 bg-indigo-500 tracking-wide text-white font-medium rounded-full text-xs'
						>
							Accept
						</button>
						<button
							type='button'
							className='ml-1 px-2 py-0.5 bg-transparent text-indigo-500 tracking-wide font-medium rounded-full text-xs hover:bg-indigo-200'
						>
							Cancel
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default FriendLabel;

export const FriendLabelHeader = ({ isOnline = false }: PropType) => {
	return (
		<div className='px-4 py-2 flex items-center justify-between border-b border-indigo-200'>
			<div className='flex items-center'>
				<div className='relative w-10 h-10 border border-indigo-200 rounded-full'></div>
				<div className='p-2 flex-1 flex-shrink-0'>
					<h3 className='font-semibold tracking-wide'>User Name</h3>
					{!isOnline ? (
						<p className='text-sm font-light tracking-wide text-indigo-300'>
							Offline
						</p>
					) : (
						<p className='text-sm font-light tracking-wide text-indigo-600'>
							Online
						</p>
					)}
				</div>
			</div>
			<button
				type='button'
				className='outline-none p-2 rounded-full hover:bg-indigo-100'
			>
				<FiMoreVertical className='w-5 h-5 stroke-2 text-gray-600' />
			</button>
		</div>
	);
};
