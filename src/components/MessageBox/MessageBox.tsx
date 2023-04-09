import React, { useEffect, useRef, useState } from 'react';
import { FriendLabelHeader } from '../FriendLabel';
import MessageTyper from './MessageTyper';
import useAxios from '../../hooks/useAxios';
import { MessageType } from '../../types/custom';
import MessageLabel from './MessageLabel';
import useApp from '../../hooks/useApp';
import Typing from '../Typing';
import MessageList from './MessageList';
import socketInstance from '../../utils/socket';
import BodyLayout from '../Layouts/BodyLayout';

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
			{/* <ul className='px-3 pt-3 flex-1 overflow-y-auto'>
				{chat?.conversations?.map((message) => (
					<MessageLabel
						key={message.id}
						type={message?.cType}
						content={message?.body}
						isMe={!!message?.own}
						widgets={!!message?.widgets}
						timestamp={message?.createdAt || ''}
						isType={message?.onTyping}
						isPoped={!!message?.pop}
						isLoading={typeof message?.id !== 'string'}
					/>
				))}
				<div className='w-full block' ref={messageEndRef} />
			</ul> */}
			<MessageList messages={chat?.conversations || []} />
			<MessageTyper chatId={!chatId ? '' : chatId} />
		</BodyLayout>
	);
};

export default MessageBox;
