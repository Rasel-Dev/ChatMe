import { useEffect, useState } from 'react';
import {
	useGetProfileQuery,
	useUpdateProfilePicMutation,
} from '../../app/services/userApi';
import BackButton from '../../components/buttons/BackButton';
import UpdateCancel from '../../components/buttons/UpdateCancel';
import AvaterInput from '../../components/inputs/AvaterInput';
import BodyLayout from '../../components/layouts/BodyLayout';
import Friends from '../../components/profile/Friends';
import Groups from '../../components/profile/Groups';
import Privacy from '../../components/profile/Privacy';
import { InputType } from '../../types/custom';

const ProfilePage = () => {
	const { data, isLoading } = useGetProfileQuery();
	const [updatePic] = useUpdateProfilePicMutation();
	const menus = ['friends', 'groups', 'privacy'];
	const [bio, setBio] = useState<{ [index: string]: any }>({
		fullname: '',
		userame: '',
		avater: '',
		email: '',
		createdAt: '',
		friends: 0,
		friendsHave: [],
		groups: 0,
		groupsHave: [],
	});
	const [avater, setAvater] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [activeMenu, setActiveMenu] = useState<string>('friends');

	useEffect(() => {
		if (data) {
			setPreview(data?.avater ? data?.avater : null);
			setBio(data);
		}
	}, [data]);

	const toggleMenuList = (m: string) => setActiveMenu(m);

	const onChangeProfile = (e: InputType) => {
		if (e.target.files && e.target.files[0]) {
			setAvater(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	};

	const onProfileCancel = () => {
		setAvater(null);
		setPreview(bio?.avater);
	};

	const onProfileUpdate = async () => {
		if (avater) {
			try {
				const formData = new FormData();
				formData.append('avater', avater);
				await updatePic(formData).unwrap();
				setAvater(null);
			} catch (error) {
				console.log('error :', error);
			}
		}
	};

	return isLoading ? (
		<p className='text-center'>Profile Loading...</p>
	) : (
		<BodyLayout>
			<div className='flex items-center p-3'>
				<BackButton />
			</div>
			<div className='mt-1 md:mt-10 mb-4 grid place-content-center'>
				<AvaterInput
					preview={preview}
					size={'w-28 h-28'}
					onChange={onChangeProfile}
				/>
				{!avater ? null : (
					<UpdateCancel onUpdate={onProfileUpdate} onCancel={onProfileCancel} />
				)}
			</div>
			<h1 className='text-center font-medium text-slate-600 text-2xl tracking-wide'>
				{data?.fullname}
			</h1>
			<p className='text-center text-indigo-400 tracking-wide font-medium'>
				@{data?.username}
			</p>
			<div className='mt-3 flex items-center border-b border-indigo-200'>
				{menus.map((m) => (
					<button
						key={m}
						type='button'
						className={`flex items-center justify-center gap-2 px-4 py-2 capitalize text-slate-600 hover:bg-indigo-100 transition-colors ${
							activeMenu === m ? 'bg-indigo-100' : ''
						}`}
						onClick={() => toggleMenuList(m)}
					>
						<span>{m}</span>
						{!!(data as any)?.[m] && (
							<span className='bg-indigo-200 px-2 py-0 rounded-full text-xs'>
								{(data as any)?.[m]}
							</span>
						)}
					</button>
				))}
			</div>
			<div className='p-3'>
				{activeMenu === 'friends' && (
					<Friends friends={data?.friendsHave || []} />
				)}
				{activeMenu === 'groups' && <Groups groups={data?.groupsHave || []} />}
				{activeMenu === 'privacy' && <Privacy email={data?.email || ''} />}
			</div>
		</BodyLayout>
	);
};

export default ProfilePage;
