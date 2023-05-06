import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../app/services/authApi';
import Button from '../../components/buttons/Button';
import AvaterInput from '../../components/inputs/AvaterInput';
import Input, { PasswordInput } from '../../components/inputs/Input';
import CenterLayout from '../../components/layouts/CenterLayout';
import { InputType, Register } from '../../types/custom';
import { isFetchBaseQueryError } from '../../utils/helper';

const RegisterPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [avater, setAvater] = useState<File>();
	const [preview, setPreview] = useState<string | null>(null);
	const [form, setForm] = useState<Register>({} as Register);
	const [errors, setErrors] = useState<{ [index: string]: string }>({});
	const [registerUser, { isLoading, isSuccess }] = useSignupMutation();

	const gotoLogin = () => {
		navigate('/login');
	};

	const onChange = (e: InputType) => {
		// set form state
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		// clear error state
		setErrors({});
	};

	function onChangeProfile(e: InputType) {
		if (e.target.files && e.target.files[0]) {
			const avater = e.target.files[0];
			setAvater(avater);
			setPreview(URL.createObjectURL(avater));
		}
	}

	const isValid = () => {
		const { fullname, username, email, password } = form!;
		const err: { [index: string]: string } = {};
		//level 1
		if (!fullname) err.fullname = 'Fullname is required!';
		if (!username) err.username = 'Username is required!';
		if (!email) err.email = 'Email address is required!';
		if (!password) err.password = 'Password is required!';
		//level 2
		if (!err?.fullname && (fullname.length < 5 || fullname.length > 100))
			err.fullname = 'Fullname should be 5 - 100 charecters!';
		if (!err?.username && (username.length < 5 || username.length > 70))
			err.username = 'Username should be 5 - 70 charecters!';
		if (!err?.password && password.length < 8)
			err.password = 'Password require minimum 8 charecters!';

		if (!!Object.keys(err).length || !!Object.keys(errors).length) {
			setErrors((prev) => ({ ...prev, ...err }));
			return false;
		}
		return true;
	};

	const onSubmit = async () => {
		if (isValid()) {
			try {
				const formData = new FormData();
				formData.append('fullname', form.fullname);
				formData.append('username', form.username);
				formData.append('email', form.email);
				formData.append('password', form.password);
				formData.append('avater', avater!);

				await registerUser(formData).unwrap();
			} catch (error) {
				if (isFetchBaseQueryError(error)) {
					// const errMsg = 'error' in error ? error.error : error.data;
					setErrors(error.data as { [index: string]: string });
				}
			}
		}
		// setErrors({ loading: true });
		// try {
		// 	const { data } = await axios.post(
		// 		`/users/signup`,
		// 		{ ...form, avater },
		// 		{
		// 			headers: {
		// 				'content-type': 'multipart/form-data',
		// 			},
		// 		}
		// 	);
		// 	// dispatch({ type: 'AUTH', payload: data });
		// 	localStorage.setItem('_token', data?.token);
		// 	navigate(from, { replace: true });
		// } catch (error: any) {
		// 	// console.log('error [XX]:', error?.response);
		// 	if (error?.response && error.response?.status) {
		// 		if (error.response.status === 400) {
		// 			setErrors(error?.response?.data);
		// 		}
		// 		if (error.response.status === 500) {
		// 			alert('Internal server error');
		// 		}
		// 	} else {
		// 		alert('Internal server error');
		// 	}
		// }
		// setErrors((prev) => ({ ...prev, loading: false }));
		// }
	};

	useEffect(() => {
		if (isSuccess) {
			navigate('/', { replace: true });
		}
	}, [isSuccess]);

	return (
		<CenterLayout>
			<h1 className='text-center font-bold text-indigo-500 text-4xl tracking-wide'>
				ChatMe
			</h1>
			<div className='mt-4 flex flex-col gap-4'>
				<div className='grid place-content-center'>
					<AvaterInput
						preview={preview}
						onChange={onChangeProfile}
						size={'w-28 h-28'}
					/>
				</div>

				<Input
					name='fullname'
					hint='Fullname'
					value={form?.fullname}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.fullname?.toString()}
				/>

				<Input
					name='username'
					hint='Username'
					value={form?.username}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.username?.toString()}
				/>

				<Input
					type='email'
					name='email'
					hint='Email address'
					value={form?.email}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.email?.toString()}
				/>

				<PasswordInput
					name='password'
					hint='Password'
					value={form?.password}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.password?.toString()}
				/>

				<div className='flex items-center justify-end'>
					<Button title='Login Account' transparent handler={gotoLogin} />
					<div className='px-1' />
					<Button
						title='Create new account'
						handler={onSubmit}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</CenterLayout>
	);
};

export default RegisterPage;
