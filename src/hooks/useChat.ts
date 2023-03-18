import { useContext } from 'react';
import { ChatStateContext } from '../state/chat/ChatStateProvider';

export default function useChat() {
	const context = useContext(ChatStateContext);
	if (!context)
		throw new Error('useChat must be used within a ChatStateProvider');
	return context;
}
