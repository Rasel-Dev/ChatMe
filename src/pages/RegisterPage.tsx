import React, { useState } from 'react';
import Button from '../components/Buttons/Button';
import Input, { PasswordInput } from '../components/Inputs/Input';
import { useLocation, useNavigate } from 'react-router-dom';
import useApp from '../hooks/useApp';
import { InputType } from '../types/custom';
import axios from '../utils/axios';

const RegisterPage = () => {
	const { dispatch } = useApp();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	const [form, setForm] = useState({
		fullname: '',
		username: '',
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<{ [index: string]: string | boolean }>(
		{}
	);

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

	const isValid = () => {
		const { fullname, username, email, password } = form;
		const err: { [index: string]: string | boolean } = {};
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
			setErrors({ loading: true });
			try {
				const { data } = await axios.post(`/users/new`, form);
				dispatch({ type: 'AUTH', payload: data });
				localStorage.setItem('_token', data?.token);
				navigate(from, { replace: true });
			} catch (error: any) {
				// console.log('error [XX]:', error?.response);
				if (error?.response && error.response?.status) {
					if (error.response.status === 400) {
						setErrors(error?.response?.data);
					}
					if (error.response.status === 500) {
						alert('Internal server error');
					}
				} else {
					alert('Internal server error');
				}
			}
			setErrors((prev) => ({ ...prev, loading: false }));
		}
	};

	return (
		<div className='h-screen w-full flex items-center justify-center'>
			<div className='w-2/5 p-4 bg-white rounded-xl shadow-md'>
				<h1 className='text-center font-bold text-indigo-500 text-4xl tracking-wide'>
					ChatMe
				</h1>
				<div className='mt-8'>
					<Input
						name='fullname'
						hint='Fullname'
						value={form.fullname}
						handler={onChange}
						isLoading={!!errors?.loading}
						error={errors?.fullname?.toString()}
					/>
					<div className='w-full my-4' />
					<Input
						name='username'
						hint='Username'
						value={form.username}
						handler={onChange}
						isLoading={!!errors?.loading}
						error={errors?.username?.toString()}
					/>
					<div className='w-full my-4' />
					<Input
						type='email'
						name='email'
						hint='Email address'
						value={form.email}
						handler={onChange}
						isLoading={!!errors?.loading}
						error={errors?.email?.toString()}
					/>
					<div className='w-full my-4' />
					<PasswordInput
						name='password'
						hint='Password'
						value={form.password}
						handler={onChange}
						isLoading={!!errors?.loading}
						error={errors?.password?.toString()}
					/>
					<div className='w-full my-4' />
					<div className='flex items-center justify-end'>
						<Button title='Login Account' transparent handler={gotoLogin} />
						<div className='px-1' />
						<Button
							title='Create new account'
							handler={onSubmit}
							isLoading={!!errors?.loading}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
