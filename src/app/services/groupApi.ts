import { GroupProfileResponse, ProfileResponse } from './types';
import { mainApi } from './mainApi';

export const groupApi = mainApi.injectEndpoints({
	endpoints: (builder) => ({
		singleProfile: builder.query<ProfileResponse, string>({
			query(arg) {
				return { url: `/groups/_sp/${arg}` };
			},
		}),
		groupProfile: builder.query<GroupProfileResponse, string>({
			query(arg) {
				return { url: `/groups/_gp/${arg}` };
			},
		}),
		createGroup: builder.mutation<any, FormData>({
			query(form) {
				return {
					url: '/groups',
					method: 'POST',
					body: form,
				};
			},
		}),
		updateGroupProfileAvater: builder.mutation<{ avater: string }, FormData>({
			query(form) {
				return {
					url: `/groups/${form.get('chatId')}/profile`,
					method: 'PUT',
					body: form,
				};
			},
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					// if (data?.avater) dispatch(changeAvater(data?.avater));
				} catch (error) {}
			},
		}),
	}),
});

export const {
	useSingleProfileQuery,
	useGroupProfileQuery,
	useCreateGroupMutation,
	useUpdateGroupProfileAvaterMutation,
} = groupApi;
