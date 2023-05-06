import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationType } from '../../types/custom';
import { RootState } from '../store';

export interface SearchStateType {
	hasUnseenNotice: boolean;
	notifications: NotificationType[];
}

const initialState: SearchStateType = {
	hasUnseenNotice: false,
	notifications: [],
};

export const notifySlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		initNotify(state, action: PayloadAction<NotificationType[]>) {
			state.hasUnseenNotice = action.payload.findIndex((n) => !n.read) !== -1;
			state.notifications = action.payload;
		},
		addNotify(state, action: PayloadAction<NotificationType>) {
			state.hasUnseenNotice = true;
			state.notifications.splice(0, 0, action.payload);
		},
	},
});

export const { initNotify, addNotify } = notifySlice.actions;
export const selectNotify = (state: RootState) => state.notify;
export default notifySlice.reducer;
