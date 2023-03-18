import { WithProfileType } from '../../components/MessageBox/MessageBox';

export type InitChatStateType = {
	bio: {
		fullname: string;
		profile: string;
		last_seen: number;
		is_online: boolean;
		is_typing: boolean;
	};
	conversations: WithProfileType[];
	loadIds: any[];
};

type InitChatActionType = {
	type: 'INIT';
	payload: any;
};
type ClearChatActionType = {
	type: 'CLEAN';
};
type AddMessage = {
	type: 'APPEND_MESSAGE';
	payload: { id: number | string; content: string; own: true };
};

type AddSuccessMessage = {
	type: 'APPEND_MESSAGE_SUCCESS';
	payload: { temp: any; replace: number };
};

export type ChatActionType =
	| InitChatActionType
	| ClearChatActionType
	| AddMessage
	| AddSuccessMessage;
