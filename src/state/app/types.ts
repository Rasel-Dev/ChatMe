import {
	BioType,
	FriendType,
	LabelProfileType,
	MessageContentType,
	ParticipantType,
	ReturnSocketSubscribeType,
	SearchFriendType,
	SearchGroupType,
	WithProfileType,
} from '../../types/custom';

export type initialStateType = {
	isListMenuOpen: boolean;
	auth: string;
	token: string;
	userAvater: string;
	friends: FriendType[];
	requested: number;
	requests: LabelProfileType[];
	onSearch: boolean;
	search: {
		peoples: SearchFriendType[];
		groups: SearchGroupType[];
	};
	chat: {
		activeRoom: string;
		onMessageReactor: string;
		bio: {
			name: string;
			avater: string;
			lastRead: string;
			is_online?: boolean;
			is_typing?: boolean;
		};
		conversations: WithProfileType[];
		participants: ParticipantType[];
		loadIds: any[];
	};
};

type LoginActionType = {
	type: 'AUTH';
	payload: { id: string; token: string };
};
type ClearAuthType = {
	type: 'UNAUTH';
};
type ListToggleType = {
	type: 'TOGGLE_LIST';
};
type InitFriendType = {
	type: 'INIT_FRIEND';
	payload: {
		id: string;
		avater: string;
		requested: number;
		friends: FriendType[];
	};
};
type UserActivityType = {
	type: 'USER_ACTIVITY';
	payload: ReturnSocketSubscribeType[];
};
type InitFriendsStatus = {
	type: 'USER_ONLINE';
	payload: string;
};
type PatchFriendStatus = {
	type: 'USER_OFFLINE';
	payload: string;
};
type InitRequestFriendType = {
	type: 'INIT_REQUEST_FRIEND';
	payload: LabelProfileType[];
};
type OnSearchFriendType = {
	type: 'ON_SEARCH_FRIEND';
	payload: boolean;
};
type InitSearchFriendType = {
	type: 'INIT_SEARCH_FRIEND';
	payload: {
		peoples: SearchFriendType[];
		groups: SearchGroupType[];
	};
};
type InitChatActionType = {
	type: 'INIT_CHAT';
	payload: {
		threadId: string;
		bio: BioType;
		conversations: MessageContentType[];
		participants: ParticipantType[];
	};
};
type ShowReactorType = {
	type: 'SET_MESSAGE_REACTOR';
	payload: {
		messageId: string;
	};
};
type ClearChatActionType = {
	type: 'CLEAN_CHAT_WINDOW';
};
type ToggleTypingType = {
	type: 'TOGGLE_TYPING';
	payload: {
		threadId: string;
		userId: string;
		isTyping: boolean;
	};
};
type AddLabelMessage = {
	type: 'APPEND_LABEL_MESSAGE';
	payload: MessageContentType;
};
type RemoveLabelMessage = {
	type: 'REMOVE_LABEL_AND_MESSAGE';
	payload: {
		id: string;
	};
};
type AddMessage = {
	type: 'APPEND_MESSAGE';
	payload: MessageContentType;
};
type AddSuccessMessage = {
	type: 'APPEAR_MESSAGE_SUCCESS';
	payload: {
		temp: number;
		replace: string;
	};
};
type RemoveMessage = {
	type: 'REMOVE_MESSAGE';
	payload: {
		id: string;
		body: string;
	};
};

export type AppActionType =
	| LoginActionType
	| ClearAuthType
	| ListToggleType
	| InitFriendType
	| InitFriendsStatus
	| PatchFriendStatus
	| InitRequestFriendType
	| UserActivityType
	| OnSearchFriendType
	| InitSearchFriendType
	| InitChatActionType
	| ClearChatActionType
	| ShowReactorType
	| ToggleTypingType
	| AddLabelMessage
	| RemoveLabelMessage
	| AddMessage
	| AddSuccessMessage
	| RemoveMessage;
