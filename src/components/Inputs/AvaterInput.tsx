import React from 'react';
import { FiPlus } from 'react-icons/fi';
import avater from '../../assets/avater.png';
import { InputType } from '../../types/custom';
import { AVATER_URI } from '../../utils';
import { blobCheck } from '../../utils/helper';

type PropType = {
	onChange: (e: InputType) => void;
	preview?: string | null;
	id?: string;
	size?: 'w-12 h-12' | 'w-16 h-16' | 'w-24 h-24' | 'w-28 h-28';
};

const AvaterInput: React.FC<PropType> = ({
	preview = '',
	id = 'profile-avater',
	size = 'w-24 h-24',
	onChange,
}) => {
	const avaterLink = blobCheck(preview!)
		? `${preview}`
		: `${AVATER_URI}/${preview}`;
	return (
		<label htmlFor={id} className='grid place-content-center cursor-pointer'>
			<div className={`${size} relative border border-indigo-200 rounded-full`}>
				<FiPlus
					className={`absolute ${
						['w-12 h-12', 'w-16 h-16'].includes(size)
							? 'bottom-0 right-0'
							: 'bottom-3 right-1'
					} bg-indigo-300 text-white w-4 h-4 rounded-full overflow-hidden`}
				/>
				<img
					src={!preview ? avater : avaterLink}
					alt='avater'
					crossOrigin='anonymous'
					className='w-full h-full object-cover rounded-full'
				/>
			</div>
			<input type='file' className='hidden' id={id} onChange={onChange} />
		</label>
	);
};

export default AvaterInput;
