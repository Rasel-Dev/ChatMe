import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserStateType {
	auth: string;
	isLoggedIn: boolean;
	avater: string;
}

const initState: UserStateType = {
	auth: '',
	isLoggedIn: false,
	avater: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initState,
	reducers: {
		setCredentials: (state, action: PayloadAction<UserStateType>) => {
			const { auth, isLoggedIn, avater } = action.payload;
			state.auth = auth;
			state.isLoggedIn = isLoggedIn;
			state.avater = avater;
		},
		remCredentials: () => initState,
		changeAvater: (state, action: PayloadAction<string>) => {
			state.avater = action.payload;
		},
	},
});

export const { setCredentials, remCredentials, changeAvater } =
	userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
