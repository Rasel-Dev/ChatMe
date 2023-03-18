import { Dispatch, createContext, useEffect, useMemo, useReducer } from 'react';
import appReducer from './reducer';
import { AppActionType, CB } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import axios from '../../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';

export const initialAppState = {
	isLoggedIn: false,
	id: 0,
	fullname: '',
	username: '',
	token: '',
	chat: {
		bio: {},
		conversations: [],
	},
};

type AppCTX = {
	state: Partial<typeof initialAppState>;
	auth: any[];
	onLogin: (formData: unknown, cb?: CB) => Promise<void>;
	onRegister: (formData: unknown, cb?: CB) => Promise<void>;
	onLogout: () => void;
	dispatch: Dispatch<AppActionType>;
};

export const AppStateContext = createContext<AppCTX | undefined>(undefined);

type PropType = {
	children: React.ReactNode;
};

const AppStateProvider: React.FC<PropType> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);
	const [auth, setAuth] = useLocalStorage('user', null);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';

	useEffect(() => {
		dispatch({ type: 'AUTH', payload: auth });
	}, [auth]);

	const onLogin = async (formData: unknown, cb?: CB) => {
		try {
			const { data } = await axios.post(`/users/login`, formData);
			dispatch({ type: 'AUTH', payload: data });
			setAuth(data);
			localStorage.setItem('_token', data?.token);
			navigate(from, { replace: true });
		} catch (error: any) {
			// console.log('error :', error?.response);
			if (error?.response) {
				if (error.response?.status && error.response.status === 400) {
					cb && cb(error?.response?.data);
				}
			} else {
				alert('Internal server error');
			}
		}
		cb && cb();
	};

	const onRegister = async (formData: unknown, cb?: CB) => {
		try {
			const { data } = await axios.post(`/users/new`, formData);
			dispatch({ type: 'AUTH', payload: data });
			setAuth(data);
			localStorage.setItem('_token', data?.token);
			navigate(from, { replace: true });
		} catch (error: any) {
			// console.log('error [XX]:', error?.response);
			if (error?.response && error.response?.status) {
				if (error.response.status === 400) {
					cb && cb(error?.response?.data);
				}
				if (error.response.status === 500) {
					alert('Internal server error');
				}
			} else {
				alert('Internal server error');
			}
		}
		cb && cb();
	};

	const onLogout = () => {};

	const value = useMemo(
		() => ({ state, auth, onLogin, onRegister, onLogout, dispatch }),
		[auth, state]
	);

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;
