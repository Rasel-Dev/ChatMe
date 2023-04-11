import React, { useState } from 'react';
import { InputType } from '../../types/custom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
type InputProp = {
	name: string;
	handler: (e: InputType) => void;
	type?: string;
	hint?: string;
	value?: string;
	isLoading?: boolean;
	showLabel?: boolean;
	error?: string;
};
const Input = ({
	name,
	handler,
	type = 'text',
	hint = '',
	value,
	isLoading = false,
	showLabel = false,
	error = '',
}: InputProp) => {
	return (
		<div className='bg-transparent'>
			{showLabel && (
				<label
					htmlFor={name}
					className='capitalize font-semibold text-sm ml-3 text-slate-600'
				>
					{hint}
				</label>
			)}
			<input
				type={type}
				name={name}
				className='w-full p-3 rounded-lg bg-transparent outline-none tracking-wider border border-indigo-200'
				placeholder={hint}
				value={value || ''}
				onChange={handler}
				disabled={isLoading}
			/>
			{!error ? null : (
				<p className='ml-2 text-sm text-red-400 tracking-wide'>{error}</p>
			)}
		</div>
	);
};

export default Input;

export const PasswordInput = ({
	name,
	handler,
	type = 'text',
	hint = '',
	value,
	isLoading = false,
	error = '',
}: InputProp) => {
	const [show, setShow] = useState(false);

	const onVisible = () => setShow((prev) => !prev);

	return (
		<div className='bg-transparent'>
			<div className='flex items-stretch border border-indigo-200 rounded-lg'>
				<input
					type={show ? 'text' : 'password'}
					name={name}
					className='flex-1 p-3 bg-transparent outline-none tracking-wider'
					placeholder={hint}
					value={value || ''}
					onChange={handler}
					disabled={isLoading}
				/>
				{!value ? null : (
					<button type='button' className='p-2' onClick={onVisible}>
						{show ? (
							<FiEyeOff className='w-5 h-5 stroke-2 text-indigo-300' />
						) : (
							<FiEye className='w-5 h-5 stroke-2 text-indigo-300' />
						)}
					</button>
				)}
			</div>
			{!error ? null : (
				<p className='ml-2 text-sm text-red-400 tracking-wide'>{error}</p>
			)}
		</div>
	);
};
