import React from 'react';
import { FiTrash, FiTrash2 } from 'react-icons/fi';
import socketInstance from '../../utils/socket';
import useApp from '../../hooks/useApp';

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
	const { dispatch } = useApp();
	const onRemove = (action: 'onlyme' | 'everyone' = 'onlyme') => {
		socketInstance.emit(
			'remove:content',
			id,
			threadId,
			action,
			(status: any) => {
				console.log('status :', status);
				if (status?.success) {
					dispatch({
						type: 'REMOVE_MESSAGE',
						payload: {
							id,
							body: 'removed',
						},
					});
				}
			}
		);
	};

	return (
		<div
			className={`absolute bottom-7 ${
				!canRemoveEveryone ? 'left-3' : 'right-3'
			} flex flex-col text-[10px] gap-1`}
		>
			<button
				type='button'
				className='focus:outline-none bg-white p-1 rounded-md flex items-center text-slate-600 hover:text-red-500 transition-colors'
				onClick={() => onRemove()}
			>
				<FiTrash className='w-4 h-4 stroke-1 flex-shrink-0 mr-1' />
				<span className='flex-shrink-0'>Only me</span>
			</button>
			{!canRemoveEveryone ? null : (
				<button
					type='button'
					className='focus:outline-none bg-white p-1 rounded-md flex items-center text-slate-600 hover:text-red-500 transition-colors'
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
