import { useParams } from 'react-router-dom';
import EmptyMessageBox from '../../components/messageBox/EmptyMessageBox';
import MessageBox from '../../components/messageBox/MessageBox';

const MessagePage = () => {
	const { chatId } = useParams();

	return !chatId ? <EmptyMessageBox /> : <MessageBox chatId={chatId} />;
};

export default MessagePage;
