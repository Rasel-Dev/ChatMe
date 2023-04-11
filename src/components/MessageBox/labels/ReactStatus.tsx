import React, { useEffect, useState } from 'react';
import { ReactStatusType, ReactType } from '../../../types/custom';
import { FiFrown, FiHeart, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import useApp from '../../../hooks/useApp';

const ReactStatus = ({ reactStatus }: { reactStatus: ReactStatusType }) => {
	if (reactStatus === ReactStatusType.LOVE) {
		return (
			<FiHeart className='w-3 h-3 stroke-2 fill-current flex-shrink-0 text-pink-500' />
		);
	}
	if (reactStatus === ReactStatusType.UNLIKE) {
		return (
			<FiThumbsDown className='w-3 h-3 stroke-2 fill-current flex-shrink-0 text-red-500' />
		);
	}
	if (reactStatus === ReactStatusType.SAD) {
		return (
			<FiFrown className='w-3 h-3 stroke-2 flex-shrink-0 text-yellow-500' />
		);
	}
	return (
		<FiThumbsUp className='w-3 h-3 stroke-2 fill-current flex-shrink-0 text-blue-500' />
	);
};

type RSCtype = {
	id: string;
	reactions: ReactType[];
};
const ReactStatusComp: React.FC<RSCtype> = ({ id, reactions }) => {
	const [reacts, setReact] = useState<ReactStatusType[]>([]);
	const { dispatch } = useApp();

	useEffect(() => {
		const r: ReactStatusType[] = [];
		reactions.forEach((rct) => {
			if (!r.includes(rct.cReact)) r.push(rct.cReact);
		});
		setReact(r);

		return () => {
			setReact([]);
		};
	}, [reactions]);

	const onShowReactor = () => {
		dispatch({ type: 'SET_MESSAGE_REACTOR', payload: { messageId: id } });
	};

	return !reacts.length ? null : (
		<button
			type='button'
			className='absolute right-0 -bottom-2 flex items-center bg-white rounded-full px-1 py-0.5 shadow-md gap-1 border border-slate-200'
			onClick={onShowReactor}
		>
			{reacts.map((r) => (
				<ReactStatus key={r} reactStatus={r} />
			))}
		</button>
	);
};

export default ReactStatusComp;
