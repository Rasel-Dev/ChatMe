import React, { useEffect, useState } from 'react';
import BodyLayout from '../../components/Layouts/BodyLayout';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { InputType, UserProfileType } from '../../types/custom';
import useAxios from '../../hooks/useAxios';
import { ORIGIN } from '../../utils/axios';
import useApp from '../../hooks/useApp';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
	const navigate = useNavigate();
	const { dispatch } = useApp();
	const menus = ['friends', 'requested', 'privacy'];
	const [bio, setBio] = useState<UserProfileType>({
		fullname: '',
		username: '',
		email: '',
		avater: '',
		createdAt: '',
	});
	const [avater, setAvater] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);
	const axiosPrivate = useAxios();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		(async () => {
			// loading...
			try {
				const res = await axiosPrivate.get(`/users`, {
					signal: controller.signal,
				});
				const resData = res?.data as UserProfileType;
				if (isMounted) {
					setPreview(
						resData?.avater ? `${ORIGIN}static/${resData?.avater}` : null
					);
					setBio(resData);
					dispatch({
						type: 'TOGGLE_LIST',
					});
				}
			} catch (error) {
				console.log('MessageBox', error);
			}
		})();

		// cleanup
		return () => {
			isMounted = false;
			controller.abort();
		};
	}, [axiosPrivate]);

	const toggleMenu = () => {
		dispatch({ type: 'TOGGLE_LIST' });
		navigate('/');
	};

	function onChangeProfile(e: InputType) {
		if (e.target.files && e.target.files[0]) {
			setAvater(e.target.files[0]);
			setPreview(URL.createObjectURL(e.target.files[0]));
		}
	}

	const onProfileCancel = () => setPreview(`${ORIGIN}static/${bio?.avater}`);
	const onProfileUpdate = async () => {
		try {
			const { data } = await axiosPrivate.put(
				`/users/profile`,
				{ avater },
				{
					headers: {
						'content-type': 'multipart/form-data',
					},
				}
			);
			console.log('data :', data);
		} catch (error) {
			console.log('error :', error);
		}
	};

	return (
		<BodyLayout>
			<div className='flex items-center p-3'>
				<button
					type='button'
					className='focus:outline-none p-2 mr-3 inline-block md:hidden rounded-full hover:bg-indigo-100'
					onClick={toggleMenu}
					title='Message'
				>
					<FiArrowLeft className='w-6 h-6 stroke-1 text-gray-600' />
				</button>
			</div>
			<div className='mt-1 md:mt-10 mb-4 grid place-content-center'>
				<label
					htmlFor='profile-avater'
					className='grid place-content-center cursor-pointer'
				>
					<div className='relative w-28 h-28 border border-indigo-200 rounded-full'>
						<FiPlus className='absolute bottom-1 right-1 bg-indigo-300 text-white w-4 h-4 rounded-full overflow-hidden' />
						<img
							src={preview || '/avater.png'}
							alt='avater'
							crossOrigin='anonymous'
							className='w-full object-cover h-full rounded-full'
						/>
					</div>
					<input
						type='file'
						className='hidden'
						id='profile-avater'
						onChange={onChangeProfile}
					/>
				</label>
				{!/^blob:/i.test(preview + '') ? null : (
					<div className='mt-2 flex items-center text-xs gap-2'>
						<button
							type='button'
							className='px-2 py-1 bg-red-200 hover:bg-red-300 text-red-600 rounded-full transition-colors'
							onClick={onProfileCancel}
						>
							Cancel
						</button>
						<button
							type='button'
							className='px-2 py-1 bg-green-200 hover:bg-green-300 text-green-600 rounded-full transition-colors'
							onClick={onProfileUpdate}
						>
							Update
						</button>
					</div>
				)}
			</div>
			<h1 className='text-center font-medium text-slate-600 text-2xl tracking-wide'>
				{bio.fullname}
			</h1>
			<p className='text-center text-indigo-400 tracking-wide font-medium'>
				@{bio.username}
			</p>
		</BodyLayout>
	);
};

export default ProfilePage;
