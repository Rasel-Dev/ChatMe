import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../app/features/userSlice';
import {
	useGroupProfileQuery,
	useUpdateGroupProfileAvaterMutation,
} from '../../app/services/groupApi';
import { GroupProfileResponse } from '../../app/services/types';
import UserAvater from '../../components/UserAvater';
import BackButton from '../../components/buttons/BackButton';
import UpdateCancel from '../../components/buttons/UpdateCancel';
import AvaterInput from '../../components/inputs/AvaterInput';
import BodyLayout from '../../components/layouts/BodyLayout';
import Medias from '../../components/profile/Medias';
import Members from '../../components/profile/Members';
import { useAppSelector } from '../../hooks/hook';
import useAxios from '../../hooks/useAxios';
import { InputType } from '../../types/custom';
import { isFetchBaseQueryError } from '../../utils/helper';

// {
// 	fullname: '',
// 	avater: '',
// 	friends: 0,
// 	participants: [],
// 	photos: [],
// }

const RoomProfilePage: React.FC = () => {
	const { chatId } = useParams();
	const { auth } = useAppSelector(selectUser);
	const {
		data: profile,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useGroupProfileQuery(chatId!);
	const [changeAvater, { isLoading: aLoading }] =
		useUpdateGroupProfileAvaterMutation();
	// console.log('error :', error);
	const [bio, setBio] = useState<GroupProfileResponse | null>(null);
	const [avater, setAvater] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);
	const [editable, setEditable] = useState<{ [index: string]: boolean }>({
		avater: false,
		member: false,
	});
	const axiosPrivate = useAxios();

	useEffect(() => {
		if (profile) {
			setPreview(profile?.avater || null);
			setBio(profile);
			const administrator = profile.participants?.filter(
				(user) => user.userId === auth && ['ADMIN', 'MOD'].includes(user.pType)
			)?.[0];
			setEditable((prev) => ({
				...prev,
				avater: !!administrator,
				member: !!administrator,
			}));
		}
	}, [profile, auth]);

	useEffect(() => {
		if (isFetchBaseQueryError(error)) console.log('error.status', error.status);
	}, [error]);

	// useEffect(() => {
	// 	if (bio) {
	// 		const administrator = bio?.participants?.filter(
	// 			(user) => user.userId === auth && ['ADMIN', 'MOD'].includes(user.pType)
	// 		)?.[0];
	// 		setEditable((prev) => ({
	// 			...prev,
	// 			avater: !!administrator,
	// 			member: !!administrator,
	// 		}));
	// 	}
	// }, [bio, auth]);

	function onChangeProfile(e: InputType) {
		if (e.target.files && e.target.files[0]) {
			setAvater(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	}

	const onProfileCancel = () => setPreview(bio?.avater!);

	const onProfileUpdate = async () => {
		if (!avater || !chatId) return;
		const formData = new FormData();
		formData.append('chatId', chatId!);
		formData.append('avater', avater!);
		changeAvater(formData);

		// try {
		// 	const { data } = await axiosPrivate.put(
		// 		`/groups/${chatId}/profile`,
		// 		{ avater },
		// 		{
		// 			headers: {
		// 				'content-type': 'multipart/form-data',
		// 			},
		// 		}
		// 	);
		// 	console.log('data :', data);
		// } catch (error) {
		// 	console.log('error :', error);
		// }
	};

	if (isLoading) return <p className='text-center'>Loading Profile</p>;
	// console.log('editable.member :', editable.member);
	return (
		<BodyLayout>
			<div className='flex items-center p-3'>
				<BackButton />
			</div>
			<div className='mt-1 md:mt-10 mb-4 grid place-content-center'>
				{!editable.avater ? (
					<div className='w-28 h-28 rounded-full border border-indigo-200'>
						<UserAvater avater={preview!} />
					</div>
				) : (
					<>
						<AvaterInput
							preview={preview}
							size={'w-28 h-28'}
							onChange={onChangeProfile}
						/>
						{!/^blob:/i.test(preview + '') ? null : (
							<UpdateCancel
								onUpdate={onProfileUpdate}
								onCancel={onProfileCancel}
							/>
						)}
					</>
				)}
			</div>
			<h1 className='text-center font-medium text-slate-600 text-2xl tracking-wide'>
				{bio?.fullname}
			</h1>
			<p className='text-center text-indigo-400 tracking-wide font-medium'>
				group
			</p>
			<Medias photos={bio?.photos || []} />
			{bio?.participants && !!bio?.participants.length && (
				<Members friends={bio?.participants!} editable={!!editable?.member} />
			)}
		</BodyLayout>
	);
};

export default RoomProfilePage;
