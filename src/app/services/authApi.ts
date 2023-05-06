import { Login } from '../../types/custom';
import { remCredentials } from '../features/userSlice';
import { chatApi } from './chatApi';
import { mainApi } from './mainApi';

export const authApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		signup: builder.mutation<any, FormData>({
			query(form) {
				return {
					url: '/auth/signup',
					method: 'POST',
					body: form,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(chatApi.endpoints.getChatDashboard.initiate());
				} catch (error) {
					// console.log('error :', error);
				}
			},
		}),
		signin: builder.mutation<any, Login>({
			query(data) {
				return {
					url: '/auth/signin',
					method: 'POST',
					body: data,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(chatApi.endpoints.getChatDashboard.initiate());
				} catch (error) {
					// console.log('error :', error);
				}
			},
		}),
		logout: builder.mutation<void, void>({
			query() {
				return {
					url: '/auth/signout',
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(remCredentials());
					dispatch(mainApi.util.resetApiState());
				} catch (error) {}
			},
		}),
	}),
});

export const { useSigninMutation, useSignupMutation, useLogoutMutation } =
	authApi;
