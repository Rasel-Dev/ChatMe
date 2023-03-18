import { Dispatch, createContext, useMemo, useReducer } from 'react';
import chatReducer from './reducer';
import { ChatActionType, InitChatStateType } from './types';

export const initialChatState = {
	bio: {
		fullname: '',
		profile: '',
		last_seen: 0,
		is_online: false,
		is_typing: false,
	},
	conversations: [],
	loadIds: [],
};

type ChatCTX = {
	chatState: Partial<InitChatStateType>;
	dispatch: Dispatch<ChatActionType>;
};

export const ChatStateContext = createContext<ChatCTX | undefined>(undefined);

type PropType = {
	children: React.ReactNode;
};

const ChatStateProvider: React.FC<PropType> = ({ children }) => {
	const [chatState, dispatch] = useReducer(chatReducer, initialChatState);

	const value = useMemo(() => ({ chatState, dispatch }), [chatState]);

	return (
		<ChatStateContext.Provider value={value}>
			{children}
		</ChatStateContext.Provider>
	);
};

export default ChatStateProvider;
