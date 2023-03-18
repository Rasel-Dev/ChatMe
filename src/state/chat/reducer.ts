import { initialChatState } from './ChatStateProvider';
import { ChatActionType, InitChatStateType } from './types';

export default function chatReducer(
	state: InitChatStateType,
	action: ChatActionType
): InitChatStateType {
	switch (action.type) {
		case 'INIT':
			return { ...state, ...action.payload };

		case 'APPEND_MESSAGE':
			return {
				...state,
				conversations: [
					...state.conversations,
					{
						...action.payload,
					},
				],
				loadIds: [...state.loadIds, action.payload?.id],
			};

		case 'APPEND_MESSAGE_SUCCESS': {
			const conversations = [...state.conversations];
			const indexPoint = conversations.findIndex(
				(conv) => conv.id === action.payload.temp
			);
			if (indexPoint !== -1)
				conversations[indexPoint].id = action.payload.replace;
			return { ...state, conversations };
		}

		case 'CLEAN':
			return initialChatState;

		default:
			return state;
	}
}
