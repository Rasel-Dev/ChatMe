import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FiSend } from 'react-icons/fi';
import useAxios from '../../hooks/useAxios';
import useChat from '../../hooks/useChat';

type PropTypes = { chatId?: number };

const MessageTyper: React.FC<PropTypes> = ({ chatId }) => {
	const { dispatch } = useChat();
	const axiosPrivate = useAxios();
	const [text, setText] = useState('');

	const onSend = async () => {
		if (!chatId) {
			alert('Something went wrong !');
			return;
		}
		if (!text) {
			alert('Empty message !');
			return;
		}

		const temp = uuid();
		dispatch({
			type: 'APPEND_MESSAGE',
			payload: { id: temp, content: text, own: true },
		});

		try {
			const res = await axiosPrivate.post(`/chats`, {
				cid: +chatId,
				message: text,
			});
			const resData = res?.data;
			console.log('resData :', resData);
			dispatch({
				type: 'APPEND_MESSAGE_SUCCESS',
				payload: { temp, replace: +resData?.remainer },
			});
			setText('');
		} catch (error) {
			console.log('MessageTyper', error);
		}
	};

	return (
		<div className='h-16 flex items-stretch border-t border-indigo-200'>
			<input
				type='text'
				name='message'
				className='bg-transparent w-full outline-none px-4'
				value={text || ''}
				onChange={(e) => setText(e.target.value)}
				autoComplete='off'
				placeholder='Your messsage ...'
				disabled={!chatId}
			/>
			<button
				type='button'
				className='outline-none pl-4 pr-5 bg-transparent'
				onClick={onSend}
				disabled={!text.length}
			>
				<FiSend
					className={`w-6 h-6 stroke-1 ${
						!text.length ? 'text-indigo-300' : 'text-indigo-600'
					}`}
				/>
			</button>
		</div>
	);
};

export default MessageTyper;
