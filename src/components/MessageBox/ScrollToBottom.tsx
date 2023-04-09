import { type } from 'os';
import React, { useCallback, useEffect, useRef } from 'react';

type PropType = {
	animated?: boolean;
};

const ScrollToBottom: React.FC<PropType> = ({ animated = false }) => {
	const messageEndRef = useRef<HTMLDivElement>(null);
	useEffect(() =>
		messageEndRef.current?.scrollIntoView({
			behavior: animated ? 'smooth' : 'instant',
		})
	);
	return <div ref={messageEndRef} />;
};

export default ScrollToBottom;
