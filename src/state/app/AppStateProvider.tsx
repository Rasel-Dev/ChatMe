import {
	Dispatch,
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useReducer,
} from 'react';
import appReducer from './reducer';
import { AppActionType, CB, initialStateType } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import axios from '../../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import socketInstance from '../../utils/socket';
import { ReturnSocketSubscribeType } from '../../types/custom';

export const initialAppState = {
	isListMenuOpen: false,
	auth: 0,
	token: '',
	userAvater: '',
	friends: [],
	requested: 0,
	requests: [],
	onSearch: false,
	search: {
		peoples: [],
		groups: [],
	},
	chat: {
		activeRoom: '',
		bio: {
			name: '',
			avater: '',
			lastRead: '',
			is_online: false,
			is_typing: false,
		},
		conversations: [],
		loadIds: [],
	},
};

type AppCTX = {
	state: Partial<initialStateType>;
	dispatch: Dispatch<AppActionType>;
};

export const AppStateContext = createContext<AppCTX | undefined>(undefined);

type PropType = {
	children: React.ReactNode;
};

const AppStateProvider: React.FC<PropType> = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);
	const axiosPrivate = useAxios();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		if (localStorage.getItem('_token')) {
			(async () => {
				// loading...
				try {
					const res = await axiosPrivate.get(`/chats`, {
						signal: controller.signal,
					});
					const resData = res?.data;
					if (isMounted) {
						dispatch({ type: 'INIT_FRIEND', payload: resData });
						socketInstance.connect();
						socketInstance.emit(
							'subscribe',
							(err: Error | null, data: ReturnSocketSubscribeType[]) => {
								if (err) {
									console.log('NO AUTH');
								}
								if (data && !!data.length) {
									dispatch({ type: 'USER_ACTIVITY', payload: data });
								}
							}
						);
						socketInstance.on('status:online', (userId: string) =>
							dispatch({ type: 'USER_ONLINE', payload: userId })
						);
						socketInstance.on('status:offline', (userId: string) =>
							dispatch({ type: 'USER_OFFLINE', payload: userId })
						);
						socketInstance.on('message', (messageContent: any) => {
							// console.log('messageContent :', messageContent);
							dispatch({
								type: 'APPEND_LABEL_MESSAGE',
								payload: messageContent,
							});
							dispatch({
								type: 'APPEND_MESSAGE',
								payload: messageContent,
							});
						});
						socketInstance.on('removed', (messageContent: any) => {
							dispatch({
								type: 'REMOVE_LABEL_AND_MESSAGE',
								payload: messageContent,
							});
						});
					}
				} catch (error) {
					console.log('MessageBox', error);
				}
			})();
		}

		// cleanup
		return () => {
			isMounted = false;
			controller.abort();
			socketInstance.disconnect();
		};
	}, [axiosPrivate, localStorage.getItem('_token')]);

	const value = useMemo(() => ({ state, dispatch }), [state]);

	return (
		<AppStateContext.Provider value={value}>
			{children}
		</AppStateContext.Provider>
	);
};

export default AppStateProvider;
