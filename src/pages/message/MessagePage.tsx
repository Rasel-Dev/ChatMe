import React from 'react';
import { useParams } from 'react-router-dom';
import MessageBox from '../../components/MessageBox/MessageBox';
import EmptyMessageBox from '../../components/MessageBox/EmptyMessageBox';

const MessagePage = () => {
	const { chatId } = useParams();

	return !chatId ? <EmptyMessageBox /> : <MessageBox chatId={chatId} />;
};

export default MessagePage;
