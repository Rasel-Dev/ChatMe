import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { LabelProfileType } from '../../types/custom';
import FriendLabel from '../FriendLabel';
import useApp from '../../hooks/useApp';

const RequestList = () => {
	const {
		state: { requests },
		dispatch,
	} = useApp();

	const axiosPrivate = useAxios();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		(async () => {
			// loading...
			try {
				const res = await axiosPrivate.get(`/users/request`, {
					signal: controller.signal,
				});
				const resData = res?.data;
				if (isMounted) {
					dispatch({ type: 'INIT_REQUEST_FRIEND', payload: resData });
				}
			} catch (error) {
				console.log('MessageBox', error);
			}
		})();

		// cleanup
		return () => {
			isMounted = false;
			controller.abort();
			dispatch({ type: 'INIT_REQUEST_FRIEND', payload: [] });
		};
	}, [axiosPrivate]);

	// const onAction = async (threadId: string, action: 'accept' | 'cancel') => {
	// 	const user = users.filter((u) => u.threadId === threadId);
	// 	if (user[0]) {
	// 		try {
	// 			await axiosPrivate.put('/users/request', {
	// 				threadId,
	// 				userId: user[0].userId,
	// 				action,
	// 			});
	// 			setUsers((user) => user.filter((u) => u.threadId !== threadId));
	// 		} catch (error) {
	// 			console.log('error :', error);
	// 		}
	// 	}
	// };

	return (
		<>
			{requests?.map((user) => (
				<FriendLabel
					key={user.threadId}
					name={user.user?.fullname}
					avater={user.user?.avater}
					threadId={user.threadId}
				/>
			))}
		</>
	);
};

export default RequestList;
