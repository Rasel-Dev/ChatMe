import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface MenuStateType {
	isFriendListOpen: boolean;
	isSearching: boolean;
	isNotificaionOpen: boolean;
	onMessageReactor: string;
	onGroupCreation: boolean;
}

const initialState: MenuStateType = {
	isFriendListOpen: false,
	isSearching: false,
	isNotificaionOpen: false,
	onMessageReactor: '',
	onGroupCreation: false,
};

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		toggleFriendList(state, action: PayloadAction<boolean>) {
			state.isFriendListOpen = action.payload || false;
		},
		onSearch(state, action: PayloadAction<boolean>) {
			state.isSearching = action.payload;
		},
		toggleNotification(state) {
			state.isNotificaionOpen = !state.isNotificaionOpen;
		},
		toggleGroupCreation(state) {
			state.onGroupCreation = !state.onGroupCreation;
		},
		showReactor(state, action: PayloadAction<string | null>) {
			state.onMessageReactor = action.payload || '';
		},
	},
});

export const {
	toggleFriendList,
	onSearch,
	toggleNotification,
	toggleGroupCreation,
	showReactor,
} = menuSlice.actions;
export const selectMenu = (state: RootState) => state.menu;
export default menuSlice.reducer;
