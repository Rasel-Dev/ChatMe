import React, { useState } from 'react';
import { useParformRequestMutation } from '../app/services/userApi';
import useAxios from '../hooks/useAxios';

type PropType = {
	threadId: string;
	userId: string;
};

const ParformRequest: React.FC<PropType> = ({ threadId, userId }) => {
	// const [isLoading, setIsLoading] = useState(false);
	const [status, setStatus] = useState<string | null>(null);
	const [parformReq, { isLoading }] = useParformRequestMutation();
	const axiosPrivate = useAxios();

	const onParformRequest = async (action: 'accept' | 'cancel' = 'accept') => {
		// setIsLoading((prev) => !prev);
		if (userId) {
			try {
				await parformReq({
					threadId,
					userId,
					action,
				}).unwrap();
				// await axiosPrivate.put('/users/request', {
				// 	threadId,
				// 	userId: userId,
				// 	action,
				// });
				setStatus(action);
			} catch (error) {
				// console.log('error :', error);
			}
		}
		// setIsLoading((prev) => !prev);
	};

	if (isLoading) {
		return (
			<div className='inline-flex items-center justify-center gap-1'>
				<div
					className='bg-indigo-400 w-1.5 h-1.5 rounded-full animate-pulse'
					style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}
				></div>
				<div
					className='bg-indigo-400 w-1.5 h-1.5 rounded-full animate-pulse'
					style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}
				></div>
				<div
					className='bg-indigo-400 w-1.5 h-1.5 rounded-full animate-pulse'
					style={{ animationDelay: '0.3s', animationDuration: '0.8s' }}
				></div>
			</div>
		);
	}

	if (status === 'accept') {
		return (
			<span className='italic text-slate-400 text-[11px]'>Add success</span>
		);
	} else if (status === 'cancel') {
		return (
			<span className='italic text-slate-400 text-[11px]'>Cancel success</span>
		);
	} else {
		return (
			<div className='mt-1 flex items-center'>
				<button
					type='button'
					className='px-2 py-0.5 bg-indigo-400 hover:bg-indigo-500 tracking-wide font-medium rounded-sm text-white text-xs transition-colors'
					onClick={() => onParformRequest()}
					disabled={isLoading}
				>
					Accept
				</button>
				<button
					type='button'
					className='px-2 py-0.5 ml-2 bg-indigo-100 hover:bg-indigo-200 tracking-wide font-medium rounded-sm text-indigo-500 text-xs transition-colors'
					onClick={() => onParformRequest('cancel')}
					disabled={isLoading}
				>
					Cancel
				</button>
			</div>
		);
	}
};

export default ParformRequest;
