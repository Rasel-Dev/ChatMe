import { useRequestedFriendsQuery } from '../../app/services/userApi';
import FriendLabel from '../FriendLabel';

const RequestList = () => {
	const { data: requests, isLoading } = useRequestedFriendsQuery();
	// const [requests, setRequests] = useState<LabelProfileType[]>([]);

	// useEffect(() => {
	// 	let isMounted = true;
	// 	let controller: any;

	// 	(async () => {
	// 		// loading...
	// 		try {
	// 			controller = getRequested();
	// 			const requestList = await controller.unwrap();
	// 			if (isMounted) {
	// 				setRequests(requestList);
	// 			}
	// 		} catch (error) {}
	// 	})();

	// 	// cleanup
	// 	return () => {
	// 		isMounted = false;
	// 		controller && controller?.abort();
	// 		setRequests([]);
	// 	};
	// }, []);

	return (
		<>
			{requests?.map((user) => (
				<FriendLabel
					key={user.threadId}
					name={user.user?.fullname}
					avater={user.user?.avater}
					threadId={user.threadId}
					userId={user.userId}
					timestamp={user.timestamp}
					labelFor='request'
				/>
			))}
		</>
	);
};

export default RequestList;
