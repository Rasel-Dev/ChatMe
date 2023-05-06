import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { selectMenu, toggleFriendList } from '../../app/features/menuSlice';
import { useSingleProfileQuery } from '../../app/services/groupApi';
import UserAvater from '../../components/UserAvater';
import BodyLayout from '../../components/layouts/BodyLayout';
import Medias from '../../components/profile/Medias';
import Members from '../../components/profile/Members';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import BackButton from '../../components/buttons/BackButton';

const SingleProfilePage = () => {
	const { chatId } = useParams();
	const {
		data: user,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useSingleProfileQuery(chatId!);
	const [bio, setBio] = useState<{ [index: string]: any }>({
		fullname: '',
		username: '',
		avater: '',
		friends: 0,
		participants: [],
		photos: [],
	});
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		if (user) {
			setPreview(user?.avater);
			setBio(user);
		}
	}, [user]);

	return (
		<BodyLayout>
			<div className='flex items-center p-3'>
				<BackButton />
			</div>
			<div className='mt-1 md:mt-10 mb-4 grid place-content-center'>
				<div className='w-28 h-28 rounded-full border border-indigo-200'>
					<UserAvater avater={preview!} />
				</div>
			</div>
			<h1 className='text-center font-medium text-slate-600 text-2xl tracking-wide'>
				{bio.fullname}
			</h1>
			<p className='text-center text-indigo-400 tracking-wide font-medium'>
				@{bio.username || 'group'}
			</p>
			<Medias photos={bio.photos} />
			{bio.participants && !!bio.participants.length && (
				<Members friends={bio.participants} />
			)}
		</BodyLayout>
	);
};

export default SingleProfilePage;
