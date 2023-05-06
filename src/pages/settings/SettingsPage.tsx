import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FiKey, FiLogOut, FiShield, FiSlash } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { remCredentials } from '../../app/features/userSlice';
import { useLogoutMutation } from '../../app/services/authApi';
import { useGetProfileQuery } from '../../app/services/userApi';
import UserAvater from '../../components/UserAvater';
import BackButton from '../../components/buttons/BackButton';
import MenuLabel from '../../components/buttons/MenuLabel';
import BodyLayout from '../../components/layouts/BodyLayout';
import ChangePasswordWindow from '../../components/setting/ChangePasswordWindow';
import { useAppDispatch } from '../../hooks/hook';
import socketInstance from '../../utils/socket';

const SettingsPage = () => {
	const navigate = useNavigate();
	const { data, isLoading } = useGetProfileQuery();
	const Dispatch = useAppDispatch();
	const [logoutUser] = useLogoutMutation();
	const [_, _s, removeCookie] = useCookies(['logged_in']);
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
	const [preview, setPreview] = useState<string | null>(null);
	const [activeMenu, setActiveMenu] = useState<string>('');

	useEffect(() => {
		if (data) {
			setPreview(data?.avater ? data?.avater : null);
			setBio(data);
		}
	}, [data]);

	const onLogout = async () => {
		logoutUser();
		Dispatch(remCredentials());
		removeCookie('logged_in');
		localStorage.clear();
		socketInstance.disconnect();
		// location.reload();
		navigate('/login', { replace: true });
	};

	const closeHandler = () => {
		setActiveMenu('');
	};

	return isLoading ? (
		<p className='text-center'>Profile Loading...</p>
	) : (
		<BodyLayout>
			<div className='flex items-center p-3'>
				<BackButton />
			</div>
			<div className='p-4 md:p-5 flex items-center'>
				<div className='w-28 h-28 rounded-full border border-indigo-200'>
					<UserAvater avater={preview!} />
				</div>
				<div className='flex-1 ml-4'>
					<h1 className='font-medium text-slate-600 text-2xl tracking-wide'>
						{data?.fullname}
					</h1>
					<p className='text-indigo-400 tracking-wide font-medium'>
						@{data?.username}
					</p>
					<div className='mt-1.5 flex items-center gap-2 text-xs'>
						<div className='flex items-stretch rounded-sm overflow-hidden shadow-md'>
							<p className='px-1 py-0.5 bg-indigo-200 text-indigo-500'>
								Friends
							</p>
							<p className='px-2 py-0.5 text-slate-600 bg-white'>
								{bio.friends}
							</p>
						</div>
						<div className='flex items-stretch rounded-sm overflow-hidden shadow-md'>
							<p className='px-1 py-0.5 bg-indigo-200 text-indigo-500'>
								Groups
							</p>
							<p className='px-2 py-0.5 text-slate-600 bg-white'>
								{bio.groups}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className='p-3 md:p-5 flex flex-col gap-3'>
				<MenuLabel
					handler={() => setActiveMenu('change-password')}
					labelIcon={<FiKey className='w-4 h-4' />}
				>
					<p className='flex-1 text-start pr-3 py-2'>Change Password</p>
				</MenuLabel>
				<MenuLabel
					handler={() => {}}
					labelIcon={<FiSlash className='w-4 h-4' />}
				>
					<p className='flex-1 text-start pr-3 py-2'>Block List</p>
				</MenuLabel>
				<MenuLabel
					handler={() => {}}
					labelIcon={<FiShield className='w-4 h-4' />}
				>
					<p className='flex-1 text-start pr-3 py-2'>Activation</p>
				</MenuLabel>
				<div className='grid place-content-end'>
					<button
						type='button'
						className='rounded-md overflow-hidden outline-none tracking-wide inline-flex items-center bg-white shadow-sm text-red-400 border-2 border-white'
						onClick={onLogout}
						disabled={isLoading}
					>
						<span className='bg-red-50 p-1.5'>
							<FiLogOut className='w-4 h-4' />
						</span>
						<p className='px-3'>Logout</p>
					</button>
				</div>
			</div>
			{activeMenu === 'change-password' && (
				<ChangePasswordWindow closeHandler={closeHandler} />
			)}
		</BodyLayout>
	);
};

export default SettingsPage;
