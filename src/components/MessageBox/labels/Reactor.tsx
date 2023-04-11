import React from 'react';
import {
	FiFrown,
	FiHeart,
	FiThumbsDown,
	FiThumbsUp,
	FiTrash2,
} from 'react-icons/fi';
import socketInstance from '../../../utils/socket';
import useApp from '../../../hooks/useApp';

type PropType = {
	id: string;
	threadId: string;
	isOwn?: boolean;
};
type ReactType = 'love' | 'like' | 'unlike' | 'sad';

const Reactor: React.FC<PropType> = ({ id, threadId, isOwn = false }) => {
	const { dispatch } = useApp();
	const onReact = (react: ReactType = 'love') => {
		socketInstance.emit('send:react', threadId, id, react, (status: any) => {
			console.log('status :', status);
			if (status?.success) {
				// dispatch({
				// 	type: 'REMOVE_MESSAGE',
				// 	payload: {
				// 		id,
				// 		body: 'removed',
				// 	},
				// });
			}
		});
	};

	return (
		<div
			className={`absolute -top-[30px] ${
				!isOwn ? 'left-3' : 'right-3'
			} flex items-center rounded-md overflow-hidden shadow-md`}
		>
			<button
				type='button'
				className='focus:outline-none bg-pink-100 w-6 h-6 px-5 py-4 grid place-content-center text-pink-400 hover:text-white hover:bg-pink-600 transition-colors'
				onClick={() => onReact('love')}
			>
				<FiHeart className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className='focus:outline-none bg-blue-100 w-6 h-6 px-5 py-4 grid place-content-center text-blue-400 hover:text-white hover:bg-blue-600 transition-colors'
				onClick={() => onReact('like')}
			>
				<FiThumbsUp className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className='focus:outline-none bg-red-100 w-6 h-6 px-5 py-4 grid place-content-center text-red-400 hover:text-white hover:bg-red-600 transition-colors'
				onClick={() => onReact('unlike')}
			>
				<FiThumbsDown className='w-5 h-5 stroke-1 flex-shrink-0 fill-current' />
			</button>
			<button
				type='button'
				className='focus:outline-none bg-yellow-100 w-6 h-6 px-5 py-4 grid place-content-center text-yellow-600 hover:text-white hover:bg-yellow-600 transition-colors'
				onClick={() => onReact('sad')}
			>
				<FiFrown className='w-5 h-5 flex-shrink-0' />
			</button>
		</div>
	);
};

export default Reactor;
