import React, { useState } from 'react';
import Button from '../../components/buttons/Button';
import Input, { PasswordInput } from '../../components/inputs/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputType } from '../../types/custom';
import axios from '../../utils/axios';
import useApp from '../../hooks/useApp';

const LoginPage = () => {
	const { dispatch } = useApp();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [form, setForm] = useState({
		username: 'raseldev',
		password: 'passcode',
	});
	const [errors, setErrors] = useState<{ [index: string]: string | boolean }>(
		{}
	);

	const gotoRegister = () => {
		navigate('/register');
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

	const onSubmit = async () => {
		const { username, password } = form;
		// check user input
		if (!username || !password) {
			setErrors({ message: 'All fields required!' });
			return;
		}
		setErrors({ loading: true });

		try {
			const { data } = await axios.post(`/users/signin`, form);
			dispatch({
				type: 'AUTH',
				payload: data,
			});
			localStorage.setItem('_token', data?.token);
			navigate(from, { replace: true });
		} catch (error: any) {
			// console.log('error :', error?.response);
			if (error?.response) {
				if (error.response?.status && error.response.status === 400) {
					setErrors(error?.response?.data);
				}
			} else {
				alert('Internal server error');
			}
		}
		setErrors({ loading: false });
	};

	return (
		<div className='h-screen w-full flex items-center justify-center'>
			<div className='w-2/5 p-4 bg-white rounded-xl shadow-md'>
				<h1 className='text-center font-bold text-indigo-500 text-4xl tracking-wide'>
					ChatMe
				</h1>
				<div className='mt-8 flex flex-col gap-4'>
					<Input
						name='username'
						value={form.username}
						hint='Username'
						handler={onChange}
						isLoading={!!errors?.loading}
					/>
					<PasswordInput
						name='password'
						hint='Password'
						value={form.password}
						handler={onChange}
						isLoading={!!errors?.loading}
					/>
					{!errors?.message ? null : (
						<p className='mb-2 text-sm text-center text-red-400 tracking-wide'>
							{errors.message}
						</p>
					)}
					<div className='flex items-center justify-end'>
						<Button title='New Account' transparent handler={gotoRegister} />
						<div className='px-1' />
						<Button
							title='Login'
							handler={onSubmit}
							isLoading={!!errors?.loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
