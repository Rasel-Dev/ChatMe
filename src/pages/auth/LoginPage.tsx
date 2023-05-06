import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSigninMutation } from '../../app/services/authApi';
import Button from '../../components/buttons/Button';
import Input, { PasswordInput } from '../../components/inputs/Input';
import CenterLayout from '../../components/layouts/CenterLayout';
import { InputType } from '../../types/custom';

const LoginPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const [form, setForm] = useState({
		username: '',
		password: 'passcode',
	});
	const [emptyField, setFieldError] = useState('');
	const [loginUser, { isLoading, isSuccess, error, isError }] =
		useSigninMutation();

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
		setFieldError('');
	};

	const onSubmit = async () => {
		const { username, password } = form;
		// check user input
		if (!username || !password) {
			setFieldError('All fields required!');
			return;
		}

		loginUser(form);
	};

	useEffect(() => {
		if (isSuccess) {
			navigate(from, { replace: true });
		}
	}, [isSuccess]);

	return (
		<CenterLayout>
			<h1 className='text-center font-bold text-indigo-500 text-4xl tracking-wide'>
				ChatMe
			</h1>
			<div className='mt-8 flex flex-col gap-4'>
				<Input
					name='username'
					value={form.username}
					hint='Username'
					handler={onChange}
					isLoading={isLoading}
				/>
				<PasswordInput
					name='password'
					hint='Password'
					value={form.password}
					handler={onChange}
					isLoading={isLoading}
				/>
				{!(error as any)?.data!.message ? null : (
					<p className='mb-2 text-sm text-center text-red-400 tracking-wide'>
						{(error as any)?.data?.message}
					</p>
				)}
				{emptyField && (
					<p className='mb-2 text-sm text-center text-red-400 tracking-wide'>
						{emptyField}
					</p>
				)}
				<div className='flex items-center justify-end'>
					<Button title='New Account' transparent handler={gotoRegister} />
					<div className='px-1' />
					<Button title='Login' handler={onSubmit} isLoading={isLoading} />
				</div>
			</div>
		</CenterLayout>
	);
};

export default LoginPage;
