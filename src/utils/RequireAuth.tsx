import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function RequireAuth() {
	const [{ logged_in }] = useCookies(['logged_in']);
	let location = useLocation();

	if (logged_in) {
		return <Outlet />;
	} else {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
}
