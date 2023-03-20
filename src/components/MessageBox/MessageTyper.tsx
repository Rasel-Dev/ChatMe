import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FiImage, FiSend, FiX } from 'react-icons/fi';
import useAxios from '../../hooks/useAxios';
import useChat from '../../hooks/useChat';
import { ChatContentType, InputType } from '../../types/custom';

type PropTypes = { chatId?: number };

const MessageTyper: React.FC<PropTypes> = ({ chatId }) => {
	const { dispatch } = useChat();
	const axiosPrivate = useAxios();
	const [text, setText] = useState('');
	const [file, setFile] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);

	function handleChange(e: InputType) {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	}

	const onRemoveFile = () => {
		setFile(undefined);
		setPreview(null);
	};

	const onSend = async () => {
		if (!chatId) {
			alert('Something went wrong !');
			return;
		}
		if (!text && !file) {
			alert('Empty message !');
			return;
		}
		const temp = uuid();
		const message = text;
		const f = file;
		const p = preview;

		if (message)
			dispatch({
				type: 'APPEND_MESSAGE',
				payload: {
					id: temp,
					content: text,
					c_type: ChatContentType.TEXT,
					own: true,
				},
			});
		if (f && p) {
			dispatch({
				type: 'APPEND_MESSAGE',
				payload: {
					id: temp,
					content: preview,
					c_type: ChatContentType.IMG,
					own: true,
				},
			});
		}

		setText('');
		onRemoveFile();

		try {
			const res = await axiosPrivate.post(
				`/chats`,
				{
					cid: +chatId,
					message,
					file: f,
				},
				{
					headers: {
						'content-type': file!.type,
						'content-length': `${file!.size}`,
					},
				}
			);
			const resData = res?.data;
			dispatch({
				type: 'APPEND_MESSAGE_SUCCESS',
				payload: { temp, replace: +resData?.remainer },
			});
		} catch (error) {
			console.log('MessageTyper', error);
		}
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
							className='object-contain h-28 w-28'
							src={preview}
							alt={'file'}
						/>
					</div>
				</div>
			)}
			<div className='h-16 flex items-stretch border-t border-indigo-200'>
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
					/>
				</label>
				<input
					type='text'
					name='message'
					className='bg-transparent w-full outline-none pl-2 pr-4'
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
