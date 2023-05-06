import { useEffect } from 'react';
import { clearChat, setReact } from '../../app/features/chatSlice';
import { selectMenu } from '../../app/features/menuSlice';
import { useGetRoomMutation } from '../../app/services/chatApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import useAxios from '../../hooks/useAxios';
import { ReceiveReactType } from '../../types/custom';
import socketInstance from '../../utils/socket';
import { FriendLabelHeader } from '../FriendLabel';
import BodyLayout from '../layouts/BodyLayout';
import MessageList from './MessageList';
import MessageTyper from './MessageTyper';
import ReactionWindow from './ReactionWindow';

const MessageBox = ({ chatId = '' }: { chatId: string }) => {
	const axiosPrivate = useAxios();
	const Dispatch = useAppDispatch();
	const [getRoomData] = useGetRoomMutation();

	const { isFriendListOpen } = useAppSelector(selectMenu);

	useEffect(() => {
		let isMounted = true;
		let RoomDataController: any;
		if (chatId && isMounted) {
			RoomDataController = getRoomData(chatId);
			// Dispatch(toggleFriendList());
			socketInstance.on('react', (react: ReceiveReactType) => {
				Dispatch(setReact(react));
			});
			// socketInstance.on(
			// 	'on:typing',
			// 	(threadId: string, userId: string, isTyping: boolean) => {
			// 		Dispatch(setTyping({ threadId, userId, isTyping }));
			// 	}
			// );
			// socketInstance.on('message', (messageContent: any) => {
			// 	Dispatch(setNewMessage(messageContent));
			// });
			// socketInstance.on('removed', (messageContent: any) => {
			// 	Dispatch(remMessage(messageContent));
			// });
		}
		// const roomData = getRoomData(chatId);
		// (async () => {
		// 	// loading...
		// 	try {
		// const res = await axiosPrivate.get(`/chats/${chatId}`, {
		// 	signal: controller.signal,
		// });
		// const resData = res?.data;
		// console.log('resData :', resData);
		// if (isMounted) {
		// 	// Dispatch(initChats({ threadId: chatId, ...resData }));
		// 	Dispatch(toggleFriendList());
		// 	socketInstance.on('react', (react: ReceiveReactType) => {
		// 		Dispatch(setReact(react));
		// 	});
		// 	socketInstance.on(
		// 		'on:typing',
		// 		(threadId: string, userId: string, isTyping: boolean) => {
		// 			Dispatch(setTyping({ threadId, userId, isTyping }));
		// 		}
		// 	);
		// 	socketInstance.on('message', (messageContent: any) => {
		// 		Dispatch(setNewMessage(messageContent));
		// 	});
		// 	socketInstance.on('removed', (messageContent: any) => {
		// 		Dispatch(remMessage(messageContent));
		// 	});
		// 	console.log('render');
		// }
		// 	} catch (error) {
		// 		console.log('MessageBox', error);
		// 	}
		// })();

		// cleanup
		return () => {
			isMounted = false;
			RoomDataController && RoomDataController.abort();
			Dispatch(clearChat());
		};
	}, [chatId]);

	return (
		<BodyLayout>
			<FriendLabelHeader />
			<MessageList />
			<MessageTyper chatId={!chatId ? '' : chatId} />
			<ReactionWindow />
		</BodyLayout>
	);
};

export default MessageBox;
