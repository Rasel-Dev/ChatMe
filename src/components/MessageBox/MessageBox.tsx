import React, { useEffect, useRef, useState } from 'react';
import { FriendLabelHeader } from '../FriendLabel';
import MessageTyper from './MessageTyper';
import useAxios from '../../hooks/useAxios';
import useApp from '../../hooks/useApp';
import MessageList from './MessageList';
import BodyLayout from '../layouts/BodyLayout';
import PopupBox from '../PopupBox';
import ReactionWindow from '../ReactionWindow';

const MessageBox = ({ chatId = '' }: { chatId: string }) => {
	const {
		state: { chat },
		dispatch,
	} = useApp();
	const axiosPrivate = useAxios();

	const messageEndRef = useRef<HTMLDivElement>(null);
	const [IsAnimated, setIsAnimated] = useState(false);

	const scrollToBottom = (behavior: 'instant' | 'smooth' = 'instant') => {
		messageEndRef.current?.scrollIntoView({ behavior });
	};

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		(async () => {
			// loading...
			try {
				const res = await axiosPrivate.get(`/chats/${chatId}`, {
					signal: controller.signal,
				});
				const resData = res?.data;
				// console.log('resData :', resData);
				if (isMounted) {
					dispatch({
						type: 'INIT_CHAT',
						payload: { threadId: chatId, ...resData },
					});
					dispatch({
						type: 'TOGGLE_LIST',
					});
					// setTimeout(() => {
					// 	console.log('Before');

					// 	dispatch({
					// 		type: 'TOGGLE_TYPING',
					// 		payload: {
					// 			threadId: '05829122-8022-4bc2-9441-de82a285ee35',
					// 			userId: '249888fd-e1f2-4681-9682-badc622b4a38',
					// 			isTyping: true,
					// 		},
					// 	});
					// 	setTimeout(() => {
					// 		dispatch({
					// 			type: 'TOGGLE_TYPING',
					// 			payload: {
					// 				threadId: '05829122-8022-4bc2-9441-de82a285ee35',
					// 				userId: '249888fd-e1f2-4681-9682-badc622b4a38',
					// 				isTyping: false,
					// 			},
					// 		});
					// 	}, 10000);
					// 	console.log('After');
					// }, 5000);
					// socketInstance.on('message', (messageContent: any) => {
					// 	console.log('messageContent :', messageContent);
					// 	// dispatch({
					// 	// 	type: 'APPEND_LABEL_MESSAGE',
					// 	// 	payload: { ...messageContent },
					// 	// });
					// 	dispatch({
					// 		type: 'APPEND_MESSAGE',
					// 		payload: messageContent,
					// 	});
					// });
				}
			} catch (error) {
				console.log('MessageBox', error);
			}
		})();

		// cleanup
		return () => {
			isMounted = false;
			controller.abort();
			dispatch({ type: 'CLEAN_CHAT_WINDOW' });
		};
	}, [axiosPrivate, chatId]);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			console.log('window.scrollY  :', window.scrollY);
		});
	}, []);

	// useEffect(() => {
	// 	// 👇️ scroll to bottom every time messages change
	// 	if (IsAnimated) {
	// 		scrollToBottom('smooth');
	// 	}
	// 	if (!IsAnimated && !!chat?.conversations.length) {
	// 		console.log(
	// 			'!IsAnimated && !!chat?.conversations.length :',
	// 			IsAnimated,
	// 			chat?.conversations.length
	// 		);
	// 		scrollToBottom();
	// 		setIsAnimated(true);
	// 	}
	// 	// messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	// }, [chat?.conversations]);

	return (
		<BodyLayout>
			<FriendLabelHeader />
			<MessageList messages={chat?.conversations || []} />
			<MessageTyper chatId={!chatId ? '' : chatId} />
			{chat?.activeRoom && chat?.onMessageReactor && <ReactionWindow />}
		</BodyLayout>
	);
};

export default MessageBox;
