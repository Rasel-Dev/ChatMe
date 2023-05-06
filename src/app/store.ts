import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './features/menuSlice';
import userReducer from './features/userSlice';
import friendReducer from './features/friendSlice';
import searchReducer from './features/searchSlice';
import notifyReducer from './features/notifySlice';
import chatReducer from './features/chatSlice';
import { mainApi } from './services/mainApi';

export const store = configureStore({
	reducer: {
		[mainApi.reducerPath]: mainApi.reducer,
		menu: menuReducer,
		user: userReducer,
		friend: friendReducer,
		search: searchReducer,
		notify: notifyReducer,
		chat: chatReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
