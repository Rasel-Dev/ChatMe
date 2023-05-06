import { useCallback, useMemo } from 'react';
import { useCookies } from 'react-cookie';

const useToken = () => {
	const [cookies, _, removeCookie] = useCookies(['logged_in']);
	const getToken = useCallback(
		() => cookies.logged_in as string,
		[cookies.logged_in]
	);

	return useMemo(() => ({ getToken, removeCookie }), [cookies]);
};

export default useToken;
