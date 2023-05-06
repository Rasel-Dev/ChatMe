import { useEffect, useState } from 'react';
import { FiFrown, FiHeart, FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { selectChat } from '../../app/features/chatSlice';
import { selectMenu, showReactor } from '../../app/features/menuSlice';
import { selectUser } from '../../app/features/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { ReactStatusType } from '../../types/custom';
import PopupBox from '../PopupBox';
import UserLabel from '../UserLabel';

export const ReactionStatus = ({
	reactStatus = ReactStatusType.LIKE,
}: {
	reactStatus: ReactStatusType;
}) => {
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
	// const [messageProfile, setMessageProfile] = useState<ReactorMessageType>({
	// 	avater: '',
	// 	fullname: '',
	// 	body: '',
	// 	cType: ChatContentType.TEXT,
	// 	createdAt: '',
	// 	own: false,
	// });
	// console.log('messageProfile :', messageProfile);
	const [active, setActive] = useState('all');

	const { auth } = useAppSelector(selectUser);
	const { conversations, participants } = useAppSelector(selectChat);
	const { onMessageReactor } = useAppSelector(selectMenu);
	const Dispatch = useAppDispatch();

	useEffect(() => {
		if (onMessageReactor) {
			const reactions = conversations.filter(
				(conv) => conv.id === onMessageReactor
			)?.[0];
			// console.log('reactions :', reactions);
			if (reactions && reactions?.React) {
				/**
				 * Grab reaction content bio data
				 */
				// const participantor = participants.filter(
				// 	(p) => p.id === reactions.userId
				// )?.[0];
				// if (participantor) {
				// 	setMessageProfile((prev) => ({
				// 		fullname: participantor?.fullname,
				// 		avater: participantor?.avater,
				// 		body: reactions.body,
				// 		cType: reactions?.cType || prev.cType,
				// 		createdAt: reactions.createdAt || '',
				// 		own: !!reactions?.own,
				// 	}));
				// }

				const r: any = {};
				reactions?.React.forEach((rct) => {
					// if (!r.includes(rct.cReact)) r.push(rct.cReact);
					// if (rct?.userId === auth) return;
					const rc = rct.cReact as string;
					if (r[rc]) {
						r[rc] = r[rc] + 1;
					} else {
						r[rc] = 1;
					}
				});
				setReactions(reactions?.React);
				setReact(r);
				setActive('all');
			}
		}

		return () => setReact({});
	}, [onMessageReactor]);

	const onCloseReactor = () => {
		Dispatch(showReactor(null));
	};

	const onSwitchMenu = (a: string) => setActive(a);

	return !onMessageReactor ? null : (
		<PopupBox title='Reactions' onClose={onCloseReactor}>
			{/* <div className='px-3 pt-3 flex flex-col gap-2'>
				{reactions
					.filter((r: any) => r.userId === auth)
					.map((ru: any) => (
						<UserLabel
							key={ru.userId}
							fullname={
								participants.filter((p) => p.id === ru.userId)?.[0]?.fullname
							}
							avater={
								participants.filter((p) => p.id === ru.userId)?.[0]?.avater
							}
							reaction={ru.cReact}
						/>
					))}
			</div> */}
			<div className='flex items-center px-3 my-3'>
				{reactions.length > 2 ? (
					<>
						<button
							type='button'
							className={`px-3 py-1.5 flex items-center justify-center gap-2 rounded-full tracking-wide ${
								active === 'all'
									? 'bg-indigo-50 text-indigo-400'
									: 'text-slate-600'
							}`}
							onClick={() => onSwitchMenu('all')}
						>
							<span className='text-sm md:text-md'>All</span>
							<span
								className={`text-xs md:text-sm ${
									active === 'all' ? 'text-indigo-400' : 'text-slate-500'
								}`}
							>
								{!!reactions.length && reactions.length}
							</span>
						</button>
						{Object.keys(reacts).map((r) => (
							<button
								key={r}
								type='button'
								className={`px-3 py-1.5 flex items-center justify-center gap-2 rounded-full tracking-wide ${
									active === r ? 'bg-indigo-50' : ''
								}`}
								onClick={() => onSwitchMenu(r)}
							>
								<ReactionStatus reactStatus={r as ReactStatusType} />
								<span
									className={`text-xs md:text-sm ${
										active === r ? 'text-indigo-400' : 'text-slate-500'
									}`}
								>
									{reacts[r]}
								</span>
							</button>
						))}
					</>
				) : null}
			</div>
			<div className='px-3 flex flex-col gap-2 h-60 overflow-y-scroll scrollbar-hide'>
				{reactions
					.filter(
						(r: any) =>
							r.userId === auth && (r.cReact === active || active === 'all')
					)
					.map((ru: any) => (
						<UserLabel
							key={ru.userId}
							fullname={
								participants.filter((p) => p.id === ru.userId)?.[0]?.fullname
							}
							avater={
								participants.filter((p) => p.id === ru.userId)?.[0]?.avater
							}
							reaction={active === 'all' ? ru.cReact : null}
						/>
					))}
				{reactions
					.filter(
						(r: any) =>
							r.userId !== auth && (r.cReact === active || active === 'all')
					)
					.map((ru: any) => (
						<UserLabel
							key={ru.userId}
							fullname={
								participants.filter((p) => p.id === ru.userId)?.[0]?.fullname
							}
							avater={
								participants.filter((p) => p.id === ru.userId)?.[0]?.avater
							}
							reaction={active === 'all' ? ru.cReact : null}
						/>
					))}
			</div>
		</PopupBox>
	);
};

export default ReactionWindow;
