import { ChatContentType, ReactType } from '../../types/custom';
import LeftLabel from './labels/LeftLabel';
import RightLabel from './labels/RightLabel';

type MessageLebelType = {
	id: string | number;
	threadId: string;
	userId: string;
	content?: string;
	type?: ChatContentType;
	isMe?: boolean;
	widgets?: boolean;
	timestamp?: string;
	react: ReactType[];
	isReceiverSeened?: boolean;
	isType?: boolean;
	isPoped?: boolean;
	isLoading?: boolean;
};

const MessageLabel = ({
	id,
	threadId,
	userId,
	content = '',
	type = ChatContentType.TEXT,
	isMe = false,
	widgets = false,
	isReceiverSeened = true,
	isType = false,
	react,
	timestamp = '',
	isPoped = false,
	isLoading = false,
}: MessageLebelType) => {
	// for popup
	if (isPoped)
		return (
			<div className='w-full py-1 md:py-2 bg-transparent text-indigo-300 tracking-widest font-light text-[11px] text-center select-none last:bg-black'>
				{content}
			</div>
		);
	// is it image file content

	return !isMe ? (
		<LeftLabel
			id={id}
			threadId={threadId}
			userId={userId}
			type={type}
			content={content}
			react={react}
			enableWidgets={widgets}
			isSeened={isReceiverSeened}
			isType={isType}
			timestamp={timestamp}
		/>
	) : (
		<RightLabel
			id={id}
			threadId={threadId}
			content={content}
			type={type}
			react={react}
			isLoading={isLoading}
			enableWidgets={widgets}
			isSeened={isReceiverSeened}
			isType={isType}
			timestamp={timestamp}
		/>
	);
};

export default MessageLabel;
