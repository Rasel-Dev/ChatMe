import { setCredentials } from '../features/userSlice';
import { initFriends } from '../features/friendSlice';
import { initNotify } from '../features/notifySlice';
import { initChats } from '../features/chatSlice';
import { ChatResponse } from './types';
import { mainApi } from './mainApi';

export const chatApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getChatDashboard: builder.mutation<ChatResponse, void>({
			query() {
				return { url: '/chats' };
			},
			// transformResponse: (result) => result,
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					// initial user
					dispatch(
						setCredentials({
							auth: data?.id,
							isLoggedIn: true,
							avater: data?.avater,
						})
					);
					// initial friends
					dispatch(
						initFriends({
							friends: data?.friends,
							requested: data?.requested,
						})
					);
					//initial notifications
					dispatch(initNotify(data?.notifications || []));
				} catch (error) {
					// console.log('error :', error);
				}
			},
		}),
		getRoom: builder.mutation<any, string>({
			query(chatId) {
				return { url: `/chats/${chatId}` };
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(initChats({ threadId: arg, ...data }));
				} catch (error) {
					// console.log('error :', error);
				}
			},
		}),
	}),
});

export const { useGetChatDashboardMutation, useGetRoomMutation } = chatApi;
