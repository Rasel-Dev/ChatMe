import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import useAxios from '../hooks/useAxios';

type PropType = {
	userId: string;
};

const AddRequest: React.FC<PropType> = ({ userId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const axiosPrivate = useAxios();
	const onFriendRequest = async () => {
		// console.log('userId :', userId);
		setIsLoading((prev) => !prev);
		try {
			await axiosPrivate.post('/users/request', { userId });
			setSuccess((prev) => !prev);
		} catch (error) {
			console.log('error :', error);
		}
		setIsLoading((prev) => !prev);
	};
	return !success ? (
		<button
			type='button'
			className='bg-indigo-400 hover:bg-indigo-500 border border-indigo-400 hover:border-indigo-500 tracking-wide text-indigo-400 hover:text-indigo-500 font-medium rounded-sm text-xs transition-colors flex items-center overflow-hidden'
			onClick={onFriendRequest}
			disabled={isLoading}
		>
			<FiPlus className='w-[1.1rem] h-[1.1rem] bg-white' />
			<span className='text-white mx-1.5'>
				{!isLoading ? (
					'Add Request'
				) : (
					<div className='flex items-center justify-center gap-1'>
						<div
							className='bg-white w-1.5 h-1.5 rounded-full animate-pulse'
							style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}
						></div>
						<div
							className='bg-white w-1.5 h-1.5 rounded-full animate-pulse'
							style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
						></div>
						<div
							className='bg-white w-1.5 h-1.5 rounded-full animate-pulse'
							style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}
						></div>
					</div>
				)}
			</span>
		</button>
	) : (
		<span className='italic text-slate-400 text-[11px]'>Request success</span>
	);
};

export default AddRequest;
