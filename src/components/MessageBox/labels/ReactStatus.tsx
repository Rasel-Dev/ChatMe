import React, { useEffect, useState } from 'react';
import { FiFrown, FiHeart, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { showReactor } from '../../../app/features/menuSlice';
import { useAppDispatch } from '../../../hooks/hook';
import { ReactStatusType, ReactType } from '../../../types/custom';

const ReactStatus = ({ reactStatus }: { reactStatus: ReactStatusType }) => {
	if (reactStatus === ReactStatusType.LOVE)
		return (
			<FiHeart className='w-3 h-3 stroke-2 fill-current flex-shrink-0 text-pink-500' />
		);
	if (reactStatus === ReactStatusType.UNLIKE)
		return (
			<FiThumbsDown className='w-3 h-3 stroke-2 fill-current flex-shrink-0 text-red-500' />
		);
	if (reactStatus === ReactStatusType.SAD)
		return (
			<FiFrown className='w-3 h-3 stroke-2 flex-shrink-0 text-yellow-500' />
		);
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
	const [totalReact, setTotalReact] = useState<number>(0);
	const Dispatch = useAppDispatch();

	useEffect(() => {
		let total = 0;
		const r: ReactStatusType[] = [];
		reactions.forEach((rct) => {
			if (!r.includes(rct.cReact)) r.push(rct.cReact);
			total++;
		});
		setReact(r);
		setTotalReact(total);
		// return () => {
		// 	setReact([]);
		// };
	}, [reactions]);

	const onShowReactor = () => {
		Dispatch(showReactor(id));
		// dispatch({ type: 'SET_MESSAGE_REACTOR', payload: { messageId: id } });
	};

	return !reacts.length ? null : (
		<button
			type='button'
			className='absolute right-1 -bottom-1.5 flex items-center bg-white rounded-full px-1 py-0 gap-1 border border-slate-200 z-[1]'
			onClick={onShowReactor}
		>
			{reacts.map((r) => (
				<ReactStatus key={r} reactStatus={r} />
			))}
			{totalReact !== reacts.length && (
				<span className='font-bold text-slate-500 text-[11px]'>
					{totalReact}
				</span>
			)}
		</button>
	);
};

export default ReactStatusComp;
