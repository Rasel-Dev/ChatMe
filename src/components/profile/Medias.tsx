import React, { useEffect, useState } from 'react';
import { MEDIA_URI } from '../../utils';

type PropType = {
	photos: string[];
};

type PhotoType = {
	filename: string;
	hasMore?: boolean;
	counter?: number;
};

const Photo: React.FC<PhotoType> = ({
	filename,
	hasMore = false,
	counter = 0,
}) => {
	return (
		<div className='relative w-32 h-32 rounded-md overflow-hidden'>
			{!hasMore || !counter ? null : (
				<div className='absolute inset-0 grid place-content-center z-[1]'>
					<span className='absolute inset-0 bg-black opacity-50'></span>
					<p className='font-medium tracking-wide text-white text-xl z-[1]'>
						+{counter}
					</p>
				</div>
			)}
			<img
				src={`${MEDIA_URI}/${filename}`}
				alt='avater'
				crossOrigin='anonymous'
				className={`w-full h-full object-cover`}
				// onLoad={() => setAvater(true)}
				// onError={() => setAvater(false)}
			/>
		</div>
	);
};

const Medias: React.FC<PropType> = ({ photos }) => {
	const [showCase, setShowCase] = useState<string[]>([]);
	const [exceptShowCounter, setExceptShowCounter] = useState(0);

	useEffect(() => {
		if (photos.length > 4) {
			setExceptShowCounter(photos.length - 4);
			setShowCase(photos.slice(0, 4));
		} else {
			setShowCase(photos);
		}
	}, [photos]);

	return (
		<div className='mt-5 px-5'>
			<div className='mb-2 font-bold text-xs uppercase text-indigo-400'>
				media
			</div>
			<div className='flex items-center gap-2'>
				{showCase.map((sc, i) => (
					<Photo
						key={sc}
						filename={sc}
						hasMore={showCase.length - 1 === i}
						counter={exceptShowCounter}
					/>
				))}
				{!photos.length && (
					<p className='text-xs text-slate-400'>
						No media shared <i>!</i>
					</p>
				)}
			</div>
		</div>
	);
};

export default Medias;
