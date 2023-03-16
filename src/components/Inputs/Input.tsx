import React from 'react';
import { InputType } from '../../types/custom';
type InputProp = {
	name: string;
	handler: (e: InputType) => void;
	type?: string;
	hint?: string;
	value?: string;
	isLoading?: boolean;
	error?: string;
};
const Input = ({
	name,
	handler,
	type = 'text',
	hint = '',
	value,
	isLoading = false,
	error = '',
}: InputProp) => {
	return (
		<div className='bg-transparent'>
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
