import { useState } from 'react';
import { useChangePasswordMutation } from '../../app/services/userApi';
import { InputType } from '../../types/custom';
import { isFetchBaseQueryError } from '../../utils/helper';
import PopupBox from '../PopupBox';
import Button from '../buttons/Button';
import Input, { PasswordInput } from '../inputs/Input';

type PropType = {
	closeHandler: () => void;
};

const fields = { old_password: '', new_password: '', confirm_password: '' };

const ChangePasswordWindow: React.FC<PropType> = ({ closeHandler }) => {
	const [form, setForm] = useState(fields);
	const [successMesssage, setSuccessMessage] = useState('');
	const [errors, setErrors] = useState<{ [index: string]: string | null }>({});
	const [changePassword, { isLoading }] = useChangePasswordMutation();

	const onChange = (e: InputType) => {
		// set form state
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		// clear error state
		setErrors((prev) => ({ ...prev, [e.target.name]: null }));
	};

	const isValid = () => {
		const { old_password, new_password, confirm_password } = form!;
		const err: { [index: string]: string } = {};
		//level 1
		if (!old_password) err.old_password = 'Old password is required!';
		if (!new_password) err.new_password = 'New password is required!';
		if (!confirm_password)
			err.confirm_password = 'Confirm password is required!';
		if (confirm_password !== new_password)
			err.confirm_password = 'Confirm password not matched!';
		//level 2
		if (!err?.new_password && new_password.length < 8)
			err.new_password = 'New password require minimum 8 charecters!';
		if (old_password === new_password)
			err.new_password =
				'Sorry! you trying to change same password you entered';
		if (!!Object.keys(err).length || Object.values(errors).every((e) => !!e)) {
			setErrors((prev) => ({ ...prev, ...err }));
			return false;
		}
		return true;
	};

	const onSubmit = async () => {
		if (isValid()) {
			try {
				const changePasswordUpdate = await changePassword(form).unwrap();
				setForm(fields);
				setSuccessMessage(changePasswordUpdate.message);
			} catch (error) {
				if (isFetchBaseQueryError(error)) {
					setErrors(error?.data as any);
				}
			}
		}
	};

	return (
		<PopupBox title='Change Password' onClose={closeHandler}>
			<div className='p-3 flex flex-col gap-4'>
				<PasswordInput
					name='old_password'
					hint='Old Password'
					value={form?.old_password}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.old_password?.toString()}
				/>
				<Input
					name='new_password'
					hint='Create new password'
					value={form?.new_password}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.new_password?.toString()}
				/>
				<PasswordInput
					name='confirm_password'
					hint='Confirm Password'
					value={form?.confirm_password}
					handler={onChange}
					isLoading={isLoading}
					error={errors?.confirm_password?.toString()}
				/>

				{successMesssage && (
					<p className='text-cener font-semibold text-green-400 my-3'>
						{successMesssage}
					</p>
				)}

				<div className='flex items-center justify-end'>
					<Button
						title='Change'
						handler={onSubmit}
						isLoading={isLoading}
						isDisabled={!Object.values(form).every((e) => !!e)}
					/>
				</div>
			</div>
		</PopupBox>
	);
};

export default ChangePasswordWindow;
