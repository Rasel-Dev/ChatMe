import React from 'react';

type PropType = {
	onUpdate: () => void;
	onCancel: () => void;
};

const UpdateCancel: React.FC<PropType> = ({ onUpdate, onCancel }) => {
	return (
		<div className='mt-2 flex items-center text-xs gap-2'>
			<button
				type='button'
				className='px-2 py-1 bg-red-200 hover:bg-red-300 text-red-600 rounded-full transition-colors'
				onClick={onCancel}
			>
				Cancel
			</button>
			<button
				type='button'
				className='px-2 py-1 bg-green-200 hover:bg-green-300 text-green-600 rounded-full transition-colors'
				onClick={onUpdate}
			>
				Update
			</button>
		</div>
	);
};

export default UpdateCancel;
