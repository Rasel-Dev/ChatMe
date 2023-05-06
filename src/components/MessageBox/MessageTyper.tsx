import React, { useState } from 'react';
import { FiImage, FiSend, FiX } from 'react-icons/fi';
import {
	setNewMessage,
	setSuccessNewMessage,
} from '../../app/features/chatSlice';
import { setLabelMessage } from '../../app/features/friendSlice';
import { useAppDispatch } from '../../hooks/hook';
import { ChatContentType, InputType } from '../../types/custom';
import socketInstance from '../../utils/socket';

type PropTypes = { chatId?: string };

let timeout: any;

const MessageTyper: React.FC<PropTypes> = ({ chatId }) => {
	// const { dispatch } = useApp();
	const Dispatch = useAppDispatch();
	const [text, setText] = useState('');
	const [file, setFile] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);

	const onTyping = (e: InputType) => {
		socketInstance.emit('trigger:typing', chatId, true);
		setText(e.target.value);
		clearTimeout(timeout);
		timeout = setTimeout(
			() => socketInstance.emit('trigger:typing', chatId, false),
			2000
		);
	};

	const handleChange = (e: InputType) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const onRemoveFile = () => {
		setFile(undefined);
		setPreview(null);
	};

	const onSend = () => {
		if (!chatId) {
			alert('Something went wrong !');
			return;
		}
		if (!text && !file) {
			alert('Empty message !');
			return;
		}
		const textTmpId = Math.floor(new Date().valueOf() * Math.random());
		const fileTmpId = Math.floor(new Date().valueOf() * Math.random());

		if (text) {
			Dispatch(
				setNewMessage({
					threadId: chatId,
					id: textTmpId,
					body: text,
					cType: ChatContentType.TEXT,
					own: true,
				})
			);
			// dispatch({
			// 	type: 'APPEND_MESSAGE',
			// 	payload: {
			// 		threadId: chatId,
			// 		id: textTmpId,
			// 		body: text,
			// 		cType: ChatContentType.TEXT,
			// 		own: true,
			// 	},
			// });
			socketInstance.emit('send:message', chatId, text, (status: any) => {
				if (status?.success) {
					Dispatch(
						setSuccessNewMessage({
							temp: textTmpId,
							replace: status?.success,
						})
					);
					Dispatch(
						setLabelMessage({
							threadId: chatId,
							id: status?.success,
							body: text,
							cType: ChatContentType.TEXT,
							own: true,
						})
					);
					// dispatch({
					// 	type: 'APPEAR_MESSAGE_SUCCESS',
					// 	payload: {
					// 		temp: textTmpId,
					// 		replace: status?.success,
					// 	},
					// });
					// dispatch({
					// 	type: 'APPEND_LABEL_MESSAGE',
					// 	payload: {
					// 		threadId: chatId,
					// 		id: status?.success,
					// 		body: text,
					// 		cType: ChatContentType.TEXT,
					// 		own: true,
					// 	},
					// });
				}
			});
		}
		if (file && preview) {
			Dispatch(
				setNewMessage({
					threadId: chatId,
					id: fileTmpId,
					body: preview,
					cType: ChatContentType.IMG,
					own: true,
				})
			);
			// dispatch({
			// 	type: 'APPEND_MESSAGE',
			// 	payload: {
			// 		threadId: chatId,
			// 		id: fileTmpId,
			// 		body: preview,
			// 		cType: ChatContentType.IMG,
			// 		own: true,
			// 	},
			// });
			socketInstance.emit('send:image', chatId, file, (status: any) => {
				if (status?.success) {
					Dispatch(
						setSuccessNewMessage({
							temp: fileTmpId,
							replace: status?.success,
						})
					);
					Dispatch(
						setLabelMessage({
							threadId: chatId,
							id: status?.success,
							body: '',
							cType: ChatContentType.IMG,
							own: true,
						})
					);
					// dispatch({
					// 	type: 'APPEAR_MESSAGE_SUCCESS',
					// 	payload: {
					// 		temp: fileTmpId,
					// 		replace: status?.success,
					// 	},
					// });
					// dispatch({
					// 	type: 'APPEND_LABEL_MESSAGE',
					// 	payload: {
					// 		threadId: chatId,
					// 		id: status?.success,
					// 		body: '',
					// 		cType: ChatContentType.IMG,
					// 		own: true,
					// 	},
					// });
				}
			});
		}

		setText('');
		onRemoveFile();
	};

	return (
		<div className='w-full'>
			{!file || !preview ? null : (
				<div className='flex p-3 bg-indigo-100'>
					<div className='relative border border-indigo-300 rounded-lg'>
						<button
							type='button'
							className='absolute -top-2 -right-2 bg-red-300 rounded-full overflow-hidden opacity-50'
							onClick={onRemoveFile}
						>
							<FiX className='w-5 h-5 stroke-1 text-red-500' />
						</button>
						<img
							className='object-cover h-28 w-28 rounded-lg'
							src={preview}
							alt={'file'}
						/>
					</div>
				</div>
			)}
			<div className='h-16 flex items-stretch bg-white'>
				<label
					htmlFor='file-attach'
					className='grid place-content-center cursor-pointer p-3'
				>
					<FiImage className='w-6 h-6 stroke-1 text-indigo-600' />
					<input
						type='file'
						className='hidden'
						id='file-attach'
						onChange={handleChange}
						title='File Upload'
					/>
				</label>
				<input
					type='text'
					name='message'
					className='bg-transparent w-full outline-none pl-2 pr-4'
					value={text || ''}
					onChange={onTyping}
					autoComplete='off'
					placeholder='Your messsage ...'
					disabled={!chatId}
				/>
				<button
					type='button'
					className='outline-none pl-4 pr-5 bg-transparent'
					onClick={onSend}
					title='Send'
					disabled={!text.length && !file}
				>
					<FiSend
						className={`w-6 h-6 stroke-1 ${
							!text.length && !file ? 'text-indigo-300' : 'text-indigo-600'
						}`}
					/>
				</button>
			</div>
		</div>
	);
};

export default MessageTyper;
