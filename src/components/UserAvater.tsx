import React, { useState } from 'react';
import { ORIGIN } from '../utils/axios';

type PropType = {
	avater?: string;
};
const UserAvater: React.FC<PropType> = ({ avater }) => {
	const [loadAvater, setAvater] = useState(false);
	return (
		<>
			<img
				src='/avater.png'
				alt='avater'
				className={`w-full h-full rounded-full ${
					!loadAvater ? 'block' : 'hidden'
				}`}
			/>
			{!avater ? null : (
				<img
					src={`${ORIGIN}static/${avater}`}
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
