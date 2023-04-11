import dayjs from 'dayjs';
import React from 'react';

type PropType = {
	time?: string;
};

const Timestamp: React.FC<PropType> = ({ time }) => {
	return (
		<span className='m-2.5 text-xs font-light text-indigo-300 select-none text-center'>
			{!time
				? dayjs(Date.now()).format('HH:mm A')
				: dayjs(time).format('HH:mm A')}
		</span>
	);
};

export default Timestamp;
