import { Navigate, useLocation } from 'react-router-dom';
// import useApp from '../hooks/useApp';

export default function RequireAuth({ children }: { children: JSX.Element }) {
	// let { auth } = useApp();

	let location = useLocation();

	if (!localStorage.getItem('_token')) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
}
