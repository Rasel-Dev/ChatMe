import React from 'react';
import { selectNotify } from '../../app/features/notifySlice';
import { useAppSelector } from '../../hooks/hook';
import NotifyLabel from './NotifyLabel';

const Notification: React.FC = () => {
	// const {
	// 	state: { notifications },
	// } = useApp();

	const { notifications } = useAppSelector(selectNotify);

	return (
		<div className='absolute top-14 right-0 left-0 mx-2 flex flex-col rounded-md bg-white border border-indigo-100 shadow-lg z-10 overflow-auto'>
			<h2 className='p-2 text-center text-indigo-400 font-medium tracking-wide select-none'>
				Notifications
			</h2>
			{!notifications?.length ? (
				<div className='py-5 text-center text-slate-400 text-xs font-light tracking-wider border-t border-indigo-100 select-none'>
					No notifications yet<i>!</i>
				</div>
			) : (
				<>
					{notifications.map((notify) => (
						<NotifyLabel key={notify.id} data={notify} />
					))}
				</>
			)}
		</div>
	);
};

export default Notification;
