import React, { useEffect, useState } from 'react';
import { ReactStatusType } from '../types/custom';
import useApp from '../hooks/useApp';
import PopupBox from './PopupBox';
import { FiFrown, FiHeart, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import UserAvater from './UserAvater';

const ReactStatus = ({ reactStatus }: { reactStatus: string }) => {
	if (reactStatus === ReactStatusType.LOVE) {
		return <FiHeart className='w-5 h-5 stroke-2 flex-shrink-0 text-pink-500' />;
	}
	if (reactStatus === ReactStatusType.UNLIKE) {
		return (
			<FiThumbsDown className='w-5 h-5 stroke-2 flex-shrink-0 text-red-400' />
		);
	}
	if (reactStatus === ReactStatusType.SAD) {
		return (
			<FiFrown className='w-5 h-5 stroke-2 flex-shrink-0 text-yellow-500' />
		);
	}
	return (
		<FiThumbsUp className='w-5 h-5 stroke-2 flex-shrink-0 text-blue-500' />
	);
};

const ReactionWindow = () => {
	const [reactions, setReactions] = useState<any>([]);
	const [reacts, setReact] = useState<{ [index: string]: number }>({});
	const [active, setActive] = useState('');
	const {
		state: { chat },
		dispatch,
	} = useApp();

	useEffect(() => {
		if (chat?.onMessageReactor) {
			const reactions = chat.conversations.filter(
				(conv) => conv.id === chat?.onMessageReactor
			);
			if (!!reactions.length && reactions[0] && reactions[0]?.React) {
				let activeOpt = '';
				const r: any = {};
				reactions[0]?.React.forEach((rct) => {
					// if (!r.includes(rct.cReact)) r.push(rct.cReact);
					const rc = rct.cReact as string;
					if (!activeOpt) activeOpt = rc;

					if (r[rc]) {
						r[rc] = r[rc] + 1;
					} else {
						r[rc] = 1;
					}
				});
				setReactions(reactions[0]?.React);
				setReact(r);
				setActive(activeOpt);
			}
		}

		return () => setReact({});
	}, [chat?.onMessageReactor]);

	const onCloseReactor = () => {
		dispatch({ type: 'SET_MESSAGE_REACTOR', payload: { messageId: '' } });
	};

	const onSwitchMenu = (a: string) => setActive(a);

	return (
		<PopupBox title='All user reactions' onClose={onCloseReactor}>
			<div className='flex items-center border-b border-indigo-100 px-3'>
				{Object.keys(reacts).map((r) => (
					<button
						key={r}
						type='button'
						className={`px-3 py-1.5 flex items-center justify-center gap-2 ${
							active === r ? 'bg-indigo-50' : ''
						}`}
						onClick={() => onSwitchMenu(r)}
					>
						<ReactStatus reactStatus={r} />
						<span className='text-slate-600 text-xs md:text-sm'>
							{reacts[r]}
						</span>
					</button>
				))}
			</div>
			<div className='p-3 flex flex-col gap-2'>
				{reactions
					.filter((r: any) => r.cReact === active)
					.map((ru: any) => (
						<div key={ru.userId} className='flex items-center gap-2'>
							<div className='relative flex-shrink-0 w-9 h-9 md:w-9 md:h-9 border border-indigo-200 rounded-full'>
								<UserAvater
									avater={
										chat?.participants.filter((p) => p.id === ru.userId)?.[0]
											.avater
									}
								/>
							</div>
							<h3 className='flex-shrink-0 font-normal tracking-wide text-slate-500'>
								{
									chat?.participants.filter((p) => p.id === ru.userId)?.[0]
										.fullname
								}
							</h3>
						</div>
					))}
			</div>
		</PopupBox>
	);
};

export default ReactionWindow;
