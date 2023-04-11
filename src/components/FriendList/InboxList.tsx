import React from 'react';
import { NavLink } from 'react-router-dom';
import FriendLabel from '../FriendLabel';
import useApp from '../../hooks/useApp';

const InboxList = () => {
	const {
		state: { friends },
	} = useApp();

	return (
		<>
			{friends?.map((friend) => (
				<React.Fragment key={friend.threadId}>
					<NavLink
						to={`/t/${friend.threadId}`}
						replace
						className={(navData) =>
							!navData.isActive
								? `${
										!friend?.own
											? 'text-slate-400 font-medium'
											: 'text-slate-400 font-light'
								  }`
								: 'block bg-indigo-100 text-slate-400 font-light'
						}
					>
						<FriendLabel
							name={friend?.user?.fullname}
							avater={friend?.user?.avater}
							lastMessage={friend?.body}
							messageType={friend?.cType}
							isNew={typeof friend?.body !== 'string'}
							isOwnerMessage={!!friend?.own}
							isOnline={!!friend?.online}
							isTyping={!!friend?.typing}
						/>
					</NavLink>
				</React.Fragment>
			))}
		</>
	);
};

export default InboxList;
