import React, { useState } from 'react';
import defAvater from '../assets/avater.png';
import { AVATER_URI } from '../utils';

type PropType = {
	avater?: string;
};
const UserAvater: React.FC<PropType> = ({ avater }) => {
	const [loadAvater, setAvater] = useState(false);
	return (
		<>
			<img
				src={defAvater}
				alt='avater'
				className={`w-full h-full rounded-full ${
					!loadAvater ? 'block' : 'hidden'
				}`}
			/>
			{!avater ? null : (
				<img
					src={`${AVATER_URI}/${avater}`}
					alt='avater'
					crossOrigin='anonymous'
					className={`w-full h-full rounded-full object-cover ${
						loadAvater ? 'block' : 'hidden'
					}`}
					onLoad={() => setAvater(true)}
					onError={() => setAvater(false)}
				/>
			)}
		</>
	);
};

export default UserAvater;
