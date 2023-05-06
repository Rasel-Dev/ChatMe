import React from 'react';
import { FiTrash, FiTrash2 } from 'react-icons/fi';
import { remMessage } from '../../../app/features/chatSlice';
import { useAppDispatch } from '../../../hooks/hook';
import socketInstance from '../../../utils/socket';

type PropType = {
	id: any;
	threadId: string;
	canRemoveEveryone?: boolean;
};

const Delete: React.FC<PropType> = ({
	id,
	threadId,
	canRemoveEveryone = false,
}) => {
	const Dispatch = useAppDispatch();

	const onRemove = (action: 'onlyme' | 'everyone' = 'onlyme') => {
		socketInstance.emit(
			'remove:content',
			id,
			threadId,
			action,
			(status: any) => {
				if (status?.success) {
					Dispatch(
						remMessage({
							id,
							body: action === 'onlyme' ? 'rem' : null,
						})
					);
				}
			}
		);
	};

	return (
		<div
			className={`w-20 absolute ${
				!canRemoveEveryone ? 'left-8 -top-0' : 'right-20 -top-2'
			} flex flex-col text-[10px] bg-white rounded-md z-[1]`}
		>
			<button
				type='button'
				className='focus:outline-none p-1.5 inline-flex items-center text-slate-600 hover:text-red-500 transition-colors'
				onClick={() => onRemove()}
			>
				<FiTrash className='w-4 h-4 stroke-1 flex-shrink-0 mr-1' />
				<span className='flex-shrink-0'>Only me</span>
			</button>
			{!canRemoveEveryone ? null : (
				<button
					type='button'
					className='focus:outline-none p-1.5 inline-flex items-center text-slate-600 hover:text-red-500 transition-colors border-t border-indigo-100'
					onClick={() => onRemove('everyone')}
				>
					<FiTrash2 className='w-4 h-4 stroke-1 flex-shrink-0 mr-1' />
					<span className='flex-shrink-0'>Everyone</span>
				</button>
			)}
		</div>
	);
};

export default Delete;
