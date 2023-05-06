import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = () => {
	const navigate = useNavigate();

	const onBack = () => {
		navigate(-1);
	};
	return (
		<button
			type='button'
			className='focus:outline-none p-2 mr-3 inline-block md:hidden rounded-full hover:bg-indigo-100'
			onClick={onBack}
			title='Go Back'
		>
			<FiArrowLeft className='w-6 h-6 stroke-1 text-gray-600' />
		</button>
	);
};

export default BackButton;
