import {
	BaseQueryApi,
	FetchArgs,
	createApi,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { remCredentials } from '../features/userSlice';

const BASE_URL = import.meta.env.VITE_APP_SERVER_ENDPOINT as string;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/v1`,
	credentials: 'include',
});

const baseQueryReauth = async (
	arg: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: any
) => {
	let result = await baseQuery(arg, api, extraOptions);
	// console.log('result :', result);
	if (
		(result.error as any)?.originalStatus &&
		(result.error as any)?.originalStatus === 403
	) {
		const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
		if (refreshResult?.data) {
			// console.log('success :', refreshResult);
			// const user = api.getState();
			// console.log('user :', user);

			// retry the original request
			result = await baseQuery(arg, api, extraOptions);
		} else {
			api.dispatch(remCredentials());
			window.location.href = '/login';
		}
	}
	return result;
};

export const mainApi = createApi({
	baseQuery: baseQueryReauth,
	endpoints: (builder) => ({}),
});
