import React from 'react';

type PropType = {
	children: React.ReactNode;
	title: string;
	onClick: () => void;
	isMobile?: boolean;
};

const WidgetButton: React.FC<PropType> = ({
	children,
	title,
	onClick,
	isMobile = false,
}) => {
	return (
		<button
			type='button'
			className={`relative outline-none p-2 rounded-full hover:bg-indigo-100 ${
				isMobile ? 'hidden md:inline-flex' : ''
			}`}
			onClick={onClick}
			title={title}
		>
			{children}
		</button>
	);
};

export default WidgetButton;
