import { LabelProfileType, ReqFriendsType } from '../../types/custom';
import { ParsonalProfileType } from '../../types/profile';
import { initSearch } from '../features/searchSlice';
import { changeAvater } from '../features/userSlice';
import { mainApi } from './mainApi';

export const userApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		getProfile: builder.query<ParsonalProfileType, void>({
			query() {
				return { url: '/users' };
			},
		}),
		updateProfilePic: builder.mutation<{ avater: string }, FormData>({
			query(form) {
				return {
					url: '/users/profile',
					method: 'PUT',
					body: form,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					if (data?.avater) dispatch(changeAvater(data?.avater));
				} catch (error) {}
			},
		}),
		requestedFriends: builder.query<LabelProfileType[], void>({
			query() {
				return { url: '/users/requests' };
			},
		}),
		searchFriends: builder.mutation<any, string>({
			query(arg) {
				return { url: `/users/find?_q=${arg}` };
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const payload = await queryFulfilled;
					dispatch(initSearch(payload?.data));
				} catch (error) {}
			},
		}),
		reqProposal: builder.mutation<any, any>({
			query(arg) {
				return {
					url: `/users/requests`,
					method: 'POST',
					body: arg,
				};
			},
		}),
		parformRequest: builder.mutation<any, ReqFriendsType>({
			query(arg) {
				return {
					url: `/users/requests`,
					method: 'put',
					body: arg,
				};
			},
		}),
		changePassword: builder.mutation<
			{ message: string },
			{ old_password: string; new_password: string; confirm_password: string }
		>({
			query(arg) {
				return {
					url: `/users/change-password`,
					method: 'put',
					body: arg,
				};
			},
		}),
	}),
});

export const {
	useGetProfileQuery,
	useUpdateProfilePicMutation,
	useRequestedFriendsQuery,
	useSearchFriendsMutation,
	useReqProposalMutation,
	useParformRequestMutation,
	useChangePasswordMutation,
} = userApi;
