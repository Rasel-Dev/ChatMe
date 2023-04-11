import React, { useState } from 'react';
import Input from '../inputs/Input';
import { InputType } from '../../types/custom';
import UpdateCancel from '../buttons/UpdateCancel';

type PropType = {
	email: string;
};

const Privacy: React.FC<PropType> = ({ email }) => {
	const [form, setForm] = useState({ email: '' });

	const onChange = (e: InputType) => {
		// set form state
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
		// clear error state
		// setErrors({});
	};

	return (
		<div>
			<div className='flex flex-col gap-4'>
				<Input
					name='username'
					value={form.email || email}
					hint='Email Address'
					handler={onChange}
					showLabel
				/>
				<UpdateCancel onUpdate={() => {}} onCancel={() => {}} />
			</div>
		</div>
	);
};

export default Privacy;
