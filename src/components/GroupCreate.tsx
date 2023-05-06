import { useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { selectFriend } from '../app/features/friendSlice';
import { toggleGroupCreation } from '../app/features/menuSlice';
import { useCreateGroupMutation } from '../app/services/groupApi';
import { useAppDispatch, useAppSelector } from '../hooks/hook';
import useAxios from '../hooks/useAxios';
import { InputType } from '../types/custom';
import PopupWindow from './PopupWindow';
import UserLabel from './UserLabel';
import Button from './buttons/Button';
import AvaterInput from './inputs/AvaterInput';
import Input from './inputs/Input';

const GroupCreate = () => {
	const { friends } = useAppSelector(selectFriend);
	const Dispatch = useAppDispatch();
	const [createNewGroup, { isLoading }] = useCreateGroupMutation();
	const [participants, setParticipants] = useState<string[]>([]);
	const axiosPrivate = useAxios();
	const [avater, setAvater] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);
	const [name, setName] = useState('');
	const [errors, setErrors] = useState<{ [index: string]: string | boolean }>(
		{}
	);

	function onChangeProfile(e: InputType) {
		if (e.target.files && e.target.files[0]) {
			setAvater(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	}

	const onSelectParticipant = (e: InputType) => {
		const p = [...participants];
		const index = p.findIndex((id) => id === e.target.value);

		if (index !== -1) {
			p.splice(index, 1);
		} else {
			p.push(e.target.value);
		}

		setParticipants(p);
	};

	const onClose = () => {
		Dispatch(toggleGroupCreation());
	};

	const isValid = () => {
		const err: { [index: string]: string | boolean } = {};
		//level 1
		if (!name) err.name = 'Group name is required!';
		if (participants.length < 2)
			err.participant = 'Need at least 2 user to create group!';
		//level 2
		if (!err?.name && (name.length < 5 || name.length > 100))
			err.name = 'Group name should be 5 - 100 charecters!';

		if (!!Object.keys(err).length || !!Object.keys(errors).length) {
			setErrors((prev) => ({ ...prev, ...err }));
			return false;
		}
		return true;
	};

	const onSubmit = async () => {
		if (isValid()) {
			const formData = new FormData();
			formData.append('name', name);
			formData.append('participants', JSON.stringify(participants));
			formData.append('avater', avater!);
			createNewGroup(formData);
		}
	};

	return (
		<PopupWindow title='Create new group' onClose={onClose}>
			<div className='p-3'>
				<div className='grid place-content-center mb-3'>
					<AvaterInput
						preview={preview}
						id='group-avater'
						onChange={onChangeProfile}
						size={'w-28 h-28'}
					/>
				</div>
				<Input
					name='group'
					value={name}
					hint='Group Name'
					handler={(e) => setName(e.target.value)}
					isLoading={isLoading}
				/>
			</div>
			{friends.filter((f) => !f.user?.group).length && (
				<div className='p-3 flex flex-col gap-3 select-none max-h-60 overflow-y-scroll'>
					{friends
						.filter((f) => !f.user?.group)
						.map((friend) => (
							<label
								htmlFor={friend.userId}
								key={friend.userId}
								className='flex items-center gap-3 cursor-pointer'
							>
								<input
									type='checkbox'
									value={friend.userId}
									id={friend.userId}
									className='hidden'
									onChange={onSelectParticipant}
									checked={participants.includes(friend.userId!)}
								/>
								{!participants.includes(friend.userId!) ? (
									<FiPlus className='w-5 h-5 text-white bg-green-300 rounded-full' />
								) : (
									<FiMinus className='w-5 h-5 text-white bg-red-300 rounded-full' />
								)}
								<UserLabel
									fullname={friend.user.fullname}
									avater={friend.user.avater}
								/>
							</label>
						))}
				</div>
			)}
			<div className='flex items-center justify-end gap-3 p-3 bg-indigo-50'>
				{participants.length < 2 && (
					<p className='font-light text-xs text-slate-500'>
						Add {!participants.length && '2 users'}{' '}
						{participants.length === 1 && '1 more'} to create group
					</p>
				)}
				{participants.length > 1 && (
					<Button
						title='Create Group'
						handler={onSubmit}
						isLoading={isLoading}
					/>
				)}
			</div>
		</PopupWindow>
	);
};

export default GroupCreate;
