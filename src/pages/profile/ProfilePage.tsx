import React, { useEffect, useState } from 'react';
import BodyLayout from '../../components/layouts/BodyLayout';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { InputType } from '../../types/custom';
import useAxios from '../../hooks/useAxios';
import { ORIGIN } from '../../utils/axios';
import useApp from '../../hooks/useApp';
import { useNavigate } from 'react-router-dom';
import Friends from '../../components/profile/Friends';
import Privacy from '../../components/profile/Privacy';
import UpdateCancel from '../../components/buttons/UpdateCancel';

const ProfilePage = () => {
	const navigate = useNavigate();
	const { dispatch } = useApp();
	const menus = ['friends', 'privacy'];
	const [bio, setBio] = useState<{ [index: string]: any }>({
		fullname: '',
		username: '',
		email: '',
		avater: '',
		createdAt: '',
		friends: 0,
		friendsHave: [],
	});
	const [avater, setAvater] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);
	const [activeMenu, setActiveMenu] = useState<string>('friends');
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
				const resData = res?.data;
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

	const toggleBackMenu = () => {
		dispatch({ type: 'TOGGLE_LIST' });
		navigate('/');
	};

	const toggleMenuList = (m: string) => setActiveMenu(m);

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
					onClick={toggleBackMenu}
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
						<FiPlus className='absolute bottom-3 right-1 bg-indigo-300 text-white w-4 h-4 rounded-full overflow-hidden' />
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
					<UpdateCancel onUpdate={onProfileUpdate} onCancel={onProfileCancel} />
				)}
			</div>
			<h1 className='text-center font-medium text-slate-600 text-2xl tracking-wide'>
				{bio.fullname}
			</h1>
			<p className='text-center text-indigo-400 tracking-wide font-medium'>
				@{bio.username}
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
						{!!bio[m] && (
							<span className='bg-indigo-200 px-2 py-0 rounded-full text-xs'>
								{bio[m]}
							</span>
						)}
					</button>
				))}
			</div>
			<div className='p-3'>
				{activeMenu === 'friends' && <Friends friends={bio.friendsHave} />}
				{activeMenu === 'privacy' && <Privacy email={bio.email} />}
			</div>
		</BodyLayout>
	);
};

export default ProfilePage;
