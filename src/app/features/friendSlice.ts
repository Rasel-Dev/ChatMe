import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
	ChatContentType,
	FriendType,
	LabelProfileType,
	MessageContentType,
	ReturnSocketSubscribeType,
	TypingType,
} from '../../types/custom';
import { RootState } from '../store';
import { truncate } from '../../utils';

export interface FriendStateType {
	friends: FriendType[];
	requested: number;
}

const initialState: FriendStateType = {
	friends: [],
	requested: 0,
};

export const friendSlice = createSlice({
	name: 'friend',
	initialState,
	reducers: {
		initFriends(
			state,
			action: PayloadAction<{ friends: FriendType[]; requested: number }>
		) {
			const { friends, requested } = action.payload;
			state.friends = friends || [];
			state.requested = requested || 0;
		},
		updateRequestCounter(state, action: PayloadAction<number>) {
			state.requested += action.payload || 0;
		},
		setFriendActivities(
			state,
			action: PayloadAction<ReturnSocketSubscribeType[]>
		) {
			action.payload.forEach((user) => {
				const index = state.friends.findIndex((u) => u.userId === user.userId);
				if (index !== -1) state.friends[index].online = user.online;
			});
		},
		userOnline(state, action: PayloadAction<string>) {
			const index = state.friends.findIndex((u) => u.userId === action.payload);
			if (index !== -1) state.friends[index].online = true;
		},
		userOffline(state, action: PayloadAction<string>) {
			const index = state.friends.findIndex((u) => u.userId === action.payload);
			if (index !== -1) state.friends[index].online = false;
		},
		setLabelTyping(state, action: PayloadAction<TypingType>) {
			const { threadId, isTyping } = action.payload;
			const friendIdx = state.friends.findIndex((f) => f.threadId === threadId);
			if (friendIdx !== -1) state.friends[friendIdx].typing = isTyping;
		},
		setLabelMessage(state, action: PayloadAction<MessageContentType>) {
			const friends = [...state.friends];
			// for friends label data
			const friendIdx = friends.findIndex(
				(x) => x.threadId === action.payload?.threadId
			);
			if (friendIdx !== -1) {
				const friendsClone = { ...friends[friendIdx] };
				const cType = action.payload?.cType || ChatContentType.TEXT;
				friendsClone.id = action.payload.id + '';
				friendsClone.cType = cType;
				friendsClone.body =
					cType === ChatContentType.TEXT
						? truncate(action.payload.body, 16)
						: action.payload.body;
				friendsClone.own = action.payload.own;
				friendsClone.timestamp = 'now';
				friends.splice(friendIdx, 1);
				state.friends = [friendsClone, ...friends];
			}
		},
		remLabelMessage(state, action: PayloadAction<{ id: string }>) {
			const friendIdx = state.friends.findIndex(
				(x) => x.id === action.payload?.id
			);
			if (friendIdx !== -1) {
				state.friends[friendIdx].cType = ChatContentType.TEXT;
				state.friends[friendIdx].body = 'Message removed';
			}
		},
	},
});

export const {
	initFriends,
	updateRequestCounter,
	setFriendActivities,
	userOnline,
	userOffline,
	setLabelTyping,
	setLabelMessage,
	remLabelMessage,
} = friendSlice.actions;
export const selectFriend = (state: RootState) => state.friend;
export default friendSlice.reducer;
