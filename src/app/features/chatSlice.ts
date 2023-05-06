import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import {
	BioType,
	ChatContentType,
	MessageContentType,
	ParticipantType,
	ReactStatusType,
	ReceiveReactType,
	TypingType,
	WithProfileType,
} from '../../types/custom';
import { serializeConversations } from '../../utils';
import { RootState } from '../store';

export interface ChatStateType {
	activeRoom: string;
	bio: BioType;
	conversations: WithProfileType[];
	participants: ParticipantType[];
	loadIds: any[];
}

type RoomType = {
	threadId: string;
	bio: BioType;
	conversations: WithProfileType[];
	participants: ParticipantType[];
};

type SuccessMessageType = {
	temp: number;
	replace: string;
};

const initialState: ChatStateType = {
	activeRoom: '',
	bio: {
		name: '',
		avater: '',
		lastRead: '',
		is_online: false,
		is_typing: false,
	},
	conversations: [],
	participants: [],
	loadIds: [],
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		initChats(state, action: PayloadAction<RoomType>) {
			const { threadId, bio, participants, conversations } = action.payload;
			state.activeRoom = threadId;
			state.bio = bio;
			state.participants = participants || [];
			state.conversations = serializeConversations(conversations || []);
		},
		setNewMessage(state, action: PayloadAction<MessageContentType>) {
			if (state.activeRoom === action.payload?.threadId) {
				const body = { ...action.payload };

				delete body?.threadId;

				// remove sender typing
				const typerIndex = state.conversations.findIndex(
					(u) => u.userId === body.userId && u.onTyping
				);
				if (typerIndex !== -1) state.conversations.splice(typerIndex, 1);
				if (state.conversations[0]) {
					// disable sender old widgets
					if (state.conversations[0]?.userId === body?.userId) {
						state.conversations[0].widgets = false;
					}

					if (
						dayjs(state.conversations[0]?.createdAt).format('YYYY-MM-DD') !==
						dayjs(Date.now()).format('YYYY-MM-DD')
					) {
						// add recenet datetime popup
						state.conversations.splice(
							0,
							0,
							{
								id: uuid(),
								body: dayjs(Date.now()).format('YYYY-MM-DD HH:mm A'),
								cType: ChatContentType.TEXT,
								pop: true,
								own: false,
							},
							{ ...body, widgets: true }
						);
					} else {
						state.conversations.splice(0, 0, { ...body, widgets: true });
					}
				} else {
					state.conversations.push({ ...body, widgets: true });
				}

				if (typeof action.payload?.id === 'number') {
					state.loadIds.push(action.payload?.id);
				}
			}
		},
		setSuccessNewMessage(state, action: PayloadAction<SuccessMessageType>) {
			const indexPoint = state.conversations.findIndex(
				(conv) => conv.id === action.payload.temp
			);
			if (indexPoint !== -1)
				state.conversations[indexPoint].id = action.payload.replace;
		},
		setTyping(state, action: PayloadAction<TypingType>) {
			const { threadId, userId, isTyping } = action.payload;

			if (state.activeRoom === threadId) {
				const alreadyTypingIdx = state.conversations.findIndex(
					(f) => f.userId === userId && f?.onTyping
				);
				/**
				 * If user not found in "alreadyTypingIdx" and "isTyping" is true
				 * then it will create new user typing block
				 */
				if (alreadyTypingIdx === -1 && isTyping) {
					state.conversations.splice(0, 0, {
						id: uuid(),
						body: '',
						userId,
						widgets: true,
						onTyping: true,
					});
				}
				if (alreadyTypingIdx !== -1 && !isTyping) {
					state.conversations.splice(alreadyTypingIdx, 1);
				}
			}
		},
		setReact(state, action: PayloadAction<ReceiveReactType>) {
			const { messageId, userId, react } = action.payload;
			const conversations = [...state.conversations];
			const convIndex = conversations.findIndex((c) => c.id === messageId);
			if (convIndex !== -1) {
				if (
					!!conversations[convIndex]?.React &&
					Array.isArray(conversations[convIndex].React)
				) {
					const reacts = [...(conversations[convIndex].React || [])];
					const userIdx = reacts.findIndex((u) => u.userId === userId);
					if (userIdx !== -1) {
						reacts[userIdx].cReact = react as ReactStatusType;
					} else {
						reacts.push({ userId, cReact: react as ReactStatusType });
					}
					conversations[convIndex].React = reacts;
				} else {
					conversations[convIndex].React = [
						{ userId, cReact: react as ReactStatusType },
					];
				}
			}
			state.conversations = conversations;
		},
		remMessage(
			state,
			action: PayloadAction<{ id: string; body: string | null }>
		) {
			const { id, body } = action.payload;
			const chatIdx = state.conversations.findIndex((x) => x.id === id);
			if (chatIdx !== -1) {
				if (typeof body === 'string') {
					state.conversations[chatIdx].body = '';
				} else {
					state.conversations.splice(chatIdx, 1);
				}
			}
		},
		clearChat(state) {
			state.activeRoom = '';
			state.bio = {
				name: '',
				avater: '',
				lastRead: '',
				is_online: false,
				is_typing: false,
			};
			state.participants = [];
			state.conversations = [];
		},
	},
});

export const {
	initChats,
	setNewMessage,
	setSuccessNewMessage,
	setTyping,
	setReact,
	remMessage,
	clearChat,
} = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;
